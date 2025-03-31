import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI based inventory management and supply chain optimization',
  description: 'AI based inventory management and supply chain optimization',
  generator: 'v0.dev',
}

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
