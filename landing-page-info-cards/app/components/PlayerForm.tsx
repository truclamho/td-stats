"use client"

import type React from "react"

import { useState } from "react"
import type { Player } from "../page"

interface PlayerFormProps {
  onAddPlayer: (player: Player) => void
  teamLabel: string
}

export default function PlayerForm({ onAddPlayer, teamLabel }: PlayerFormProps) {
  const [name, setName] = useState("")
  const [totalPower, setTotalPower] = useState("")
  const [type, setType] = useState("")
  const [firstStrongType, setFirstStrongType] = useState("")
  const [firstStrongPower, setFirstStrongPower] = useState("")
  const [secondStrongType, setSecondStrongType] = useState("")
  const [secondStrongPower, setSecondStrongPower] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const player: Player = {
      id: Date.now().toString(),
      name,
      totalPower: Number.parseFloat(totalPower),
      type,
      firstStrong: {
        type: firstStrongType,
        power: Number.parseFloat(firstStrongPower),
      },
      secondStrong: {
        type: secondStrongType,
        power: Number.parseFloat(secondStrongPower),
      },
    }

    onAddPlayer(player)

    // Reset form
    setName("")
    setTotalPower("")
    setType("")
    setFirstStrongType("")
    setFirstStrongPower("")
    setSecondStrongType("")
    setSecondStrongPower("")
  }

  const elementTypes = ["Water", "Fire", "Earth", "Air", "Light", "Dark"]

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. Ryoko"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Power</label>
          <input
            type="text"
            value={totalPower}
            onChange={(e) => setTotalPower(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. 22.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Type</option>
            {elementTypes.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Strong Type</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={firstStrongType}
              onChange={(e) => setFirstStrongType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Type</option>
              {elementTypes.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={firstStrongPower}
              onChange={(e) => setFirstStrongPower(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Power"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Second Strong Type</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={secondStrongType}
              onChange={(e) => setSecondStrongType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Type</option>
              {elementTypes.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={secondStrongPower}
              onChange={(e) => setSecondStrongPower(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Power"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        Add to {teamLabel}
      </button>
    </form>
  )
}

