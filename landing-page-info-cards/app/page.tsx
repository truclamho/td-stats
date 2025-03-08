"use client"

import type React from "react"

import { useState } from "react"
import { TrashIcon } from "lucide-react"

interface Player {
  id: string
  name: string
  totalPower: number
  type: string
  firstStrong: {
    type: string
    power: number
  }
  secondStrong: {
    type: string
    power: number
  }
}

// Define element type advantages
const typeAdvantages: Record<string, string[]> = {
  Water: ["Fire"],
  Fire: ["Earth"],
  Earth: ["Air"],
  Air: ["Water"],
  Light: ["Dark"],
  Dark: ["Light"],
}

export default function Home() {
  const [ourTeam, setOurTeam] = useState<Player[]>([])
  const [enemyTeam, setEnemyTeam] = useState<Player[]>([])
  const [showMatchups, setShowMatchups] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [totalPower, setTotalPower] = useState("")
  const [type, setType] = useState("")
  const [firstStrongType, setFirstStrongType] = useState("")
  const [firstStrongPower, setFirstStrongPower] = useState("")
  const [secondStrongType, setSecondStrongType] = useState("")
  const [secondStrongPower, setSecondStrongPower] = useState("")
  const [currentTeam, setCurrentTeam] = useState<"our" | "enemy">("our")

  const elementTypes = ["Water", "Fire", "Earth", "Air", "Light", "Dark"]

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

    if (currentTeam === "our") {
      setOurTeam([...ourTeam, player])
    } else {
      setEnemyTeam([...enemyTeam, player])
    }

    // Reset form
    setName("")
    setTotalPower("")
    setType("")
    setFirstStrongType("")
    setFirstStrongPower("")
    setSecondStrongType("")
    setSecondStrongPower("")
  }

  const removePlayer = (id: string, team: "our" | "enemy") => {
    if (team === "our") {
      setOurTeam(ourTeam.filter((player) => player.id !== id))
    } else {
      setEnemyTeam(enemyTeam.filter((player) => player.id !== id))
    }
  }

  const calculateMatchups = () => {
    setShowMatchups(true)
  }

  const resetMatchups = () => {
    setShowMatchups(false)
  }

  function calculateOptimalMatchups(ourTeam: Player[], enemyTeam: Player[]) {
    const matchups: { ourPlayer: Player; enemyPlayer: Player }[] = []
    const assignedOurPlayers = new Set<string>()
    const assignedEnemyPlayers = new Set<string>()

    // First, try to match our strongest players against enemy players they have type advantage against
    for (const ourPlayer of ourTeam) {
      if (assignedOurPlayers.has(ourPlayer.id)) continue

      // Find the strongest enemy player that our player has an advantage against
      let bestMatch: { player: Player; score: number } | null = null

      for (const enemyPlayer of enemyTeam) {
        if (assignedEnemyPlayers.has(enemyPlayer.id)) continue

        const advantage = calculateAdvantage(ourPlayer, enemyPlayer)
        const powerDiff = ourPlayer.totalPower - enemyPlayer.totalPower

        // Score is based on type advantage and power difference
        const score = advantage * 10 + (powerDiff > 0 ? 5 : 0)

        if (bestMatch === null || score > bestMatch.score) {
          bestMatch = { player: enemyPlayer, score }
        }
      }

      if (bestMatch) {
        matchups.push({ ourPlayer, enemyPlayer: bestMatch.player })
        assignedOurPlayers.add(ourPlayer.id)
        assignedEnemyPlayers.add(bestMatch.player.id)
      }
    }

    // For any remaining players, match by closest power level
    for (const ourPlayer of ourTeam) {
      if (assignedOurPlayers.has(ourPlayer.id)) continue

      let closestEnemy: { player: Player; diff: number } | null = null

      for (const enemyPlayer of enemyTeam) {
        if (assignedEnemyPlayers.has(enemyPlayer.id)) continue

        const powerDiff = Math.abs(ourPlayer.totalPower - enemyPlayer.totalPower)

        if (closestEnemy === null || powerDiff < closestEnemy.diff) {
          closestEnemy = { player: enemyPlayer, diff: powerDiff }
        }
      }

      if (closestEnemy) {
        matchups.push({ ourPlayer, enemyPlayer: closestEnemy.player })
        assignedOurPlayers.add(ourPlayer.id)
        assignedEnemyPlayers.add(closestEnemy.player.id)
      }
    }

    return matchups
  }

  function calculateAdvantage(ourPlayer: Player, enemyPlayer: Player): number {
    // Check if our player's type has advantage over enemy's type
    const ourTypeAdvantage = typeAdvantages[ourPlayer.type]?.includes(enemyPlayer.type) ? 1 : 0

    // Check if enemy's type has advantage over our type
    const enemyTypeAdvantage = typeAdvantages[enemyPlayer.type]?.includes(ourPlayer.type) ? 1 : 0

    // Calculate overall advantage
    return ourTypeAdvantage - enemyTypeAdvantage
  }

  // Sort both teams by total power (descending)
  const sortedOurTeam = [...ourTeam].sort((a, b) => b.totalPower - a.totalPower)
  const sortedEnemyTeam = [...enemyTeam].sort((a, b) => b.totalPower - a.totalPower)

  // Calculate matchups
  const matchups = showMatchups ? calculateOptimalMatchups(sortedOurTeam, sortedEnemyTeam) : []

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Player Matchup System</h1>

      {/* Player Input Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setCurrentTeam("our")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                currentTeam === "our" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Our Team
            </button>
            <button
              type="button"
              onClick={() => setCurrentTeam("enemy")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                currentTeam === "enemy" ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Enemy Team
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${
              currentTeam === "our" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Add to {currentTeam === "our" ? "Our Team" : "Enemy Team"}
          </button>
        </form>
      </div>

      {/* Team Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          {ourTeam.length === 0 ? (
            <p className="text-gray-500 italic">No players added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Power</th>
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ourTeam.map((player) => (
                    <tr key={player.id} className="border-t">
                      <td className="py-2 px-4">{player.name}</td>
                      <td className="py-2 px-4">{player.totalPower} mil</td>
                      <td className="py-2 px-4">{player.type}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => removePlayer(player.id, "our")}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Enemy Team</h2>
          {enemyTeam.length === 0 ? (
            <p className="text-gray-500 italic">No players added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Power</th>
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enemyTeam.map((player) => (
                    <tr key={player.id} className="border-t">
                      <td className="py-2 px-4">{player.name}</td>
                      <td className="py-2 px-4">{player.totalPower} mil</td>
                      <td className="py-2 px-4">{player.type}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => removePlayer(player.id, "enemy")}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Matchup Controls */}
      <div className="flex justify-center mb-8">
        <button
          onClick={calculateMatchups}
          disabled={ourTeam.length === 0 || enemyTeam.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Calculate Matchups
        </button>
        {showMatchups && (
          <button
            onClick={resetMatchups}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 ml-4"
          >
            Reset
          </button>
        )}
      </div>

      {/* Matchup Results */}
      {showMatchups && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Optimal Matchups</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Our Player</th>
                  <th className="py-2 px-4 text-left">Our Power</th>
                  <th className="py-2 px-4 text-left">Enemy Player</th>
                  <th className="py-2 px-4 text-left">Enemy Power</th>
                  <th className="py-2 px-4 text-left">Advantage</th>
                </tr>
              </thead>
              <tbody>
                {matchups.map((matchup, index) => {
                  const ourPlayer = matchup.ourPlayer
                  const enemyPlayer = matchup.enemyPlayer
                  const advantage = calculateAdvantage(ourPlayer, enemyPlayer)

                  return (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4">
                        {ourPlayer.name} ({ourPlayer.type})
                      </td>
                      <td className="py-2 px-4">{ourPlayer.totalPower} mil</td>
                      <td className="py-2 px-4">
                        {enemyPlayer.name} ({enemyPlayer.type})
                      </td>
                      <td className="py-2 px-4">{enemyPlayer.totalPower} mil</td>
                      <td
                        className={`py-2 px-4 ${advantage > 0 ? "text-green-600" : advantage < 0 ? "text-red-600" : "text-gray-600"}`}
                      >
                        {advantage > 0 ? "Favorable" : advantage < 0 ? "Unfavorable" : "Neutral"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}

