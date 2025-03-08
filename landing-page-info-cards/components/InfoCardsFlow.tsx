import type React from "react"
import { ArrowRight, ArrowDown } from "lucide-react"

interface CardProps {
  title: string
  text: string
  index: number
}

const Card: React.FC<CardProps> = ({ title, text, index }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl group">
    <div className="flex items-center mb-3">
      <div className="w-10 h-10 rounded-full bg-[#142152] text-white flex items-center justify-center text-lg font-bold mr-3 group-hover:bg-[#FFD539] group-hover:text-[#142152] transition-colors">
        {`0${index + 1}`}
      </div>
      <h3 className="text-xl font-bold text-[#142152]">{title}</h3>
    </div>
    <p className="text-gray-600">{text}</p>
  </div>
)

const Arrow: React.FC<{ direction: "right" | "down" }> = ({ direction }) => {
  const ArrowIcon = direction === "right" ? ArrowRight : ArrowDown
  return (
    <div className={`flex justify-center items-center ${direction === "right" ? "w-16" : "h-16"}`}>
      <ArrowIcon className="w-8 h-8 text-[#FFD539]" />
    </div>
  )
}

export default function InfoCardsFlow() {
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

        <div className="max-w-5xl mx-auto">
          {/* First row */}
          <div className="flex justify-between items-center mb-8">
            <Card {...cards[0]} index={0} />
            <Arrow direction="right" />
            <Card {...cards[1]} index={1} />
          </div>

          {/* Middle column */}
          <div className="flex flex-col items-center mb-8">
            <Arrow direction="down" />
            <Card {...cards[2]} index={2} />
            <Arrow direction="down" />
          </div>

          {/* Last row */}
          <div className="flex justify-between items-center">
            <Card {...cards[4]} index={4} />
            <Arrow direction="right" />
            <Card {...cards[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  )
}

