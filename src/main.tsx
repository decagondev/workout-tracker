import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppContainer } from './AppContainer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer />
  </StrictMode>,
)
