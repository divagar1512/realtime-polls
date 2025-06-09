"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Minus, Clock } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Textarea from "@/components/ui/textarea"
import { useAdminActions } from "@/hooks/use-admin-actions"
import toast from "react-hot-toast"

export default function CreatePollPage() {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [duration, setDuration] = useState<number | undefined>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { createPoll, creating } = useAdminActions()
  const router = useRouter()

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!question.trim()) {
      newErrors.question = "Question is required"
    }

    const validOptions = options.filter((opt) => opt.trim())
    if (validOptions.length < 2) {
      newErrors.options = "At least 2 options are required"
    }

    options.forEach((option, index) => {
      if (!option.trim()) {
        newErrors[`option-${index}`] = "Option cannot be empty"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors below")
      return
    }

    const validOptions = options.filter((opt) => opt.trim())
    const pollCode = await createPoll({
      question: question.trim(),
      options: validOptions,
      duration,
    })

    if (pollCode) {
      router.push(`/admin/session/${pollCode}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Create New Poll</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Set up your poll question and options to get started</p>
      </motion.div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            label="Poll Question"
            placeholder="What would you like to ask your audience?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            error={errors.question}
            rows={3}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Answer Options</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={options.length >= 6}
                className="flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Option</span>
              </Button>
            </div>

            {errors.options && <p className="text-sm text-red-600 dark:text-red-400">{errors.options}</p>}

            <div className="space-y-3">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    error={errors[`option-${index}`]}
                    className="flex-1"
                  />
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                      aria-label={`Remove option ${index + 1}`}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-neutral-500" />
            <Input
              type="number"
              label="Duration (seconds, optional)"
              placeholder="300"
              value={duration || ""}
              onChange={(e) => setDuration(e.target.value ? Number.parseInt(e.target.value) : undefined)}
              min="30"
              max="3600"
              className="max-w-xs"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" loading={creating} className="min-w-[120px]">
              Launch Poll
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
