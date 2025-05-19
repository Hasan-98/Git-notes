import JsonView from '@uiw/react-json-view'
import { lightTheme } from '@uiw/react-json-view/light'
import { useParams, useLocation } from 'react-router-dom'

export default function GistDetail() {
  const { id } = useParams()
  const location = useLocation()
  return (
    <div>
      <h2>Gist Detail Page</h2>
      <p>Gist ID: {id}</p>
      <JsonView value={location.state.gist} style={lightTheme} />
      
    </div>
  )
}
