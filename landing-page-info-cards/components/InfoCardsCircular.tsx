import type React from "react"

interface CardProps {
  title: string
  text: string
  index: number
  totalCards: number
}

const Card: React.FC<CardProps> = ({ title, text, index, totalCards }) => {
  // Calculate position around the circle
  const angle = (index * (360 / totalCards) - 90) * (Math.PI / 180)
  const radius = 250 // Adjust this value to change circle size

  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return (
    <div
      className="absolute w-64 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="w-10 h-10 rounded-full bg-[#142152] text-white flex items-center justify-center text-lg font-bold mb-3 group-hover:bg-[#FFD539] group-hover:text-[#142152]">
          {`0${index + 1}`}
        </div>
        <h3 className="text-lg font-bold mb-2 text-[#142152]">{title}</h3>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  )
}

export default function InfoCardsCircular() {
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
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#142152]">Safety In Action</h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-gray-600">
          Smartective uses IoT devices to track workers' cognitive, biometric, and environmental states, delivering
          real-time safety alerts to enhance communication and enable quick intervention.
        </p>

        {/* Circular layout container */}
        <div className="relative h-[600px] max-w-[1000px] mx-auto">
          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#142152] flex items-center justify-center">
            <span className="text-white text-center font-bold">Safety Process</span>
          </div>

          {/* Cards */}
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} totalCards={cards.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

