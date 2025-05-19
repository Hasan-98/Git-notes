import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import GistDetail from './Components/Grist/GristDetails'
import Profile from './Components/Profile/Profile'
function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gist/:id" element={<GistDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
