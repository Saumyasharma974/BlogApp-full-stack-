import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './component/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import { useAuth } from './context/AuthProvider';
import {  Toaster } from 'react-hot-toast';
import Creators from './pages/Creators';

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      <Toaster/>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
