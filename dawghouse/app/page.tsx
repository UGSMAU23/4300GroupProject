import Image from "next/image";
import Navbar from '@/app/components/navbar';
import About from '@/app/components/about';
import Contact from "@/app/components/contact";
import Login from "@/app/components/login";
import CreateAccount from "@/app/components/createAccount";
import Splash from "./components/splash";
import SplashPage from "./components/splashpage";
export default function Home() {
  return (
    <>
    <SplashPage/>
    </>
  );
}
