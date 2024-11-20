import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        console.log("Token Retrieved from localStorage:", token); // Debug log

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/blogs/allBlogs", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
           
            
          },
          withCredentials: true,  
        });
        console.log("API Response:", response); // Debug log
        setBlogs(response.data); // Save blogs data
      } catch (err) {
        console.error("API Call Error:", err.response || err.message || err); // Debug log
        setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
