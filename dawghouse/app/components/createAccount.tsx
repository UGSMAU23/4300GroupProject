import Form from 'next/form';

const CreateAccount = () => {
    return (
        <div className="flex justify-center items-center flex-col mt-10 mb-10">
            <div className="flex text-5xl">
                <h1 className="text-black">Create Account</h1>
            </div>
            <div className="bg-red-200 mt-10 w-screen flex justify-center items-center">
            <div className="bg-white border-solid rounded-lg mt-10 mb-10 shadow-md w-[500px]">
                <Form action={ "/createAccount" } className="flex flex-col m-10">
                        <label htmlFor="email">Email</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1" id="email" name="email" type="email" placeholder="Email" required/>
                        <label htmlFor="password" className="mt-3">Password</label>
                        <input className="border border-gray-400 rounded-sm px-2 mt-1" id="password" name="password" type="password" placeholder="Password" required/>
                        <div className="bg-red-800 rounded-md flex justify-center items-center mt-5">
                            <input className="text-white" type="submit" value="Login"/>
                        </div>
                    </Form>
                    
                    <div className="text-sm text-left px-12 pb-10">
                        <a href="..." className="text-black underline block">Already have an account? Log in here.</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;