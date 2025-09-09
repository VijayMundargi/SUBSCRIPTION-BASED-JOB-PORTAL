import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Pages/Layout/Header";
import Jobs from "./Pages/Jobs/Jobs.jsx"
import Footer from "./Pages/Layout/Footer";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Plans from "./Pages/Plans/Plans";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import ResetPassword from "./Pages/Auth/Reset/ResetPassword";
import PaymentSuccess from "./Pages/Plans/Sucess/PaymentSuccess";
import PaymentFailed from "./Pages/Plans/Fails/PaymentFailed";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Profile from "./Pages/Auth/Profile.jsx";


function App() {
  return (
    <Router>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs " element={<Jobs />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />

       <Route path="/plan" element={<Plans />} />
       <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/sucess" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFailed />} />
         <Route path="/profile" element={<Profile />} />
        
    {/* Admin Routes*/}
    <Route path="/admin/dashboard" element={<Dashboard />} />

      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
