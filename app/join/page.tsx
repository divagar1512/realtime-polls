"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import toast from "react-hot-toast"

export default function JoinPollPage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) {
      toast.error("Please enter a poll code")
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      router.push(`/session/${code.toUpperCase()}`)
    } catch (error) {
      toast.error("Invalid poll code")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Join a Poll</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter the poll code to participate and cast your vote
          </p>
        </motion.div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Poll Code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="text-center text-lg font-mono tracking-wider"
              maxLength={6}
              autoFocus
            />

            <Button type="submit" className="w-full" loading={loading} disabled={!code.trim()}>
              Join Poll
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Don't have a code?{" "}
              <button
                onClick={() => router.push("/admin/create")}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Create your own poll
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
