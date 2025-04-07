import Image from "next/image";
import Navbar from '@/app/components/navbar';
import About from '@/app/components/about';
import Contact from "@/app/components/contact";

export default function Home() {
  return (
    <>
    <About />
    <Contact />
    </>
  );
}
