import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div>
    <header className="relative h-96 text-center flex flex-col items-center justify-center lg:mt-[127px] mt-20">
      {/* Background Image */}
      <img
        className="border border-gray-400 absolute lg:w-[1200px] w-92 lg:h-[500px] h-[400px] object-cover"
        src={assets.home}
        alt="Hero Banner"
      />

      {/* Button */}
      <button className="relative top-0 lg:left-80 left-28 text-lg lg:text-2xl text-red-700 px-4 py-2 font-semibold rounded-lg bg-white shadow-md hover:bg-gray-100 transition">
        Shop Now
      </button>
    </header>
    </div>
  );
};

export default Hero;
