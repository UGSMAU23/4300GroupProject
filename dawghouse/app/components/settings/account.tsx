import email from "next-auth/providers/email";
import { SettingsProp } from "../settingsCard";
import Form from "next/form";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { signOut } from "next-auth/react";

function Account(props: SettingsProp) {
    const [username, setUsername] = useState(props.accountName);
    const [email, setEmail] = useState(props.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    async function onSubmit() {

        const loadingToast = toast.loading("Updating account...", {
            position: "top-center",
        });
        
        // grab ID from email 
        const idRequest = await fetch(`/api?email=${email}`, {
            method: "GET",
        })
        const idResponse = await idRequest.json();
        console.log("ID: ", idResponse.user._id);
        const id = idResponse.user._id;
        console.log(idResponse);
        let body = null;

        if (currentPassword == '' || newPassword == '') {
            console.log("true");
            body = {username: username, email: email};
        } else {
            console.log("false");
            body = {username: username, email: email, currentPassword: currentPassword, newPassword: newPassword};
        }
        // use ID to update user data
        const updateRequest = await fetch(`/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        const updateResponse = await updateRequest.json();
        console.log("UPDATE USER: ", updateResponse);

        setCurrentPassword('');
        setNewPassword('');

        toast.update(loadingToast, {
            render: "Account Details Updated.",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });
        toast('Please sign in again.', {type: "warning", autoClose: 3000, position: 'top-center'});
        await new Promise(r => setTimeout(r, 3000));
        await signOut();
    }

    return (
        <div className="md:mr-10 md:ml-20 md:mb-10 w-80 h-120 md:h-85 pt-10 flex flex-col items-center justify-center">
            <ToastContainer />
            <h1 className="text-center ml-5 text-lg">Edit Account Details</h1>
            <Form action={''} onSubmit={onSubmit} className="flex flex-col ml-5">
                <label htmlFor="name" className=''>Name</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' defaultValue={`${props.accountName}`} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="email" className='mt-2'>Email</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2 mb-2' id='email' name='email' defaultValue={`${props.email}`} onChange={(e) => setEmail(e.target.value)}></input>
                <h1 className="text-center text-lg">Change Password: </h1>
                <label htmlFor="currentPassword" className='mt-2'>Current Password</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='currentPassword' name='currentPassword' type='password' onChange={(e) => setCurrentPassword(e.target.value)}></input>
                <label htmlFor="newPassword" className='mt-2'>New Password</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='newPassword' name='newPassword' type="password" onChange={(e) => setNewPassword(e.target.value)}></input>
                <input className="bg-red-800 hover:bg-red-900 cursor-pointer text-white mt-5 rounded-lg" id="submit" name="submit" value={"Update Account"} type="submit"></input>
            </Form>
            <button className="bg-red-800 hover:bg-red-900 cursor-pointer text-white mt-5 px-4 rounded-lg"
                onClick={async () => {
                    const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
                    if (!confirmed) return;

                    try {
                        const idRequest = await fetch(`/api?email=${email}`, {
                            method: "GET",
                        })
                        const idResponse = await idRequest.json();
                        const id = idResponse.user._id;
                        const res = await fetch(`/api/user/${id}`, {
                            method: "DELETE",
                        });

                        const deleteRes = await res.json();
                        if (res.ok) {
                            toast.success("Account deleted successfully. Redirecting.", { position: "top-center" });
                            await new Promise(r => setTimeout(r, 1000));
                            await signOut();
                        } else {
                            toast.error(deleteRes.message || "Failed to delete account", { position: "top-center" });
                        }
                    } catch (error) {
                        console.error("Delete error:", error);
                        toast.error("Something went wrong. Try again.", { position: "top-center" });
                    }
                }}
            >
                Delete Account
            </button>
        </div>
    )
}

export default Account;