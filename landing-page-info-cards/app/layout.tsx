import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Text-Heavy Website",
  description: "A website optimized for displaying large amounts of text",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Sidebar />
          <main className="flex-1 md:ml-8">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'