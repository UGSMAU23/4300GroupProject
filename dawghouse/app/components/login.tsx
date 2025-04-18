"use client";
import Form from 'next/form';
import Link from 'next/link';
import { League_Spartan } from 'next/font/google';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doCredentialsLogin } from '../actions';
import { toast, ToastContainer } from 'react-toastify';

const league = League_Spartan({
    weight: '400',
    subsets: ['latin']
});

const Login = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        setIsLoading(true);
        event.preventDefault();
        const status = toast.loading("Logging in...", {position: "top-center"});
    
        try {
            const formData = new FormData(event.currentTarget);
    
            const response = await doCredentialsLogin(formData);
    
            if (response?.error) {
                toast.update(status, {render: "Error Logging In. Please try again", type: "error", isLoading: false, autoClose: 3000});
            } else {
                
                toast.update(status, { render: "Successfully Logged In. Redirecting...", type: "success", isLoading: false, autoClose: 2000 });
                try {
                const email = formData.get("email")?.toString();
                if (!email) throw new Error("Missing email");

                // Get user ID from email
                const resUser = await fetch(`/api?email=${email}`);
                const userData = await resUser.json();
                const userId = userData.user?._id;
                if (!userId) throw new Error("No user ID found");

                // Get answers array
                const resAnswers = await fetch(`/api/user/${userId}`);
                const answerData = await resAnswers.json();
                const answers: string[] = answerData.answers;

                // Delay to let toast show for a sec
                await new Promise(r => setTimeout(r, 2000));

                // If they have completed their quiz before.
                if (answers.length > 1) {
                    router.replace("/matches");
                } else {
                    router.replace("/quiz");
                }
                } catch (err) {
                console.error("Error checking answers after login:", err);
                router.replace("/quiz");
                }
            }
        } catch (e: any) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-start items-center flex-col bg-pink-50 h-screen">
            <ToastContainer />
            <div className="flex text-5xl mt-30">
                <h1 className={`text-black ${league.className}`}>Login</h1>
            </div>
            <div className="w-screen flex justify-center items-center px-4 md:px-0">
                <div className="bg-white border-solid rounded-lg mt-10 mb-10 shadow-lg/50 w-[500px]">
                    <Form action={''} onSubmit={onSubmit} className="flex flex-col m-10">
                        <label htmlFor="email">Email</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="email" name="email" type="email" placeholder="Email" required/>
                        <label htmlFor="password" className="mt-3">Password</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="password" name="password" type="password" placeholder="Password" required/>
                        <div className="bg-red-800 hover:bg-red-900 rounded-md flex justify-center items-center mt-5 shadow-md">
                            <button className="text-white grow cursor-pointer" value="Login" type='submit' disabled={isLoading}>
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </Form>
                    
                    <div className="text-sm text-left px-12 pb-10">
                        {/* <Link href="..." className="text-black underline block">Forgot password?</Link> */}
                        <Link href="/signup" className="text-black underline block mt-1">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;