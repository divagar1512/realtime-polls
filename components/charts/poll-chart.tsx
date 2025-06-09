"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { motion } from "framer-motion"
import type { PollOption } from "@/lib/types"

interface PollChartProps {
  options: PollOption[]
  type?: "bar" | "pie"
  animate?: boolean
}

const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#F97316"]

export default function PollChart({ options, type = "bar", animate = true }: PollChartProps) {
  const data = options.map((option, index) => ({
    name: option.text,
    votes: option.votes,
    color: COLORS[index % COLORS.length],
  }))

  if (type === "pie") {
    return (
      <motion.div
        initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5 }}
        className="w-full h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="votes"
              animationBegin={0}
              animationDuration={animate ? 800 : 0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
      className="w-full h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="votes" fill="#4F46E5" radius={[4, 4, 0, 0]} animationDuration={animate ? 800 : 0} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
