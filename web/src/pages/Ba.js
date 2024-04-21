import React, { useState, useEffect } from "react";

function Ba() {
  const [locationHeader, setLocationHeader] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/'+window.location.href.substring(window.location.href.lastIndexOf("/") + 1));
        const data = await response.json(); 
        const locationHeader = data.redirectUrl; 
        setLocationHeader(locationHeader);
        setTitle(data.title ? data.title : 'No title available');
        setDescription(data.description ? data.description : 'No description available');

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = () => {
    if (locationHeader) {
      window.location.href = locationHeader;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 overflow-hidden">
      <div className="mockup-browser border bg-base-300 sm:max-w-90 max-w-screen-sm">
        <div className="mockup-browser-toolbar" onClick={handleRedirect}>
          <div className="input">{locationHeader}</div>
        </div>
        <div className="flex justify-center p-4">
          <div className="text-center">
            <h1 className="text-lg">You are being redirected to</h1>
            <h2 className="text-xl">Title: {title}</h2>
            <p className="text-md">Description: {description}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleRedirect}>
              Redirect Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default Ba;
