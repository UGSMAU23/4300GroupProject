'use client';




import React from 'react';




const Splash = () => {
  const handleClick = () => {
    console.log('button clicked');
  };


  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-pink-50 px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-brown-900 mb-4">
          Find Your Athens
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold mb-12">
          <span className="text-red-700">Room</span>
          <span className="outline-text">mate</span>
        </h2>


        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <p className="text-gray-600 text-lg flex-grow text-left p-2">
              Create an account and complete the questionnaire to start.
            </p>
            <button
              onClick={handleClick}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-medium flex items-center"
            >
              Find Roommate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Splash;
