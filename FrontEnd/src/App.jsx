import { useState } from 'react'
import Login from './Components/login.jsx'
import SignUp from './Components/SignUp.jsx'
import Accueil from './Components/Accueil.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Accueil/>}/>
              <Route path='/Sign-in' element={<Login/>}/>
              <Route path='/Sign-up' element={<SignUp/>}/>
              {/* <Route path='*' element={<PageNotFound/>}/> */}
            </Routes>
          {/* <Login/> */}
          {/* <SignUp/> */}
          </BrowserRouter>
    
  )
}

export default App
