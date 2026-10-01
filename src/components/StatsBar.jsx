import { STATUSES } from '../constants.js'

function StatsBar({ quests }) {
  console.log('🔁 RENDER StatsBar')
  const gold = quests.filter((q) => q.status !== 'Failed').reduce((sum, q) => sum + q.reward, 0)

  return (
    <section className="stats" aria-label="Board summary">
      {STATUSES.map((s) => (
        <div className="stat" key={s}>
          <strong>{quests.filter((q) => q.status === s).length}</strong>
          <span>{s}</span>
        </div>
      ))}
      <div className="stat stat-gold">
        <strong>{gold.toLocaleString()} gp</strong>
        <span>Gold on the board</span>
      </div>
    </section>
  )
}

export default StatsBar
