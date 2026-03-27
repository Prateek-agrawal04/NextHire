import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import { dark } from '@clerk/themes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
    appearance={{
      theme: dark,
    }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)