import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppStateProvider, useAppState } from './hooks/useAppState.jsx'
import QuotaModal from './components/ui/QuotaModal'
import './index.css'

// #region agent log
document.title = `${document.title} [DBG c2b604]`;
fetch('http://127.0.0.1:7660/ingest/90fc37fd-960e-497c-84a8-7cce8dd5fedb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c2b604'},body:JSON.stringify({sessionId:'c2b604',runId:'pre-fix',hypothesisId:'H6',location:'src/main.jsx:6',message:'Main bootstrap executed',data:{href:window.location.href,userAgent:navigator.userAgent},timestamp:Date.now()})}).catch(()=>{});
try { navigator.sendBeacon('http://127.0.0.1:7660/ingest/90fc37fd-960e-497c-84a8-7cce8dd5fedb', JSON.stringify({sessionId:'c2b604',runId:'pre-fix',hypothesisId:'H8',location:'src/main.jsx:7',message:'Main bootstrap beacon fallback',data:{href:window.location.href},timestamp:Date.now()})); } catch {}
fetch('http://127.0.0.1:7660/ingest/90fc37fd-960e-497c-84a8-7cce8dd5fedb',{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c2b604'},body:JSON.stringify({sessionId:'c2b604',runId:'pre-fix',hypothesisId:'H9',location:'src/main.jsx:9',message:'Main bootstrap no-cors fallback',data:{href:window.location.href},timestamp:Date.now()})}).catch(()=>{});
window.addEventListener('error',(event)=>{fetch('http://127.0.0.1:7660/ingest/90fc37fd-960e-497c-84a8-7cce8dd5fedb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c2b604'},body:JSON.stringify({sessionId:'c2b604',runId:'pre-fix',hypothesisId:'H7',location:'src/main.jsx:7',message:'Window error captured',data:{message:event.message,filename:event.filename},timestamp:Date.now()})}).catch(()=>{});});
// #endregion

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
