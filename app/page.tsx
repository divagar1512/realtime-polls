"use client"

import Link from "next/link"
import Card from "@/components/ui/card"
import { Plus, Users, BarChart3, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
          Real-Time Polling
          <span className="block text-primary-500">Made Simple</span>
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Create interactive polls and get instant feedback from your audience with live results and beautiful
          analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        <Link href="/admin/create">
          <Card hover className="text-center cursor-pointer">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Create Poll</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Set up a new poll with custom questions and options
            </p>
          </Card>
        </Link>

        <Link href="/join">
          <Card hover className="text-center cursor-pointer">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Join Poll</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Enter a poll code to participate and vote</p>
          </Card>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Real-Time Updates</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            See results update instantly as votes come in
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Beautiful Charts</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Visualize your data with interactive charts</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Easy to Use</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Simple interface for both creators and participants
          </p>
        </div>
      </div>
    </div>
  )
}
