"use client"

import type { Player } from "../page"
import { TrashIcon } from "lucide-react"

interface TeamTableProps {
  players: Player[]
  onRemovePlayer: (id: string) => void
}

export default function TeamTable({ players, onRemovePlayer }: TeamTableProps) {
  if (players.length === 0) {
    return <p className="text-gray-500 italic">No players added yet.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Power</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">First Strong</th>
            <th className="py-2 px-4 text-left">Second Strong</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-t">
              <td className="py-2 px-4">{player.name}</td>
              <td className="py-2 px-4">{player.totalPower} mil</td>
              <td className="py-2 px-4">{player.type}</td>
              <td className="py-2 px-4">
                {player.firstStrong.power} mil {player.firstStrong.type}
              </td>
              <td className="py-2 px-4">
                {player.secondStrong.power} mil {player.secondStrong.type}
              </td>
              <td className="py-2 px-4">
                <button onClick={() => onRemovePlayer(player.id)} className="text-red-600 hover:text-red-800">
                  <TrashIcon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

