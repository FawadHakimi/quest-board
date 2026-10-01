import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// StrictMode is intentionally NOT used: in development it renders every
// component twice, which would make the console.log render logs confusing.
createRoot(document.getElementById('root')).render(<App />)
