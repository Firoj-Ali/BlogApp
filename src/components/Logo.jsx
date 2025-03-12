import React from 'react';

export default function Logo({ width = "100px" }) {
  return (
    <>
      <img 
        src="/blog png.png" // Use relative path from the public folder
        alt="Logo" 
        style={{ width }}  // Apply dynamic width from the props
      />
    </>
  );
}