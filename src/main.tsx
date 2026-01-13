import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { assertMetrics } from './lib/assertMetrics'

// Run metrics assertions in dev mode
if (import.meta.env.DEV) {
  assertMetrics()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
