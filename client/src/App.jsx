import Footer from "./components/Footer"
import Header from "./components/Header"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Home from "./pages/Home"

import FindDoctor from "./pages/FindDoctor"
import DoctorInfo from "./pages/DoctorInfo"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import Private from "./pages/Private"
import { useSelector } from "react-redux"
import DoctorProfile from "./pages/DoctorProfile"
import Booking from "./pages/Booking"
import Checkout from "./pages/Checkout"
import ServicesPage from "./pages/ServicesPage"
import ScrollTop from "./scrollTop/scrollTop"


function App() {

  const {user} = useSelector((state) => ({ ...state }))
  const navigate = useNavigate();


  return (
    <div>
      <ScrollTop />
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/:doctor-name/:id" element={<DoctorInfo />} />


        <Route path={'/login'} element= { !user ? <Login /> : <Profile />} />
        
        <Route path="/register" element={ !user ? <Register /> : <Profile /> } />
                

        

        <Route path="/contact" element={<Contact />} />

        <Route element={<Private />}>
          <Route path="/profile" element={user && user.userType === 'Doctor' ? <DoctorProfile /> :  <Profile />} />
        </Route>

        <Route path="/booking-doctor/:id" element={<Booking />} />
        <Route path="/checkout-success" element={<Checkout />} />

      </Routes>
      <Footer />
    </div>

  )
}

export default App
