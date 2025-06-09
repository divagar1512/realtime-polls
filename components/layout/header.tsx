"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Plus, Users } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import Button from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">RT</span>
            </div>
            <span className="font-bold text-xl text-neutral-900 dark:text-white">RealTime Polls</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/admin/create">
              <Button variant="secondary" size="sm" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Poll</span>
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Join Poll</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme" className="p-2">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </nav>

          <Button variant="ghost" size="sm" onClick={toggleMenu} className="md:hidden p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-700 py-4"
            >
              <div className="flex flex-col space-y-3">
                <Link href="/admin/create" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="secondary" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Poll
                  </Button>
                </Link>
                <Link href="/join" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Poll
                  </Button>
                </Link>
                <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start">
                  {theme === "light" ? (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  )}
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
