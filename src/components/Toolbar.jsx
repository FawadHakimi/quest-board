import { STATUSES } from '../constants.js'

function Toolbar({
  statusFilter, onStatusFilter, search, onSearch,
  sortBy, onSortBy, reversed, onToggleReverse,
  keyMode, onKeyMode, shown, total,
}) {
  console.log('🔁 RENDER Toolbar')

  return (
    <section className="panel toolbar" aria-label="Filter and order quests">
      <div className="chips" role="group" aria-label="Filter by status">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            className={statusFilter === s ? 'chip active' : 'chip'}
            onClick={() => onStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="controls">
        <input
          className="search"
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search title or region"
          aria-label="Search quests"
        />

        <label className="inline">
          Order by
          <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
            <option value="added">Date posted</option>
            <option value="reward">Reward</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>

        <button className={reversed ? 'btn active' : 'btn'} onClick={onToggleReverse}>
          Reverse list
        </button>
      </div>

      <div className="key-demo">
        <label className="inline">
          React key
          <select value={keyMode} onChange={(e) => onKeyMode(e.target.value)}>
            <option value="id">Stable id (correct)</option>
            <option value="index">Array index (bug demo)</option>
          </select>
        </label>
        <span className="hint">
          {keyMode === 'id'
            ? 'Progress and notes stay with their quest when you filter, order or reverse.'
            : 'Progress and notes stay in their position, so they jump to a different quest.'}
        </span>
        <span className="count">Showing {shown} of {total}</span>
      </div>
    </section>
  )
}

export default Toolbar
