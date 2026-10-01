import { useState } from 'react'
import { DIFFICULTIES } from '../constants.js'

// Child with its own local state: the form fields.
function AddQuestForm({ onAdd }) {
  console.log('🔁 RENDER AddQuestForm')

  const [title, setTitle] = useState('')
  const [region, setRegion] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [reward, setReward] = useState(100)
  const [objectives, setObjectives] = useState(3)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (title.trim() === '') {
      setError('Give the quest a title before posting it.')
      return
    }
    onAdd({
      title: title.trim(),
      region: region.trim() || 'Unknown lands',
      difficulty,
      reward: Number(reward) || 0,
      objectives: Math.min(10, Math.max(1, Number(objectives) || 1)),
    })
    setTitle('')
    setRegion('')
    setError('')
  }

  return (
    <form className="panel add-form" onSubmit={handleSubmit}>
      <h2>Post a quest</h2>

      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Find the missing ferryman" />
      </label>
      {error && <p className="form-error">{error}</p>}

      <label>
        Region
        <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Lake Harrow" />
      </label>

      <label>
        Difficulty
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {DIFFICULTIES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>

      <div className="row">
        <label>
          Reward (gp)
          <input type="number" min="0" value={reward} onChange={(e) => setReward(e.target.value)} />
        </label>
        <label>
          Objectives
          <input type="number" min="1" max="10" value={objectives} onChange={(e) => setObjectives(e.target.value)} />
        </label>
      </div>

      <button type="submit" className="btn primary">Post quest</button>
    </form>
  )
}

export default AddQuestForm
