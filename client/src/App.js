import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {ChakraProvider} from '@chakra-ui/react'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import Rough from './pages/Rough'

function App() {

  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/courses' element={<Course/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/rough' element={<Rough/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='*' element={<h1>Oh-Oh! Page not found. 404</h1>}/>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ChakraProvider>
  )
}

export default App
