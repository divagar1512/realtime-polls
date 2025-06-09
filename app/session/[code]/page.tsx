"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Users } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import PollChart from "@/components/charts/poll-chart"
import { usePoll } from "@/hooks/use-poll"
import { useVote } from "@/hooks/use-vote"

export default function SessionPage() {
  const params = useParams()
  const code = params.code as string
  const [showResults, setShowResults] = useState(false)

  const { poll, loading } = usePoll(code)
  const { vote, voting, hasVoted, votedOptionId } = useVote()

  const handleVote = async (optionId: string) => {
    await vote(code, optionId)
    setTimeout(() => setShowResults(true), 1500)
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
        <p className="text-neutral-600 dark:text-neutral-400">
          The poll with code "{code}" could not be found or has ended.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-neutral-500" />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Poll Code: <code className="font-mono font-bold">{poll.code}</code>
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{poll.question}</h1>
        {!hasVoted && <p className="text-neutral-600 dark:text-neutral-400">Choose your answer below</p>}
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasVoted && !showResults ? (
          <motion.div
            key="voting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {poll.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full p-6 text-left justify-start text-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
                  onClick={() => handleVote(option.id)}
                  disabled={voting}
                >
                  <span className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 mr-4 flex-shrink-0" />
                  {option.text}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        ) : hasVoted && !showResults ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Thank You!</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Your vote has been recorded successfully</p>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Live Results</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{poll.totalVotes} total votes</p>
              </div>

              <div className="space-y-4 mb-6">
                {poll.options.map((option) => {
                  const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
                  const isSelected = option.id === votedOptionId

                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-medium ${isSelected ? "text-primary-600 dark:text-primary-400" : "text-neutral-700 dark:text-neutral-300"}`}
                        >
                          {option.text} {isSelected && "✓"}
                        </span>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {option.votes} votes ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-2 rounded-full ${isSelected ? "bg-primary-500" : "bg-neutral-400 dark:bg-neutral-500"}`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <PollChart options={poll.options} type="pie" />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
