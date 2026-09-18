"use client"

import React from "react"
import { useTheme } from "@/context/ThemeContext"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0 rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-all relative overflow-hidden"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-4 w-4 transition-all duration-300 absolute ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
      />
      <Moon
        className={`h-4 w-4 transition-all duration-300 absolute ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-blue-400"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
