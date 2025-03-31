"use client"

import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
})

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    // Apply theme to body
    if (theme === "dark") {
      document.body.classList.add("dark")
      document.body.classList.remove("light")
    } else {
      document.body.classList.add("light")
      document.body.classList.remove("dark")
    }

    // Save theme preference
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

