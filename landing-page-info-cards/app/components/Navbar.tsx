import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-gray-800">Design Exhibitions</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Home
            </Link>
            <Link
              href="/exhibitions"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Exhibitions
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

