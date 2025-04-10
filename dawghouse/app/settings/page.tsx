
import { Poppins } from "next/font/google";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import SettingsCard from "@/app/components/settingsCard";

const poppins = Poppins({
    weight: '300',
    subsets: ['latin']
});

const SettingsPage = () => {
    return (
    <SettingsCard email="acdurr@icloud.com" accountName="Johnathan Doe"/>
    );
};


export default SettingsPage;