
import './App.css'
import MainLayout from './components/layout/MainLayout'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { SidebarProvider } from './components/ui/sidebar'
import Dashboard from './pages/article/Dashboard'
function App() {
 

  return (
    <>
     < BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
