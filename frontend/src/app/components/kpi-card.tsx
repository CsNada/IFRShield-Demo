import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
}: KPICardProps) {
  const variantStyles = {
    default: "border-slate-200",
    success: "border-green-200 bg-green-50/50",
    warning: "border-amber-200 bg-amber-50/50",
    danger: "border-red-200 bg-red-50/50",
  };

  const valueColors = {
    default: "text-slate-900",
    success: "text-green-700",
    warning: "text-amber-700",
    danger: "text-red-700",
  };

  return (
    <Card className={`p-6 ${variantStyles[variant]} border-2`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-3xl font-bold ${valueColors[variant]}`}>
              {value}
            </h3>
            {trendValue && (
              <span
                className={`text-sm font-medium ${
                  trend === "up"
                    ? "text-green-600"
                    : trend === "down"
                    ? "text-red-600"
                    : "text-slate-600"
                }`}
              >
                {trendValue}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${variantStyles[variant]}`}>
            <Icon className={`w-6 h-6 ${valueColors[variant]}`} />
          </div>
        )}
      </div>
    </Card>
  );
}
