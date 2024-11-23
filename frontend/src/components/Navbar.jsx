import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log(profile?.user);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      console.log(data);
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow-lg px-4 py-2">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          {/* Desktop */}
          <div className="mx-6">
            <ul className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                BLOGS
              </NavLink>
              <NavLink
                to="/creators"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                CREATORS
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                CONTACT
              </NavLink>
            </ul>
            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
          <div className="hidden md:flex space-x-2">
            {isAuthenticated && profile?.user?.role === "admin" ? (
              <NavLink
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
              >
                DASHBOARD
              </NavLink>
            ) : null}

            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
        {/* Mobile Navbar */}
        {show && (
          <div className="bg-white">
            <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
              <NavLink
                to="/"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/blogs"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                BLOGS
              </NavLink>
              <NavLink
                to="/creators"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                CREATORS
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
                }
              >
                CONTACT
              </NavLink>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
