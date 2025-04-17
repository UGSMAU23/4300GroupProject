// components/Navbar.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { MouseEvent, useEffect, useState, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  Info,
  Mail,
  ClipboardList,
  Settings as SettingsIcon,
  LogOut,
  LogIn,
  Users,
  UserPlus
} from 'lucide-react';

const Navbar = () => {

  const router = useRouter();
  const pathname = usePathname();
  const {data: session, status, update} = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState<boolean | null>(null);

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

  const handleLoggedInLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (hasCompletedQuiz) {
      router.push('/matches');
    } else {
      router.push('/quiz');
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
    update();
    if (pathname === '/' && window.location.hash) {
      const sectionId = window.location.hash.slice(1); // Remove the '#'
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pathname]);

  useEffect(() => {
    const fetchAnswers = async () => {
      if (session?.user?.email) {
        try {
          // Get user ID from email
          const resUser = await fetch(`/api?email=${session.user.email}`);
          const userData = await resUser.json();
          const userId = userData.user?._id;
  
          if (!userId) {
            setHasCompletedQuiz(false);
            return;
          }
  
          // Fetch saved answers
          const resAnswers = await fetch(`/api/user/${userId}`);
          const answerData = await resAnswers.json();
          const savedAnswers: string[] = answerData.answers;
  
          // Check if they actually completed the quiz
          const hasAnswered = Array.isArray(savedAnswers) && savedAnswers.length > 0;
          setHasCompletedQuiz(hasAnswered);
        } catch (err) {
          console.error("Failed to fetch answers:", err);
          setHasCompletedQuiz(false);
        }
      }
    };
  
    fetchAnswers();
  }, [session]);

  if (session != null) {
    return (

    // This is the navbar rendered when the user is signed in.

      <nav className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center">
        <Link href="/matches" passHref onClick={handleLoggedInLogoClick} className="flex items-center">
            <Image src="dog.svg" alt="DawgHouse Logo" width="0" height="0" className="w-12 h-12 mr-2" />
            <div className="flex items-center cursor-pointer">
              <span className="font-bold text-3xl">
                Dawg<span className="text-red-800">House</span>
              </span>
            </div>
          </Link>
        </div>
        {/* Screen sizes > 640px */}
        <div className="hidden sm:flex items-center space-x-10">
          <Link href="/#about" onClick={(e) => handleScrollClick(e, 'about')} >
            <span className="cursor-pointer hover:text-red-800 transition-colors font-bold">About</span>
          </Link>
          <Link href="/#contact" onClick={(e) => handleScrollClick(e, 'contact')}>
            <span className="cursor-pointer hover:text-red-800 transition-colors font-bold">Contact</span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center cursor-pointer gap-1 font-semibold hover:text-red-800 transition-colors">
              Account <ChevronDown size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-30">
                <Link href="/quiz" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                <ClipboardList size={16} /> Questionnaire
                </Link>
                {hasCompletedQuiz && (
                  <Link href="/matches" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                    <Users size={16} /> Matches
                  </Link>
                )}
                <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                <SettingsIcon size={16} /> Settings
                </Link>
                <button onClick={() => {setDropdownOpen(false); signOut();}} className="w-full flex items-center gap-2 cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100">
                <LogOut size={16} /> Sign Out, {session?.user?.name}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Screen sizes < 640px */}
        <div className="sm:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            <Menu size={24} />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-16 right-4 w-64 bg-white border border-gray-200 rounded shadow-md z-30">
              <Link href="/#about" onClick={(e) => { handleScrollClick(e, 'about'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
              <Info size={16} /> About
              </Link>
              <Link href="/#contact" onClick={(e) => { handleScrollClick(e, 'contact'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
              <Mail size={16} /> Contact
              </Link>
              <Link href="/quiz" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
              <ClipboardList size={16} /> Questionnaire
              </Link>
              {hasCompletedQuiz && (
                <Link href="/matches" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                  <Users size={16} /> Matches
                </Link>
              )}
              <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
              <SettingsIcon size={16} /> Settings
              </Link>
              <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="w-full flex items-center gap-2 cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100">
              <LogOut size={16} /> Sign Out, {session?.user?.name}
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (


    // This is the navbar rendered if the user is not signed in


    <nav className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
      <div className="flex items-center">
      <Link href="/" passHref onClick={handleLogoClick} className="flex items-center">
          <Image src="dog.svg" alt="DawgHouse Logo" width="0" height="0" className="w-12 h-12 mr-2" />
          <div className="flex items-center cursor-pointer">
            <span className="font-bold text-3xl">
              Dawg<span className="text-red-800">House</span>
            </span>
          </div>
        </Link>
      </div>
      {/* Screen sizes > 640px */}
      <div className="hidden sm:flex items-center space-x-10">
        <Link href="/#about" onClick={(e) => handleScrollClick(e, 'about')} >
          <span className="cursor-pointer hover:text-red-800 transition-colors font-bold">About</span>
        </Link>
        <Link href="/#contact" onClick={(e) => handleScrollClick(e, 'contact')}>
          <span className="cursor-pointer hover:text-red-800 transition-colors font-bold">Contact</span>
        </Link>
        <Link href="/login" className="cursor-pointer hover:text-red-800 transition-colors font-bold">Log In</Link>
        <Link href="/signup">
          <button className="bg-red-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-900 font-semi-bold">Join Now</button>
        </Link>
      </div>

      {/* Screen sizes < 640px */}
      <div className="sm:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          <Menu size={24} />
        </button>
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 w-64 bg-white border border-gray-200 rounded shadow-md z-30">
            <Link href="/#about" onClick={(e) => { handleScrollClick(e, 'about'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <Info size={16} /> About
            </Link>
            <Link href="/#contact" onClick={(e) => { handleScrollClick(e, 'contact'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <Mail size={16} /> Contact
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <LogIn size={16} /> Log In
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <UserPlus size={16} /> Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;