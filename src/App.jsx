import { RouterProvider } from 'react-router-dom'


import './App.css'
import router from './pages/router.jsx'


function App() {
  return <RouterProvider router={router} className="body"/>;
}

export default App
