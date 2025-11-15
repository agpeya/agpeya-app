"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  type TooltipProps,
  type LegendProps,
} from "recharts";

import { cn } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

type ResponsiveChildren =
  | React.ReactNode
  | ((size: { width: number; height: number }) => React.ReactNode);

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children?: ResponsiveChildren;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${(id ?? uniqueId).toString().replace(/[:]/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          // target recharts common classNames/elements in a safe way
          // using element selectors and the data-chart attribute to scope styles
          "[&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children as any}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/** ChartStyle: injects per-chart CSS variables for colors. Filters falsy entries. */
export const ChartStyle: React.FC<{ id: string; config: ChartConfig }> = ({
  id,
  config,
}) => {
  // keep only keys that define either color or theme
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => Boolean(cfg?.color) || Boolean((cfg as any).theme),
  );

  if (!colorConfig.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const body = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            (itemConfig as any).theme?.[theme as keyof typeof THEMES] ||
            (itemConfig as any).color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");
      return `${prefix} [data-chart="${id}"] {\n${body}\n}`;
    })
    .join("\n\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

/** ChartTooltip provides the Recharts Tooltip component for convenience. */
export const ChartTooltip = Tooltip;

/** Robust tooltip content component */
export function ChartTooltipContent(props: TooltipProps & {
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelClassName?: string;
  nameKey?: string;
  labelKey?: string;
}) {
  const {
    active,
    payload,
    label,
    formatter,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    labelClassName,
    nameKey,
    labelKey,
  } = props;

  const { config } = useChart();

  // nothing to render
  if (!active || !payload || !payload.length) return null;

  // compute label shown at top of tooltip
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const item = payload[0];
    const key = `${labelKey ?? (item?.dataKey ?? item?.name ?? "value")}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      (!labelKey && typeof label === "string"
        ? (config as any)[label]?.label ?? label
        : itemConfig?.label) ?? null;

    if (!value) return null;
    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [hideLabel, payload, label, labelClassName, config, labelKey]);

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}

      <div className="grid gap-1.5">
        {payload.map((entry, idx) => {
          // entry shape per Recharts: { dataKey, name, value, payload, color, ... }
          const key = `${nameKey ?? entry.name ?? entry.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, entry, key);

          // safer color resolution: prefer explicit color, then stroke/fill on payload
          const indicatorColor =
            (entry as any).color ??
            (entry.payload as any)?.stroke ??
            (entry.payload as any)?.fill ??
            undefined;

          // If a custom formatter is passed, use it. Recharts' formatter signature is typically:
          // formatter(value, name, entry, index)
          const formatted = formatter
            ? (formatter as any)(entry.value, entry.name, entry, idx)
            : undefined;

          return (
            <div
              key={String(entry.dataKey ?? idx)}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
            >
              {formatted ? (
                // If formatter returns React node / string, render it directly.
                <div className="flex-1">{formatted as React.ReactNode}</div>
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        // use inline styles for color to avoid invalid Tailwind syntax
                        style={
                          {
                            backgroundColor:
                              indicatorColor ?? "transparent",
                            borderColor: indicatorColor ?? "transparent",
                          } as React.CSSProperties
                        }
                        className={cn(
                          "shrink-0 rounded-[2px] border",
                          indicator === "dot" && "h-2.5 w-2.5",
                          indicator === "line" && "w-1 h-6",
                          indicator === "dashed" &&
                            "h-0 border-[1.5px] border-dashed w-3",
                        )}
                      />
                    )
                  )}

                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label ?? entry.name}
                      </span>
                    </div>

                    {entry.value !== undefined && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {Number(entry.value).toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ChartLegend = Legend;

/** Controlled legend renderer */
export function ChartLegendContent(props: {
  className?: string;
  hideIcon?: boolean;
  payload?: LegendProps["payload"];
  verticalAlign?: LegendProps["verticalAlign"];
  nameKey?: string;
}) {
  const { className, hideIcon = false, payload, verticalAlign, nameKey } = props;
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey ?? item.dataKey ?? "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item as any, key);
        return (
          <div
            key={String(item.value ?? item.dataKey)}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: (item as any).color }}
              />
            )}
            <span>{itemConfig?.label ?? item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Helper to extract item config from a payload. Safe: checks shapes before access. */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string,
) {
  if (!payload || typeof payload !== "object") return undefined;

  const entryPayload = payload.payload && typeof payload.payload === "object"
    ? payload.payload
    : undefined;

  let configLabelKey = key;

  // if `payload` itself has a mapping for the key, prefer it (e.g. custom formatted name)
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (
    entryPayload &&
    key in entryPayload &&
    typeof entryPayload[key] === "string"
  ) {
    configLabelKey = entryPayload[key];
  }

  return (config as any)[configLabelKey] ?? (config as any)[key];
}

export {
  ChartContainer as default,
  ChartTooltip as Tooltip,
  ChartLegend as Legend,
  ChartStyle as Style,
};
