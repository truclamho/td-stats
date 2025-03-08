"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface CardProps {
  title: string
  text: string
  index: number
  isActive: boolean
  onClick: () => void
}

const Card: React.FC<CardProps> = ({ title, text, index, isActive, onClick }) => {
  const angle = index * 72 - 90 // 360 degrees / 5 items = 72 degrees per item
  const radius = 150 // Adjust this value to change the size of the circle

  return (
    <>
      <motion.div
        className={`absolute w-16 h-16 rounded-full bg-[#142152] flex items-center justify-center cursor-pointer
                    ${isActive ? "bg-[#FFD539]" : "hover:bg-[#1a2b6d]"}`}
        style={{
          left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
          top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
        }}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className={`text-xl font-bold ${isActive ? "text-[#142152]" : "text-white"}`}>{`0${index + 1}`}</span>
      </motion.div>
      {isActive && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-white p-6 rounded-lg shadow-lg w-64 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2 text-[#142152]">{title}</h3>
          <p className="text-gray-600">{text}</p>
        </motion.div>
      )}
    </>
  )
}

export default function InfoCardsRadial() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const cards = [
    { title: "Collection", text: "IoT wearables sync data with the Smartective system in the cloud." },
    { title: "Processing", text: "Smartective analyzes data in real time against safety benchmarks" },
    {
      title: "Alerting",
      text: "Smartective alerts workers to risks and escalates urgent issues up the Chain of Command",
    },
    {
      title: "Personalization",
      text: "After two weeks, Smartective creates a confidential, personalized safety profile that adapts to keep you safer.",
    },
    { title: "Action", text: "Get real-time insights to adjust course and prevent accidents before they happen." },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#142152]">Safety In Action</h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-gray-600">
          Smartective uses IoT devices to track workers' cognitive, biometric, and environmental states, delivering
          real-time safety alerts to enhance communication and enable quick intervention.
        </p>

        <div className="relative h-[400px] max-w-[400px] mx-auto">
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              index={index}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
            />
          ))}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-24 h-24 rounded-full bg-[#FFD539] flex items-center justify-center"
          >
            <span className="text-[#142152] font-bold text-center">Safety Process</span>
          </div>
        </div>
      </div>
    </section>
  )
}

