import type React from "react"

interface CardProps {
  title: string
  text: string
  index: number
}

const Card: React.FC<CardProps> = ({ title, text, index }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-b-4 border-[#FFD539] ${index % 2 === 0 ? "lg:translate-y-8" : ""}`}
  >
    <div className="flex items-center mb-3">
      <div className="w-8 h-8 rounded-full bg-[#142152] text-white flex items-center justify-center text-sm font-bold mr-3">
        {index + 1}
      </div>
      <h3 className="text-xl font-bold text-[#142152]">{title}</h3>
    </div>
    <p className="text-gray-600">{text}</p>
  </div>
)

const DecorativeElement: React.FC = () => (
  <div className="hidden lg:block absolute right-0 bottom-0 w-32 h-32">
    <div className="relative w-full h-full">
      <div className="absolute w-16 h-16 bg-[#FFD539] rounded-full opacity-50 top-0 left-0"></div>
      <div className="absolute w-24 h-24 bg-[#FFD539] rounded-full opacity-30 bottom-0 right-0"></div>
    </div>
  </div>
)

export default function InfoCardsStaggered() {
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
    <section className="py-16 bg-[#FFF9E5] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#142152]">Safety In Action</h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-gray-600">
          Smartective uses IoT devices to track workers' cognitive, biometric, and environmental states, delivering
          real-time safety alerts to enhance communication and enable quick intervention.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} />
          ))}
        </div>
      </div>
      <DecorativeElement />
    </section>
  )
}

