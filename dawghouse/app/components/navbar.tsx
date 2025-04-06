// components/Navbar.tsx
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
      <div className="flex items-center">
      <a href="#top" className="flex items-center">
          <img src="dog.svg" alt="DawgHouse Logo" className="w-12 h-12 mr-2" />
          <div className="flex items-center cursor-pointer">
            <span className="font-bold text-3xl">
              Dawg<span className="text-red-600">House</span>
            </span>
          </div>
        </a>
      </div>
      <div className="flex items-center space-x-10">
        <a href="#about">
          <span className="cursor-pointer hover:text-red-600 transition-colors font-bold">About</span>
        </a>
        <a href="#contact">
          <span className="cursor-pointer hover:text-red-600 transition-colors font-bold">Contact</span>
        </a>
        <a href="#" className="cursor-pointer hover:text-red-600 transition-colors font-bold">Log In</a>
        <a href="#">
          <button className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700">Get Started</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;