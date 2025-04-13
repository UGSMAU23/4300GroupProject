'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useRef } from 'react';


const Footer = () => {

    const pathname = usePathname();
    const router = useRouter();
    const shouldScrollToContact = useRef(false);

    const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
        router.push('/');
        }
    };

    const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (pathname === '/') {
          const section = document.getElementById('contact');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = '#contact';
          }
        } else {
          router.push('/#contact');
        }
      };
    
      useEffect(() => {
        if (pathname === '/' && window.location.hash) {
          const sectionId = window.location.hash.slice(1);
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, [pathname]);

    return (
        <footer className="flex justify-center items-center py-4 bg-slate-100">
            <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center">
                    <Image src="dog.svg" alt="DawgHouse Logo" width="0" height="0" className="w-12 h-12 mr-2" />
                    <span className="font-bold text-2xl">
                        Dawg<span className="text-red-600">House</span>
                    </span>
                </Link>
                <div className="h-8 border-l border-gray-400"></div>
                <Link href="/" onClick={handleContactClick}>
          <span className="text-black underline block mt-1 cursor-pointer">Contact Us</span>
        </Link>
            </div>
        </footer>
    );
};

export default Footer;