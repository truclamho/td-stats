import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              TextHub
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link href="/articles" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Articles
              </Link>
              <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              href="/search"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Search
            </Link>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <Link href="/articles" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Articles
          </Link>
          <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}

