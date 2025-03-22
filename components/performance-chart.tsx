"use client"

import { useMemo } from "react"
import { CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from "recharts"

interface PerformanceChartProps {
  percentile: number
}

export function PerformanceChart({ percentile }: PerformanceChartProps) {
  // Generate a bell curve distribution with data points matching the screenshot
  const data = useMemo(() => {
    return [
      { x: 0, value: 5 },
      { x: 10, value: 10 },
      { x: 20, value: 15 },
      { x: 30, value: 25 },
      { x: 40, value: 40 },
      { x: 45, value: 50 },
      { x: 50, value: 65 },
      { x: 55, value: 80 },
      { x: 60, value: 95 },
      { x: 65, value: 75 },
      { x: 70, value: 60 },
      { x: 75, value: 40 },
      { x: 80, value: 25 },
      { x: 90, value: 15 },
      { x: 100, value: 5 },
    ]
  }, [])

  return (
    <div className="h-full w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="x" axisLine={true} tickLine={true} ticks={[0, 25, 50, 75, 100]} domain={[0, 100]} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border rounded shadow-sm text-xs">
                    <p>{`Percentile: ${payload[0].payload.x}%`}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 4, fill: "white", stroke: "#6366f1", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#6366f1" }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Percentile marker line */}
      <div
        className="absolute top-0 bottom-0 border-r border-dashed border-gray-400"
        style={{
          left: `${percentile}%`,
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute bottom-0 text-sm text-gray-500"
        style={{
          right: "10px",
          transform: "translateY(100%)",
          paddingTop: "5px",
        }}
      >
        your percentile
      </div>
    </div>
  )
}

