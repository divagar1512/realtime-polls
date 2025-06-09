export interface Poll {
  id: string
  code: string
  question: string
  options: PollOption[]
  duration?: number
  createdAt: Date
  endedAt?: Date
  isActive: boolean
  totalVotes: number
}

export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface Vote {
  id: string
  pollId: string
  optionId: string
  userId: string
  timestamp: Date
}

export interface CreatePollData {
  question: string
  options: string[]
  duration?: number
}
