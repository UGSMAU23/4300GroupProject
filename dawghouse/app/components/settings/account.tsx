import email from "next-auth/providers/email";
import { SettingsProp } from "../settingsCard";
import Form from "next/form";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

function Account(props: SettingsProp) {
    const [username, setUsername] = useState(props.accountName);
    const [email, setEmail] = useState(props.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    async function onSubmit() {
        const idRequest = await fetch(`/api?email=${email}`, {
            method: "GET",
        })
        const idResponse = await idRequest.json();
        console.log("ID: ", idResponse.user._id);
        const id = idResponse.user._id;
        console.log(idResponse);

        const updateRequest = await fetch(`/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, email: email, currentPassword: currentPassword, newPassword: newPassword})
        });

        const updateResponse = await updateRequest.json();
        console.log("UPDATE USER: ", updateResponse);

        setCurrentPassword('');
        setNewPassword('');

        toast.success('Account Details Updated', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    return (
        <div className="md:mr-10 md:ml-20 md:mb-10 w-80 h-120 md:h-85 pt-10 flex flex-col items-center justify-center">
            <ToastContainer />
            <h1 className="mb-5 text-center ml-5 text-lg">Edit Account Details</h1>
            <Form action={''} onSubmit={onSubmit} className="flex flex-col ml-5">
                <label htmlFor="name" className=''>Name</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' value={`${props.accountName}`} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="email" className='mt-2'>Email</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='email' name='email' value={`${props.email}`} onChange={(e) => setEmail(e.target.value)}></input>
                <h1 className="mt-5 mb-5 text-center text-lg">Change Password: </h1>
                <label htmlFor="currentPassword" className='mt-2'>Current Password</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='currentPassword' name='currentPassword' type='password' onChange={(e) => setCurrentPassword(e.target.value)}></input>
                <label htmlFor="newPassword" className='mt-2'>New Password</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='newPassword' name='newPassword' type="password" onChange={(e) => setNewPassword(e.target.value)}></input>
                <input className="bg-red-800 hover:bg-red-900 cursor-pointer text-white mt-5 rounded-lg" id="submit" name="submit" value={"Update Account"} type="submit"></input>
            </Form>
        </div>
    )
}

export default Account;