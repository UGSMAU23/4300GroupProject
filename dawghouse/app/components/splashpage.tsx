import Splash from "@/app/components/splash"
import About from '@/app/components/about'
import Contact from '@/app/components/contact'

const SplashPage = () => {
    return (
        <>
        <section id="splash">
            <Splash />
        </section>
        <section id="about">
            <About />
        </section>
        <section id="contact">
            <Contact />
        </section>
        </>
    );
};

export default SplashPage;