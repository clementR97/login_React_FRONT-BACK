import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//mui 
import { StyledEngineProvider } from '@mui/material/styles'
//
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* mui */}
    <StyledEngineProvider injectFirst>
      
      <App />

      {/*  */}
    </StyledEngineProvider>   
  </StrictMode>,
)
