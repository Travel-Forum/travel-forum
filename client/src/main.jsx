import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider.jsx'
import { Toaster } from './components/ui/toaster.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider defaultTheme="light">
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)