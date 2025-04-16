"use client";

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const loadToast = toast.loading("Please Wait...", {position: 'top-center', progress: 0});
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Success:', data.message);
        toast.update(loadToast, {render: "Form Submission Sent!", type: "success", isLoading: false, autoClose: 3000, hideProgressBar: true, progress: null})
        form.reset(); // clear form
      } else {
        toast.update(loadToast, {render: "Error with form submission. Please try again", type: "error", isLoading: false, autoClose: 3000})
        console.log('Error:', data.error);
      }
    } catch (err) {
      console.log('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div className="flex justify-center items-center flex-col bg-white px-4 md:px-0" >
            <ToastContainer />
            <div className="flex text-3xl md:text-5xl mt-10">
                <h1 className="text-black">Contact Us</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className='bg-white border-solid border-gray-400 border-2 rounded-lg mt-10 mb-10'>
                    <form onSubmit={handleSubmit} className="flex flex-col m-10">
                        <label htmlFor="name" className='' >Name</label>
                        <input className='border-solid border-gray-400 border-1 rounded-lg px-2' id='name' name='name' required></input>
                        <label htmlFor="email" className='mt-3' >Email</label>
                        <input className='border-solid border-gray-400 border-1 rounded-lg px-2' id='email' name='email' type='email' required></input>
                        <label htmlFor="message" className='mt-3' >Message</label>
                        <textarea className='h-25 md:w-100 border-solid border-gray-400 border-1 rounded-lg px-1 pt-1' id='message' name='message' required></textarea>
                        <div className='bg-red-800 hover:bg-red-900 flex justify-center items-center mt-5 border-solid border-black border-1 cursor-pointer rounded-md'>
                            <input className='text-white cursor-pointer' type='submit' id='submit' value='Submit'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;