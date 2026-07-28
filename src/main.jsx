import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted type: condensed heavy display, grotesque text, technical mono.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/anton/400.css'
import '@fontsource-variable/jetbrains-mono/wght.css'

import './styles/tokens.css'
import './styles/base.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
