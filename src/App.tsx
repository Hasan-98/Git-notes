import { Routes, Route } from 'react-router-dom'
import GistDetail from './Components/Grist/GristDetails'
import Profile from './Components/Profile/Profile'
import Header from './Components/Header/Header'
import Grist from './Components/Grist/Grist'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Grist />} />
        <Route path="/gist/:id" element={<GistDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
