"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const exhibitions = [
  { id: 1, title: "Typography in Motion", image: "/placeholder.svg?height=600&width=800", designer: "Alice Johnson" },
  {
    id: 2,
    title: "Sustainable Packaging Design",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Bob Smith",
  },
  {
    id: 3,
    title: "Digital Illustration Showcase",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Charlie Brown",
  },
  { id: 4, title: "Brand Identity Evolution", image: "/placeholder.svg?height=600&width=800", designer: "Diana Ross" },
  { id: 5, title: "Interactive Web Design", image: "/placeholder.svg?height=600&width=800", designer: "Ethan Hunt" },
  { id: 6, title: "Print Media Renaissance", image: "/placeholder.svg?height=600&width=800", designer: "Fiona Apple" },
]

export default function Exhibitions() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Design Exhibitions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.map((exhibition) => (
            <Link href={`/exhibitions/${exhibition.id}`} key={exhibition.id}>
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredId(exhibition.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Image
                  src={exhibition.image || "/placeholder.svg"}
                  alt={exhibition.title}
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === exhibition.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold text-white mb-2">{exhibition.title}</h2>
                  <p className="text-gray-300">by {exhibition.designer}</p>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

