import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null);    // Add an error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/blogs/allBlogs", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        });
        console.log(response);
        setBlogs(response.data); // Save blogs data
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false); // Ensure loading stops regardless of success or failure
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
