import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './Components/login.jsx'
import SignUp from './Components/SignUp.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Accueil from './Components/Accueil.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
          <AuthProvider>
          
            <Routes>
              <Route path='/' element={<Accueil />}/>
              <Route path='/Sign-in' element={<Login />}/>
              <Route path='/Sign-up' element={<SignUp />}/>
              {/* Secure Routes */}
              <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }/>
              <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
          
          </AuthProvider>

    </BrowserRouter>
  )
}

export default App
