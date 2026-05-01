import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppStateProvider, useAppState } from './hooks/useAppState.jsx'
import QuotaModal from './components/ui/QuotaModal'
import './index.css'



/**
 * AppRoot — wraps App router + mounts QuotaModal globally.
 * QuotaModal harus di luar router agar muncul di semua screen.
 */
function AppRoot() {
  const { showQuotaModal, setShowQuotaModal, backup } = useAppState()
  return (
    <>
      <App />
      {showQuotaModal && (
        <QuotaModal
          onBackup={() => { backup(); setShowQuotaModal(false) }}
          onClose={() => setShowQuotaModal(false)}
        />
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppStateProvider>
      <AppRoot />
    </AppStateProvider>
  </React.StrictMode>
)
