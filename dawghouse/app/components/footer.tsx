// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        // Fix white space above footer + add functionality from navbar to logo onClick in future
        <footer className="flex justify-center items-center py-4 bg-white border-t">
            <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center">
                    <Image src="dog.svg" alt="DawgHouse Logo" width="0" height="0" className="w-12 h-12 mr-2" />
                    <span className="font-bold text-2xl">
                        Dawg<span className="text-red-600">House</span>
                    </span>
                </Link>
                <div className="h-8 border-l border-gray-400"></div>
                <Link href="/#contact">
                    <span className="text-black underline block mt-1">Contact Us</span>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;