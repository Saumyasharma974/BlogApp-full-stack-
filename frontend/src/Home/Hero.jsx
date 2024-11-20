import React from 'react';
import { useAuth } from '../context/AuthProvider';

function Hero() {
  const { blogs, loading, error } = useAuth(); // Destructure the context values

  console.log("Blogs:", blogs);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Blogs</h1>
      {blogs && blogs.length > 0 ? (
        <ul>
          {blogs.map((blog, index) => (
            <li key={index}>{blog.title}</li> // Adjust based on your API response structure
          ))}
        </ul>
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}

export default Hero;
