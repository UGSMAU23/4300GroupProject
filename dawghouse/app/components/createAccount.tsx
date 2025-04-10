import Form from 'next/form';
import Link from 'next/link';
import { League_Spartan } from 'next/font/google';

const league = League_Spartan({
    weight: '400',
    subsets: ['latin']
});


const CreateAccount = () => {
    return (
        <div className="flex justify-start items-center flex-col bg-pink-50 h-screen">
            <div className="flex text-5xl mt-30">
                <h1 className={`text-black ${league.className}`}>Create Account</h1>
            </div>
            <div className="w-screen flex justify-center items-center">
            <div className="bg-white border-solid rounded-lg mt-10 mb-10 shadow-lg/50 w-[500px]">
                <Form action={ "/createAccount" } className="flex flex-col m-10">
                        <label htmlFor="email">Email</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="email" name="email" type="email" placeholder="Email" required/>
                        <label htmlFor="password" className="mt-3">Password</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1 shadow-md" id="password" name="password" type="password" placeholder="Password" required/>
                        <div className="bg-red-800 rounded-md flex justify-center items-center mt-5 shadow-md">
                            <input className="text-white" type="submit" value="Login"/>
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