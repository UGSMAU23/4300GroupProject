"use client";
import Form from 'next/form';
import Link from 'next/link';
import { League_Spartan } from 'next/font/google';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const league = League_Spartan({
    weight: '400',
    subsets: ['latin']
});

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        setIsLoading(true);
        event.preventDefault();
    
        try {
            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
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
        <div className="flex justify-start items-center flex-col bg-pink-50 h-screen">
            <div className="flex text-5xl mt-30">
                <h1 className={`text-black ${league.className}`}>Create Account</h1>
            </div>
            <div className="w-screen flex justify-center items-center px-4 md:px-0">
                <div className="bg-white border-solid rounded-lg mt-10 mb-10 shadow-lg/50 w-[500px]">
                    <Form action='' onSubmit={handleSubmit} className="flex flex-col m-10">
                        <label htmlFor="email">Name</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="username" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Name" required/>
                        <label htmlFor="email">Email</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                        <label htmlFor="password" className="mt-3">Password</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                        <div className="bg-red-800 rounded-md flex justify-center items-center mt-5 shadow-md">
                            <button className="text-white grow" value="Login" type='submit' disabled={isLoading}>
                                {isLoading ? "Loading..." : "Create Account"}
                            </button>
                        </div>
                    </Form>
                    
                    <div className="text-sm text-left px-12 pb-10">
                        <Link href="/login" className="text-black underline block">Already have an account? Log in here.</Link>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CreateAccount;