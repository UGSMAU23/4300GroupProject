import Form from "next/form";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";


const poppins = Poppins({
    weight: '300',
    subsets: ['latin']
});

export async function sha256(str: string) {
    // Convert string to array buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    
    // Generate SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
};

interface AppearanceProp {
    email: string;
    accountName: string;
}

function Appearance(props: AppearanceProp) {

    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            setEmail(await sha256(props.email));
        }

        fetchImage();
    })

    return (
        <div className="mr-10 ml-20 mt-10 w-80 h-85 flex flex-col justify-center align-center">
            <Image src={`https://gravatar.com/avatar/${email}`} width='100' height='150' alt="Profile picture" className="rounded-full mb-5 ml-20"></Image>
            <Form action={'api/updateProfile'} className="flex flex-col ml-5">
                <label htmlFor="name" className=''>Name</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' defaultValue={`${props.accountName}`} disabled></input>
                <label htmlFor="name" className='mt-2'>Email</label>
                <input className='border-solid border-gray-400 border-1 rounded-lg px-2 w-60 mt-2' id='name' name='name' defaultValue={`${props.email}`} disabled></input>
            </Form>
        </div>
    );
}

export default Appearance;