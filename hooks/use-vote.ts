"use client"

import { useState } from "react"
import { useSocket } from "@/components/providers/socket-provider"
import toast from "react-hot-toast"

export function useVote() {
  const [voting, setVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null)
  const { socket } = useSocket()

  const vote = async (pollCode: string, optionId: string) => {
    if (voting || hasVoted) return

    try {
      setVoting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Emit vote to socket
      if (socket) {
        socket.emit("cast-vote", { pollCode, optionId })
      }

      setHasVoted(true)
      setVotedOptionId(optionId)
      toast.success("Vote cast successfully!")
    } catch (error) {
      toast.error("Failed to cast vote")
    } finally {
      setVoting(false)
    }
  }

  return { vote, voting, hasVoted, votedOptionId }
}
