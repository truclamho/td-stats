import type { Player } from "../page"

interface MatchupResultsProps {
  ourTeam: Player[]
  enemyTeam: Player[]
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

export default function MatchupResults({ ourTeam, enemyTeam }: MatchupResultsProps) {
  // Sort both teams by total power (descending)
  const sortedOurTeam = [...ourTeam].sort((a, b) => b.totalPower - a.totalPower)
  const sortedEnemyTeam = [...enemyTeam].sort((a, b) => b.totalPower - a.totalPower)

  // Calculate matchups
  const matchups = calculateOptimalMatchups(sortedOurTeam, sortedEnemyTeam)

  return (
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
  )
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

