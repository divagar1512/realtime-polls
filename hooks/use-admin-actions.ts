"use client"

import { useState } from "react"
import { useSocket } from "@/components/providers/socket-provider"
import type { CreatePollData } from "@/lib/types"
import { generatePollCode } from "@/lib/utils"
import toast from "react-hot-toast"

export function useAdminActions() {
  const [creating, setCreating] = useState(false)
  const [ending, setEnding] = useState(false)
  const { socket } = useSocket()

  const createPoll = async (data: CreatePollData): Promise<string | null> => {
    try {
      setCreating(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const pollCode = generatePollCode()

      // Emit to socket
      if (socket) {
        socket.emit("create-poll", { ...data, code: pollCode })
      }

      toast.success("Poll created successfully!")
      return pollCode
    } catch (error) {
      toast.error("Failed to create poll")
      return null
    } finally {
      setCreating(false)
    }
  }

  const endPoll = async (pollCode: string): Promise<boolean> => {
    try {
      setEnding(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Emit to socket
      if (socket) {
        socket.emit("end-poll", { pollCode })
      }

      toast.success("Poll ended successfully!")
      return true
    } catch (error) {
      toast.error("Failed to end poll")
      return false
    } finally {
      setEnding(false)
    }
  }

  return { createPoll, endPoll, creating, ending }
}
