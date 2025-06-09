"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Copy, Users, Clock, StopCircle } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import PollChart from "@/components/charts/poll-chart"
import { usePoll } from "@/hooks/use-poll"
import { useAdminActions } from "@/hooks/use-admin-actions"
import { formatDuration } from "@/lib/utils"
import toast from "react-hot-toast"

export default function AdminSessionPage() {
  const params = useParams()
  const code = params.code as string
  const [showEndModal, setShowEndModal] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)

  const { poll, loading } = usePoll(code)
  const { endPoll, ending } = useAdminActions()

  useEffect(() => {
    if (poll?.duration && poll.isActive) {
      const startTime = new Date(poll.createdAt).getTime()
      const endTime = startTime + poll.duration * 1000

      const interval = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
        setTimeRemaining(remaining)

        if (remaining === 0) {
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [poll])

  const copyPollCode = () => {
    navigator.clipboard.writeText(code)
    toast.success("Poll code copied to clipboard!")
  }

  const handleEndPoll = async () => {
    const success = await endPoll(code)
    if (success) {
      setShowEndModal(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Poll Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400">The poll with code "{code}" could not be found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Poll Admin Dashboard</h1>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Poll Code:</span>
            <code className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg font-mono text-lg font-bold">
              {poll.code}
            </code>
            <Button variant="ghost" size="sm" onClick={copyPollCode} className="p-1" aria-label="Copy poll code">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Votes</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{poll.totalVotes}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Time Remaining</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {timeRemaining !== null ? formatDuration(timeRemaining) : "No limit"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Status</p>
              <p className={`text-lg font-semibold ${poll.isActive ? "text-green-600" : "text-red-600"}`}>
                {poll.isActive ? "Active" : "Ended"}
              </p>
            </div>
            {poll.isActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEndModal(true)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <StopCircle className="w-4 h-4 mr-1" />
                End Poll
              </Button>
            )}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Poll Question</h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">{poll.question}</p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Live Results</h2>
        <PollChart options={poll.options} type="bar" />
      </Card>

      <Modal isOpen={showEndModal} onClose={() => setShowEndModal(false)} title="End Poll">
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Are you sure you want to end this poll? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowEndModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEndPoll} loading={ending} className="bg-red-600 hover:bg-red-700">
              End Poll
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
