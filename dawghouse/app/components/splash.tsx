'use client';

import React from 'react';
import Image from 'next/image';
import livingroom from '@/public/images/livingroom.jpg';
import { useRouter, usePathname } from 'next/navigation';

const Splash = () => {

  const router = useRouter();
  const pathname = usePathname();

  const handleLearnMoreClick = () => {
    const section = document.getElementById('about');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinNowClick = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-[70vh] bg-white overflow-hidden" >
      <div className="flex flex-col lg:flex-row min-h-[70vh]">

        <div className="w-full lg:w-1/2 flex items-center p-16 md:p-32 lg:p-64 relative">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 md:mb-4">
              Find The Perfect
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold text-red-700 mb-4">
              Athens Roommate
            </h1>
            <p className="text-gray-700 text-lg mb-10">
              Connect with a roommate who shares your lifestyle, interests, and values. 
              Our matching system helps you find harmony in shared living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLearnMoreClick}
                className="bg-white hover:bg-gray-100 cursor-pointer text-red-700 border border-red-700 px-6 py-3 rounded-lg font-medium transition-all"
              >
                Learn More
              </button>
              <button
                onClick={handleJoinNowClick}
                className="bg-red-700 hover:bg-red-800 cursor-pointer text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative">
          <div className="hidden lg:block absolute top-0 left-0 w-24 h-full bg-white z-5"
               style={{
                 clipPath: 'polygon(0 0, 0% 100%, 100% 0)'
               }}>
          </div>

          <div className="h-64 lg:h-full flex items-center justify-center relative">
            <div className="relative w-full h-full">
              <Image
                src={livingroom}
                alt="hero image"
                fill
                objectFit='cover'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;