"use client"

import { useState, useEffect, useCallback } from "react"
import { useSocket } from "@/components/providers/socket-provider"
import type { Poll } from "@/lib/types"
import toast from "react-hot-toast"

export function usePoll(code: string) {
  const [poll, setPoll] = useState<Poll | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { socket } = useSocket()

  const fetchPoll = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock poll data
      const mockPoll: Poll = {
        id: "1",
        code: code.toUpperCase(),
        question: "What is your favorite programming language?",
        options: [
          { id: "1", text: "JavaScript", votes: 45 },
          { id: "2", text: "Python", votes: 32 },
          { id: "3", text: "TypeScript", votes: 28 },
          { id: "4", text: "Go", votes: 15 },
        ],
        duration: 300,
        createdAt: new Date(),
        isActive: true,
        totalVotes: 120,
      }

      setPoll(mockPoll)
    } catch (err) {
      setError("Failed to fetch poll")
      toast.error("Failed to load poll")
    } finally {
      setLoading(false)
    }
  }, [code])

  useEffect(() => {
    if (code) {
      fetchPoll()
    }
  }, [code, fetchPoll])

  useEffect(() => {
    if (socket && poll) {
      socket.emit("join-poll", poll.code)

      socket.on("poll-updated", (updatedPoll: Poll) => {
        setPoll(updatedPoll)
      })

      socket.on("vote-cast", (data: { optionId: string }) => {
        setPoll((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            options: prev.options.map((option) =>
              option.id === data.optionId ? { ...option, votes: option.votes + 1 } : option,
            ),
            totalVotes: prev.totalVotes + 1,
          }
        })
      })

      return () => {
        socket.off("poll-updated")
        socket.off("vote-cast")
      }
    }
  }, [socket, poll])

  return { poll, loading, error, refetch: fetchPoll }
}
