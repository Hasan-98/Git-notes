import { Routes, Route } from 'react-router-dom'
import GistDetail from './Components/Grist/GristDetails'
import Profile from './Components/Profile/Profile'
import Header from './Components/Header/Header'
import Grist from './Components/Grist/Grist'
import CreateGist from './Components/Grist/CreateGist'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Grist />} />
        <Route path="/gist/:id" element={<GistDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/starred-gists" element={<Profile isStarred={true} />} />
        <Route path="/create-gist" element={<CreateGist />} />
      </Routes>
    </>
  )
}

export default App
