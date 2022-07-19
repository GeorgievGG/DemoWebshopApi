import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Button from "./components/Button";

function App() {
  let navigate = useNavigate();
  const [showAboutLink, setShowAboutLink] = useState(true)

  const navigateHome = () => {
    navigate('/')
  }

  const login = async (userCredentials) => {
    const res = await fetch('https://localhost:7000/api/Authentication/Login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    })
    
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      navigateHome()
    }
    else {
      alert(`Login for user ${userCredentials.username} failed.`)
    }
  }

  const refreshToken = async (refreshToken) => {
    const res = await fetch('https://localhost:7000/api/Authentication/RefreshToken', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(refreshToken)
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
    }
    else {
      alert(`Refreshing token failed. You're being logged out!`)
      logout()
    }
  }

  const register = async (userInput) => {
    const res = await fetch('https://localhost:7000/api/User', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    
    const data = await res.json()
    if (res.ok) {
      alert(`User ${data.username} registered!`)
      navigateHome()
    }
    else {
      alert(`Registration failed for user ${userInput.username}: ${data.message}`)
    }
  }

  const logout = async () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  const toggleAboutLinkStatus = () => {
    setShowAboutLink(!showAboutLink)
  }

  return (
      <div className="container">
        <Header title='Hello from Demo Webshop!' />
        
        <Routes>
          <Route path='/' element={
            <>
              <div>Body</div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Button text={"Logout"} onClick={logout} />
            </>
            } />
          <Route path='/login' element=
            {
              <Login onLogin={login} onGoHomeClick={navigateHome} />
            } />
          <Route path='/register' element=
            {
              <Register onRegister={register} onGoHomeClick={navigateHome} />
            } />
          <Route path='/about' element=
            {
              <About onGoBackClick={toggleAboutLinkStatus}/>
            } />
        </Routes>
        <Footer onAboutClick={toggleAboutLinkStatus} showAboutLink={ showAboutLink } />
      </div>
  );
}

export default App;