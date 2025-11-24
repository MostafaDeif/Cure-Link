import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RoleProvider } from './Context/RoleContext.jsx'
import { LanguageProvider } from './Context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(

  <RoleProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </RoleProvider>
  ,

)
