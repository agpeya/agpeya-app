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

// Available themes mapped to CSS selectors
const THEMES = {
  light: "",
  dark: ".dark",
} as const;

// Chart configuration type
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

export function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChart must be used inside <ChartContainer />");
  }
  return ctx;
}

type ResponsiveChild =
  | React.ReactNode
  | ((size: { width: number; height: number }) => React.ReactNode);

// ---------------------------------------
// ChartContainer
// ---------------------------------------
export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children?: ResponsiveChild;
}) {
  const generatedId = React.useId();
  const chartId = `chart-${String(id ?? generatedId).replace(/[:]/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn("[&_.recharts-surface]:outline-hidden", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children as any}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

// ---------------------------------------
// ChartStyle — inject CSS variables
// ---------------------------------------
export const ChartStyle: React.FC<{
  id: string;
  config: ChartConfig;
}> = ({ id, config }) => {
  const entries = Object.entries(config).filter(
    ([, cfg]) => cfg.color || (cfg as any).theme
  );

  if (!entries.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, selector]) => {
      const vars = entries
        .map(([key, cfg]) => {
          const color =
            (cfg as any).theme?.[theme] ||
            (cfg as any).color ||
            null;

          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `${selector} [data-chart="${id}"] {\n${vars}\n}`;
    })
    .join("\n\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

// ---------------------------------------
// Tooltip
// ---------------------------------------
export const ChartTooltip = Tooltip;

export function ChartTooltipContent({
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
}: TooltipProps & {
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelClassName?: string;
  nameKey?: string;
  labelKey?: string;
}) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload.length) return null;
    const entry = payload[0];

    const key = labelKey ?? entry.dataKey ?? entry.name ?? "value";

    const cfg = getPayloadConfig(config, entry, key);

    const labelValue =
      (!labelKey && typeof label === "string"
        ? (config as any)[label]?.label ?? label
        : cfg?.label) ?? null;

    if (!labelValue) return null;

    return (
      <div className={cn("font-medium", labelClassName)}>{labelValue}</div>
    );
  }, [hideLabel, payload, label, labelKey, labelClassName, config]);

  const nestedLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestedLabel && tooltipLabel}

      <div className="grid gap-1.5">
        {payload.map((entry, idx) => {
          const key = nameKey ?? entry.name ?? entry.dataKey ?? "value";
          const cfg = getPayloadConfig(config, entry, key);

          const color =
            (entry as any).color ||
            entry.payload?.stroke ||
            entry.payload?.fill;

          const formatted = formatter
            ? (formatter as any)(entry.value, entry.name, entry, idx)
            : undefined;

          return (
            <div
              key={String(entry.dataKey ?? idx)}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2",
                indicator === "dot" && "items-center"
              )}
            >
              {formatted ? (
                <div className="flex-1">{formatted}</div>
              ) : (
                <>
                  {!hideIndicator &&
                    (cfg?.icon ? (
                      <cfg.icon />
                    ) : (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border",
                          indicator === "dot" && "h-2.5 w-2.5",
                          indicator === "line" && "w-1 h-6",
                          indicator === "dashed" &&
                            "h-0 w-3 border-[1.5px] border-dashed"
                        )}
                        style={{
                          backgroundColor: color,
                          borderColor: color,
                        }}
                      />
                    ))}

                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestedLabel ? "items-end" : "items-center"
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestedLabel && tooltipLabel}
                      <span className="text-muted-foreground">
                        {cfg?.label ?? entry.name}
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

// ---------------------------------------
// Legend
// ---------------------------------------
export const ChartLegend = Legend;

export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign,
  nameKey,
}: {
  className?: string;
  hideIcon?: boolean;
  payload?: LegendProps["payload"];
  verticalAlign?: LegendProps["verticalAlign"];
  nameKey?: string;
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((entry) => {
        const key = nameKey ?? entry.dataKey ?? "value";
        const cfg = getPayloadConfig(config, entry, key);

        return (
          <div
            key={String(entry.value ?? entry.dataKey)}
            className="flex items-center gap-1.5"
          >
            {!hideIcon ? (
              cfg?.icon ? (
                <cfg.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: (entry as any).color }}
                />
              )
            ) : null}

            <span>{cfg?.label ?? entry.value}</span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------
// Helpers
// ---------------------------------------
function getPayloadConfig(
  config: ChartConfig,
  payload: any,
  key: string
) {
  const entryPayload =
    typeof payload.payload === "object" ? payload.payload : undefined;

  let resolved = key;

  if (payload && typeof payload[key] === "string") {
    resolved = payload[key];
  } else if (entryPayload && typeof entryPayload[key] === "string") {
    resolved = entryPayload[key];
  }

  return (config as any)[resolved] ?? (config as any)[key];
}

export {
  ChartContainer as default,
  ChartTooltip as Tooltip,
  ChartLegend as Legend,
  ChartStyle as Style,
};
