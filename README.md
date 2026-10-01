# Guildhall Quest Board

Task 3 — Rendering and State. A single-page React dashboard for managing adventurer quests.
React 18 + Vite, `useState` only (no Context, Redux, or `useEffect`).

## Run locally
```
npm install
npm run dev
```
Open the browser DevTools console to watch the render logs.

## Feature map
| Requirement | Where |
|---|---|
| Add / remove | `AddQuestForm`, "Remove" on each card |
| Change status | status `<select>` on each card (parent state) |
| Local item state | `QuestCard`: progress, notes text, notes panel |
| Filter | status chips + search (`Toolbar`) |
| Reorder / reverse | "Order by" + "Reverse list" |
| Reset local state | "Reset progress" (bumps `resetToken` in the key) |
| State preserved on filter/reorder | key = `quest.id` |
| Console logging | `🔁 RENDER` in every component, `🟢 MOUNT` in `QuestCard` |

## Defense cheat-sheet
- **Re-render:** a component re-renders when its state/props change or its parent re-renders. Changing a status re-renders `App` and every visible `QuestCard`, but only that quest's props changed.
- **Reconciliation:** React compares the new element tree with the previous one. Same type + same key at the same spot = same instance (update). Different key = unmount old, mount new.
- **Component identity:** type + position + key. Local state belongs to the instance, not to the data.
- **Keys:** `key={quest.id}` lets React match cards to quests even when the list is filtered or reordered, so progress/notes stay with the right quest. No `🟢 MOUNT` logs appear when reordering.
- **Preserve:** set Key to "Stable id", add progress on a quest, then filter / reverse / sort. State follows the quest.
- **Reset:** "Reset progress" changes `resetToken`, so the key changes (`3-0` → `3-1`). React unmounts and remounts that card; a `🟢 MOUNT` log shows the fresh state.
- **Bug demo:** switch Key to "Array index", add progress, then reverse. The progress stays in the same position and appears on a different quest, because index keys tie identity to position.
- **Why no StrictMode:** it double-renders in dev and would double every log.
