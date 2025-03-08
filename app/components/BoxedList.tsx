import type React from "react"

interface BoxedListProps {
  items: string[]
  style: "grid" | "flow" | "numbered"
  title?: string
}

const BoxedList: React.FC<BoxedListProps> = ({ items, style, title }) => {
  const getListStyle = () => {
    switch (style) {
      case "grid":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      case "flow":
        return "flex flex-wrap gap-4"
      case "numbered":
        return "space-y-4"
      default:
        return ""
    }
  }

  const getItemStyle = () => {
    switch (style) {
      case "grid":
      case "flow":
        return "bg-white p-4 rounded-lg shadow-md"
      case "numbered":
        return "bg-white p-4 rounded-lg shadow-md flex items-center"
      default:
        return ""
    }
  }

  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <ul className={getListStyle()}>
        {items.map((item, index) => (
          <li key={index} className={getItemStyle()}>
            {style === "numbered" && <span className="text-2xl font-bold text-indigo-500 mr-4">{index + 1}</span>}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BoxedList

