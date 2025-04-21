"use client";
import Form from 'next/form';
import Link from 'next/link';
import { League_Spartan } from 'next/font/google';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

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
        // ensure its exclusively uga emails
        if (!email.includes('@uga.edu')) {
            toast.error("Please use your UGA email address", {position: "top-center", autoClose: 3000});
            setIsLoading(false);
            return;
        }

        const loginPromise = new Promise(async resolve => {
            try {
                const response = await fetch('/api/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });
    
                if (!response.ok) {
                    throw new Error("Create account network response not OK");
                }
                setIsLoading(false);
                resolve("success");
            } catch (e: any) {
                console.log(e);
                setIsLoading(false);
                resolve("error");
            }
        })

        toast.promise(
            loginPromise,
            {
                pending: {
                    render() {
                        return 'Creating Account..'
                    },
                    position: "top-center",
                },
                success: {
                    render() {
                        return "Account Created successfully! Redirecting..."
                    },
                    position: "top-center",
                },
                error: {
                    render() {
                        return "Error creating account. Please try again."
                    },
                    position: "top-center",
                },
            }
        );
        await new Promise (resolve => setTimeout(resolve, 3000));
        router.replace('/login');
    
    }

    return (
        <div className="flex justify-start items-center flex-col bg-pink-50 h-screen">
            <ToastContainer />
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
                        <div className="bg-red-800 hover:bg-red-900 rounded-md flex justify-center items-center mt-5 shadow-md">
                            <button className="text-white cursor-pointer grow" value="Login" type='submit' disabled={isLoading}>
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