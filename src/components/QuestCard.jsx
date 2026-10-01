import { useState } from 'react'
import { STATUSES } from '../constants.js'

// Child with LOCAL state: progress, notes, notes panel.
// Data (title, status, ...) comes from the parent through props.
function QuestCard({ quest, onStatusChange, onRemove, onReset }) {
  // The initializer function only runs when the component is MOUNTED (created),
  // so this log shows exactly when React creates a new instance with fresh state.
  const [progress, setProgress] = useState(() => {
    console.log(`🟢 MOUNT  QuestCard #${quest.id} "${quest.title}" (new instance, state starts empty)`)
    return 0
  })
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  console.log(`🔁 RENDER QuestCard #${quest.id} "${quest.title}" | status=${quest.status} progress=${progress}`)

  const allDone = progress === quest.objectives
  const isClosed = quest.status === 'Completed' || quest.status === 'Failed'

  return (
    <li className={`card diff-${quest.difficulty.toLowerCase()} ${isClosed ? 'closed' : ''}`}>
      <div className="card-head">
        <h3>{quest.title}</h3>
        <span className="reward">{quest.reward.toLocaleString()} gp</span>
      </div>

      <p className="meta">
        {quest.region} · <span className="difficulty">{quest.difficulty}</span>
      </p>

      <label className="inline status-edit">
        Status
        <select
          className={`status s-${quest.status.replace(' ', '-').toLowerCase()}`}
          value={quest.status}
          onChange={(e) => onStatusChange(quest.id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="progress">
        <div className="pips" aria-label={`${progress} of ${quest.objectives} objectives done`}>
          {Array.from({ length: quest.objectives }, (_, i) => (
            <span key={i} className={i < progress ? 'pip done' : 'pip'} />
          ))}
        </div>
        <span className="progress-text">{progress}/{quest.objectives} objectives</span>
        <div className="stepper">
          <button className="btn small" onClick={() => setProgress(progress - 1)} disabled={progress === 0} aria-label="Undo objective">−</button>
          <button className="btn small" onClick={() => setProgress(progress + 1)} disabled={allDone} aria-label="Complete objective">+</button>
        </div>
      </div>

      {allDone && quest.status !== 'Completed' && (
        <p className="banner">
          Every objective is done.{' '}
          <button className="link" onClick={() => onStatusChange(quest.id, 'Completed')}>Mark completed</button>
        </p>
      )}

      {showNotes && (
        <textarea
          className="notes"
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Party notes, clues, who owes whom..."
          aria-label={`Notes for ${quest.title}`}
        />
      )}

      <div className="card-actions">
        <button className="btn small" onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? 'Hide notes' : notes ? 'Show notes ●' : 'Add notes'}
        </button>
        <button className="btn small" onClick={() => onReset(quest.id)}>Reset progress</button>
        <button className="btn small danger" onClick={() => onRemove(quest.id)}>Remove</button>
      </div>
    </li>
  )
}

export default QuestCard
