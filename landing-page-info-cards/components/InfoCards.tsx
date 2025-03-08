import type React from "react"

interface CardProps {
  title: string
  text: string
  index: number
  isLast: boolean
}

const Card: React.FC<CardProps> = ({ title, text, index, isLast }) => (
  <div className="relative flex items-center gap-8 group">
    {/* Timeline line */}
    {!isLast && (
      <div className="absolute left-[2.5rem] top-[4rem] w-1 h-[calc(100%+2rem)] bg-gray-200 group-hover:bg-[#FFD539] transition-colors" />
    )}

    {/* Number indicator */}
    <div className="relative flex-shrink-0 w-20 h-20 rounded-full bg-[#142152] text-white flex items-center justify-center text-2xl font-bold group-hover:bg-[#FFD539] group-hover:text-[#142152] transition-colors">
      {`0${index + 1}`}
    </div>

    {/* Content */}
    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:translate-x-2">
      <h3 className="text-xl font-bold mb-2 text-[#142152]">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
)

export default function InfoCards() {
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

        {/* Timeline container */}
        <div className="max-w-3xl mx-auto space-y-8">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} isLast={index === cards.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

