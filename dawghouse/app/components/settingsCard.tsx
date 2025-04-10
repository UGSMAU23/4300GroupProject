'use client';

import { Poppins } from "next/font/google";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const poppins = Poppins({
    weight: '300',
    subsets: ['latin']
});

async function sha256(str: string) {
    // Convert string to array buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    
    // Generate SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
};


interface SettingsProp {
    email: string;
    accountName: string;
}

function SettingsCard(props: SettingsProp) {
    const [email, setEmail] = useState("");
    let accountName = props.accountName;
    useEffect(() => {
        const fetchImage = async () => {
            setEmail(await sha256(props.email));
        }

        fetchImage();
    })

    return (
        <div className="flex justify-center items-center bg-pink-50 w-screen h-screen">
            <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-md ${poppins.className}`}>
                <div className="flex ml-5 mt-5 mb-5">
                    <div className="flex flex-col">
                        <h1 className="text-2xl mb-10">Account Settings</h1>
                        <Link href={''}>
                        <h3 className="mb-2 text-red-600">Appearance</h3>
                        </Link>
                        <Link href={''}>
                        <h3 className="mb-2">Security & Privacy</h3>
                        </Link>
                        <Link href={''}>
                        <h3 className="mb-2">My Questionnaire</h3>
                        </Link>
                        <Link href={''}>
                        <h3 className="mb-2">My Account</h3>
                        </Link>
                    </div>
                    <div className="mr-20 ml-10 mt-10">
                        {/* Put code for each tab here */}
                        <Image src={`https://gravatar.com/avatar/${email}`} width='100' height='100' alt="Profile picture" className="rounded-full mb-5 ml-20"></Image>
                        <Form action={'api/updateProfile'} className="flex flex-col ml-5">
                            <label htmlFor="name" className=''>Name</label>
                            <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' defaultValue={`${accountName}`}></input>
                            <input className={`border-solid border-black bg-red-500 rounded-lg 2-60 mt-4 text-white drop-shadow-lg ${poppins.className}`} id='submit' type="submit"></input>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SettingsCard;
