import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Form from './components/Form/form.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Form />
    <App />
  </StrictMode>,
)
