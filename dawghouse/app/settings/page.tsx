'use client';
import { Poppins } from "next/font/google";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import SettingsCard from "@/app/components/settingsCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const poppins = Poppins({
    weight: '300',
    subsets: ['latin']
});

const SettingsPage = () => {
    const {data: session, status, update} = useSession();
    const router = useRouter();

    // Redirect to login page if not logged in
    useEffect(() => {
        if (!session) {
            router.replace('/login');
        }
    }, [session, router]);

    if (status == "loading") {
        return null;
    }

    return (
    <SettingsCard email={session?.user?.email ?? "null@null.com"} accountName={session?.user?.name ?? "Null User"}/>
    );
};


export default SettingsPage;