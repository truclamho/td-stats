import Link from "next/link"
import { Search } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-[#142152] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="w-6 h-6" />
          <span className="text-xl font-bold">Smartective</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="#" className="hover:text-[#FFD539] transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-[#FFD539] transition-colors">
            Solutions
          </Link>
          <Link href="#" className="hover:text-[#FFD539] transition-colors">
            Resources
          </Link>
          <Link href="#" className="hover:text-[#FFD539] transition-colors">
            Contact Us
          </Link>
        </div>
        <button className="bg-[#FFD539] text-[#142152] px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
          Login
        </button>
      </div>
    </nav>
  )
}

