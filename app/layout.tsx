import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SocketProvider } from "@/components/providers/socket-provider"
import { Toaster } from "react-hot-toast"
import Header from "@/components/layout/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RealTime Polls - Interactive Polling Platform",
  description: "Create and participate in real-time polls with live results and analytics.",
  keywords: "polling, real-time, voting, surveys, interactive",
  authors: [{ name: "RealTime Polls Team" }],
  openGraph: {
    title: "RealTime Polls",
    description: "Interactive real-time polling platform",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SocketProvider>
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
              <Header />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                className: "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
              }}
            />
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
