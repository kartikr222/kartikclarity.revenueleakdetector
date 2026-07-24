import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Diagnose from './pages/Diagnose'
import Report from './pages/Report'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-[#22233d] text-foreground">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
