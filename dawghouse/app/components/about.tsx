"use client";

import house from '@/public/images/house.png';
import Image from 'next/image';
import { MailCheck, ClipboardList, Users } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';





const DawgHouse = () => {

    const router = useRouter();
    const pathname = usePathname();

    const handleGetStartedClick = () => {
        router.push('/signup');
    };

    return (
        <div className="min-h-[60vh] bg-slate-100 flex flex-col justify-center items-center px-4">
            {/* Title */}
            <div className="flex text-5xl text-center">
                <h1 className="text-black">What is </h1>
                <h1 className="text-red-600 ml-2">DawgHouse</h1>
                <h1 className="text-black ml-2">?</h1>
            </div>

            {/* Description */}
            <div className="max-w-4xl text-center mt-6 text-lg text-gray-700">
                <p>
                    DawgHouse is a free roommate matching platform for University of Georgia students looking to live off-campus in Athens. 
                    It's built to make finding the right roommate easy, secure, and stress-free.
                </p>
            </div>

            {/* 3-Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-10 w-full max-w-6xl">
                {/* Card 1: UGA Login */}
                <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-400 hover:scale-[1.02] transition-transform flex flex-col items-center text-center">
                    <MailCheck className="w-10 h-10 text-red-600 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-red-600">UGA Login</h2>
                    <p className="text-gray-700">
                        Sign up and log in using your UGA email to verify you're a student. This keeps the community secure and ensures you're only matched with other UGA students.
                    </p>
                </div>

                {/* Card 2: Questionnaire */}
                <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-400 hover:scale-[1.02] transition-transform flex flex-col items-center text-center">
                    <ClipboardList className="w-10 h-10 text-red-600 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-red-600">Roommate Questionnaire</h2>
                    <p className="text-gray-700">
                        New users complete a short, descriptive survey about their lifestyle and preferences to help find the most compatible roommate matches.
                    </p>
                </div>

                {/* Card 3: Dashboard */}
                <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-400 hover:scale-[1.02] transition-transform flex flex-col items-center text-center">
                    <Users className="w-10 h-10 text-red-600 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-red-600">Dashboard & Matching</h2>
                    <p className="text-gray-700">
                        Once the questionnaire is complete, you'll get a personalized dashboard showing top roommate matches. View their profiles and reach out when you're ready.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-lg text-center">
                <p>
                    Ready to find your perfect roommate? <a onClick={handleGetStartedClick} className="text-red-600 cursor-pointer font-semibold hover:underline">Get started here</a>.
                </p>
            </div>
        </div>
    );
};

export default DawgHouse;