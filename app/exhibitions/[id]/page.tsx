"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const exhibitions = [
  {
    id: 1,
    title: "Typography in Motion",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Alice Johnson",
    description: "An exploration of kinetic typography and its applications in modern design.",
    details: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: 2,
    title: "Sustainable Packaging Design",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Bob Smith",
    description:
      "Innovative packaging solutions that prioritize environmental sustainability without compromising on aesthetics.",
    details: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: 3,
    title: "Digital Illustration Showcase",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Charlie Brown",
    description: "A collection of vibrant digital illustrations spanning various styles and themes.",
    details: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: 4,
    title: "Brand Identity Evolution",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Diana Ross",
    description: "A case study on the evolution of brand identities in the digital age.",
    details: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: 5,
    title: "Interactive Web Design",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Ethan Hunt",
    description: "Pushing the boundaries of web design with interactive and immersive user experiences.",
    details: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: 6,
    title: "Print Media Renaissance",
    image: "/placeholder.svg?height=600&width=800",
    designer: "Fiona Apple",
    description: "Rediscovering the power and beauty of print design in a digital world.",
    details: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
]

export default function Exhibition({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const exhibition = exhibitions.find((e) => e.id === Number.parseInt(params.id))

  if (!exhibition) {
    return <div>Exhibition not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            src={exhibition.image || "/placeholder.svg"}
            alt={exhibition.title}
            width={800}
            height={600}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{exhibition.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {exhibition.designer}</p>
            <p className="text-gray-700 mb-8">{exhibition.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {exhibition.details.map((detail, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} onClick={() => setSelectedImage(detail)}>
                  <Image
                    src={detail || "/placeholder.svg"}
                    alt={`Detail ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-32 object-cover rounded-md cursor-pointer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="relative">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected detail"
                width={800}
                height={600}
                className="max-w-full max-h-full"
              />
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white text-2xl">
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

