import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
      <nav className="space-y-1" aria-label="Sidebar">
        {["Technology", "Science", "Culture", "Politics", "Economics"].map((category) => (
          <Link
            key={category}
            href={`/category/${category.toLowerCase()}`}
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
          >
            {category}
          </Link>
        ))}
      </nav>
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">Featured Article</h3>
        <p className="mt-2 text-sm text-gray-500">"The Future of Artificial Intelligence in Healthcare"</p>
        <Link
          href="/articles/ai-in-healthcare"
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Read more <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}

