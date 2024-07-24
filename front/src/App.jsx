import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from "./pages/Profile";
import { UserProvider } from "./components/context/userContext";

function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
