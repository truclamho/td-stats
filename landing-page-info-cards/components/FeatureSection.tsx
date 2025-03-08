import type React from "react"

interface FeatureListProps {
  title: string
  features: string[]
}

const FeatureList: React.FC<FeatureListProps> = ({ title, features }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-4 text-[#142152]">{title}</h3>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#FFD539] rounded-full" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function FeatureSection() {
  const workerFeatures = [
    "Real-time Data Uplink",
    "User-Friendly Interface",
    "Intelligent Alerts",
    "Cognitive Check-Ins",
  ]

  const managerFeatures = ["Real-time Safety Monitoring", "Data Analytics Dashboards", "Comprehensive Reporting"]

  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#142152]">App Features</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <FeatureList title="For Workers" features={workerFeatures} />
          <FeatureList title="For Managers" features={managerFeatures} />
        </div>
      </div>
    </section>
  )
}

