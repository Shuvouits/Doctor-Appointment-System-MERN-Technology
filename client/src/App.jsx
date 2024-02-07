import Footer from "./components/Footer"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"


function App() {


  return (
    <div>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route  path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </div>

  )
}

export default App
