import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TranslationProvider } from './contexts/TranslationContext'
import { LificosmProvider } from './contexts/LificosmContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TranslationProvider>
      <LificosmProvider>
        <App />
      </LificosmProvider>
    </TranslationProvider>
  </React.StrictMode>,
)
