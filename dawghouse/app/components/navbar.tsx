// components/Navbar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { MouseEvent, useEffect } from 'react';

const Navbar = () => {

  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      router.push('/');
    }
  };

  const handleScrollClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (pathname === '/') {
      // Scrolls to sections if on splash page, redirects to splash page and scrolls to element if on a different page
      e.preventDefault();

      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({behavior: 'smooth'});
      }
    } 
  };

  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const sectionId = window.location.hash.slice(1); // Remove the '#'
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
      <div className="flex items-center">
      <Link href="/" passHref onClick={handleLogoClick} className="flex items-center">
          <Image src="dog.svg" alt="DawgHouse Logo" width="0" height="0" className="w-12 h-12 mr-2" />
          <div className="flex items-center cursor-pointer">
            <span className="font-bold text-3xl">
              Dawg<span className="text-red-600">House</span>
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-10">
        <Link href="/#about" onClick={(e) => handleScrollClick(e, 'about')} >
          <span className="cursor-pointer hover:text-red-600 transition-colors font-bold">About</span>
        </Link>
        <Link href="/#contact" onClick={(e) => handleScrollClick(e, 'contact')}>
          <span className="cursor-pointer hover:text-red-600 transition-colors font-bold">Contact</span>
        </Link>
        <Link href="/login" className="cursor-pointer hover:text-red-600 transition-colors font-bold">Log In</Link>
        <Link href="/signup">
          <button className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700">Get Started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;