import Form from 'next/form'


const Contact = () => {
    return (
        <div className="flex justify-center items-center flex-col bg-white" >
            <div className="flex text-5xl mt-10">
                <h1 className="text-black">Contact Us</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className='bg-white border-solid border-gray-400 border-2 rounded-lg mt-10 mb-10'>
                    <Form action={"/contact"} className='flex flex-col m-10'>
                        <label htmlFor="name" className='' >Name</label>
                        <input className='border-solid border-gray-400 border-1 rounded-lg px-2' id='name' name='name' required></input>
                        <label htmlFor="email" className='mt-3' >Email</label>
                        <input className='border-solid border-gray-400 border-1 rounded-lg px-2' id='email' name='email' type='email' required></input>
                        <label htmlFor="message" className='mt-3' >Message</label>
                        <textarea className='h-25 w-100 border-solid border-gray-400 border-1 rounded-lg px-1 pt-1' id='message' name='message' required></textarea>
                        <div className='bg-red-800 flex justify-center items-center mt-5 border-solid border-black border-1 cursor-pointer rounded-md'>
                            <input className='text-white' type='submit' id='submit' value='Submit'></input>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Contact;