import { Card } from "./ui/card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface HourCardProps {
  name: string;
  copticName?: string;
  time: string;
  onClick: () => void;
  isDarkMode?: boolean;
}

export function HourCard({
  name,
  copticName,
  time,
  onClick,
  isDarkMode = false,
}: HourCardProps) {
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`${name}${copticName ? ` (${copticName})` : ""} – ${time}`}
      className={cn(
        "p-3 cursor-pointer transition-all rounded-lg border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        "hover:shadow-md active:scale-[0.98]",
        isDarkMode
          ? "bg-gray-700 border-gray-600 hover:border-amber-400"
          : "bg-white border-gray-200 hover:border-amber-600"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-1">
        
        {/* Titel */}
        <h3
          className={cn(
            "text-base font-bold leading-tight",
            isDarkMode ? "text-white" : "text-gray-900"
          )}
        >
          {name}
        </h3>

        {/* Koptische naam */}
        {copticName && (
          <p
            className={cn(
              "text-sm font-bold font-serif leading-none",
              isDarkMode ? "text-amber-400" : "text-amber-700"
            )}
          >
            {copticName}
          </p>
        )}

        {/* Tijd */}
        <div
          className={cn(
            "flex items-center gap-1.5 mt-1",
            isDarkMode ? "text-amber-400" : "text-amber-600"
          )}
        >
          <Clock className="w-3 h-3" aria-hidden="true" />
          <span className="text-xs font-bold">{time}</span>
        </div>
      </div>
    </Card>
  );
}
