import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './components/pages/Home'
import About from './components/pages/About'
import BadaviLinga from './components/pages/BadaviLinga'
import SanapurLake from './components/pages/SanapurLake'
import KavaledurgaFort from './components/pages/KavaledurgaFort'
import Kodachadri from './components/pages/Kodachadri'

function App() {
  return (
    <>
      <ScrollToTop />
      {/* <Navbar /> */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/badavi-linga" element={<BadaviLinga />} />
          <Route path="/sanapur-lake" element={<SanapurLake />} />
          <Route path="/kavaledurga-fort" element={<KavaledurgaFort />} />
          <Route path="/kodachadri" element={<Kodachadri />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App