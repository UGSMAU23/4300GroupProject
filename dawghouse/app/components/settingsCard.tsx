'use client';

import { Poppins } from "next/font/google";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState, useEffect } from "react";
import Appearance from "./settings/appearance";
import Security from "./settings/security";
import Questionaire from "./settings/questionaire";
import Account from "./settings/account";

const poppins = Poppins({
    weight: '300',
    subsets: ['latin']
});

export async function sha256(str: string) {
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


export interface SettingsProp {
    email: string;
    accountName: string;
}

function SettingsCard(props: SettingsProp) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const components: {[key: string]: any} = {
        'appearance': <Appearance accountName={props.accountName} email={props.email} />,
        'security': <Security accountName={props.accountName} email={props.email} />,
        'questionaire': <Questionaire accountName={props.accountName} email={props.email} />,
        'account': <Account accountName={props.accountName} email={props.email} />
    }

    const [selectedComponent, setSelectedComponent] = useState('appearance');

    let accountName = props.accountName;
    useEffect(() => {
        const fetchImage = async () => {
            setEmail(await sha256(props.email));
        }

        fetchImage();
    })

    const handleSubmit = async (event: React.FormEvent) => {
        setIsLoading(true);
        event.preventDefault();
    
        try {
            try {
                const response = await fetch(`api/user/${props.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            } catch (e: any) {
                console.log(e);
            }

            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username}),
            });

            if (!response.ok) {
                throw new Error("Create account network response not OK");
            }
            router.replace('/login');
        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    
    }

    return (
        <>
        <div className="flex justify-center items-center bg-pink-50 min-h-screen">
            <div className={`bg-white my-12 md:my-0 border border-gray-200 rounded-lg p-4 shadow-md max-w-screen ${poppins.className}`}>
                <div className="flex flex-col md:flex-row gap-6 mt-5 mb-5">
                    <div className="flex flex-col md:ml-5">
                        <h1 className="text-2xl mb-10">Account Settings</h1>
                        <Link href={''} onClick={() => setSelectedComponent('appearance')}>
                        <h3 className={selectedComponent === 'appearance' ? 'mb-2 text-red-800' : 'mb-2'}>Appearance</h3>
                        </Link>
                        <Link href={''} onClick={() => setSelectedComponent('security')}>
                        <h3 className={selectedComponent === 'security' ? 'mb-2 text-red-800' : 'mb-2'}>Security & Privacy</h3>
                        </Link>
                        <Link href={''} onClick={() => setSelectedComponent('questionaire')}>
                        <h3 className={selectedComponent === 'questionaire' ? 'mb-2 text-red-800' : 'mb-2'}>My Questionnaire</h3>
                        </Link>
                        <Link href={''} onClick={() => setSelectedComponent('account')}>
                        <h3 className={selectedComponent === 'account' ? 'mb-2 text-red-800' : 'mb-2'}>My Account</h3>
                        </Link>
                    </div>
                    {components[selectedComponent]}
                </div>
            </div>
        </div>
        </>
    );
};


export default SettingsCard;
