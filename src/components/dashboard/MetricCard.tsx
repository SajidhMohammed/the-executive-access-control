"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  trend?: string
  isPositive?: boolean
  progress?: number
  isPulsing?: boolean
  indicatorClassName?: string
}

export function MetricCard({ 
  title, 
  value, 
  trend, 
  isPositive = true, 
  progress, 
  isPulsing,
  indicatorClassName
}: MetricCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-surface-container-lowest editorial-shadow">
      <CardContent className="p-8 flex flex-col items-start gap-4 h-full border-none">
        <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider text-on-surface-variant">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-manrope font-bold text-4xl text-primary tracking-tight">{value}</span>
          {isPulsing ? (
            <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></div>
          ) : trend ? (
            <span
              className={cn(
                "text-xs font-bold",
                isPositive ? "text-primary-fixed" : "text-error"
              )}
            >
              {trend}
            </span>
          ) : null}
        </div>
        {progress !== undefined && (
          <Progress className="w-full h-1 mt-auto" value={progress}>
            <ProgressTrack className="h-1 bg-surface-container">
              <ProgressIndicator className={cn("bg-primary", indicatorClassName)} />
            </ProgressTrack>
          </Progress>
        )}
      </CardContent>
    </Card>
  )
}
