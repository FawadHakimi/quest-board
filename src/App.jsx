import { useState } from 'react'
import { INITIAL_QUESTS } from './constants.js'
import StatsBar from './components/StatsBar.jsx'
import AddQuestForm from './components/AddQuestForm.jsx'
import Toolbar from './components/Toolbar.jsx'
import QuestCard from './components/QuestCard.jsx'

// Parent component: owns the DATA (quests) and the VIEW settings (filter, sort, ...).
// Each QuestCard owns its own LOCAL state (progress, notes, notes panel).
function App() {
  console.log('🔁 RENDER App (parent)')

  const [quests, setQuests] = useState(INITIAL_QUESTS)
  const [nextId, setNextId] = useState(INITIAL_QUESTS.length + 1)
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('added')
  const [reversed, setReversed] = useState(false)
  const [keyMode, setKeyMode] = useState('id') // 'id' = stable keys, 'index' = demo of the bug

  // ---- actions that change the data ----
  function addQuest(fields) {
    setQuests([...quests, { ...fields, id: nextId, status: 'Open', resetToken: 0 }])
    setNextId(nextId + 1)
  }

  function removeQuest(id) {
    setQuests(quests.filter((q) => q.id !== id))
  }

  function changeStatus(id, status) {
    setQuests(quests.map((q) => (q.id === id ? { ...q, status } : q)))
  }

  // Bumping resetToken changes the card's key -> React unmounts the old card
  // and mounts a fresh one -> its local state starts over.
  function resetQuestState(id) {
    setQuests(quests.map((q) => (q.id === id ? { ...q, resetToken: q.resetToken + 1 } : q)))
  }

  // ---- derived list: filter -> sort -> reverse (nothing is stored twice) ----
  const needle = search.trim().toLowerCase()
  let visible = quests.filter(
    (q) =>
      (statusFilter === 'All' || q.status === statusFilter) &&
      (needle === '' || q.title.toLowerCase().includes(needle) || q.region.toLowerCase().includes(needle))
  )
  if (sortBy === 'reward') visible = [...visible].sort((a, b) => b.reward - a.reward)
  if (sortBy === 'title') visible = [...visible].sort((a, b) => a.title.localeCompare(b.title))
  if (reversed) visible = [...visible].reverse()

  return (
    <div className="app">
      <header className="masthead">
        <h1>Guildhall Quest Board</h1>
        <p>Post contracts, track progress, and keep every adventurer's notes where you left them.</p>
      </header>

      <StatsBar quests={quests} />

      <div className="layout">
        <aside className="sidebar">
          <AddQuestForm onAdd={addQuest} />
        </aside>

        <main className="board">
          <Toolbar
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter}
            search={search}
            onSearch={setSearch}
            sortBy={sortBy}
            onSortBy={setSortBy}
            reversed={reversed}
            onToggleReverse={() => setReversed(!reversed)}
            keyMode={keyMode}
            onKeyMode={setKeyMode}
            shown={visible.length}
            total={quests.length}
          />

          {visible.length === 0 ? (
            <p className="empty">No quests match. Clear the search or pick another status.</p>
          ) : (
            <ul className="quest-list">
              {visible.map((quest, index) => (
                <QuestCard
                  // Stable key: identity follows the quest, so local state follows it too.
                  // resetToken in the key = intentional reset.
                  // Index key (demo): identity follows the POSITION, so state "slides" to the wrong quest.
                  key={keyMode === 'id' ? `${quest.id}-${quest.resetToken}` : index}
                  quest={quest}
                  onStatusChange={changeStatus}
                  onRemove={removeQuest}
                  onReset={resetQuestState}
                />
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
