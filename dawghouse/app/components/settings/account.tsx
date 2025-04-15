import email from "next-auth/providers/email";
import { SettingsProp } from "../settingsCard";
import Form from "next/form";

function Account(props: SettingsProp) {
    return (
        <div className="mr-10 ml-20 mb-10 w-80 h-85 pt-10 flex flex-col items-center justify-center">
            <h1 className="mb-5 text-center ml-5 text-lg">Edit Account Details</h1>
            <Form action={'api/updateProfile'} className="flex flex-col ml-5">
                <label htmlFor="name" className=''>Name</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' defaultValue={`${props.accountName}`}></input>
                <label htmlFor="email" className='mt-2'>Email</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' defaultValue={`${props.email}`}></input>
                <h1 className="mt-5 mb-5 text-center text-lg">Change Password: </h1>
                <label htmlFor="currentPassword" className='mt-2'>Current Password</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='currentPassword' name='currentPassword' type='password'></input>
                <label htmlFor="newPassword" className='mt-2'>New Password</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' type="password"></input>
                <input className="bg-red-600 text-white mt-5 rounded-lg" id="submit" name="submit" value={"Update Account"} type="submit"></input>
            </Form>
        </div>
    )
}

export default Account;