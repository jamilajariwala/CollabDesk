import React from "react";
import Navbar from "../components/landingpage/Navbar.jsx";
import Hero from "../components/landingpage/Hero.jsx";
import Feature from "../components/landingpage/Feature.jsx";
import HowItWorks from "../components/landingpage/HowItWorks.jsx";
import Pricing from "../components/landingpage/Pricing.jsx";
import Cta from "../components/landingpage/Cta.jsx";
import Footer from "../components/landingpage/Footer.jsx";

const Home=()=>{
    return(
        <div>
            <Navbar/>
            <section>
                <Hero/>
            </section>
            <section id='feature_section'>
                <Feature/>
            </section>
            <section id='howitworks_section'>
                <HowItWorks/>
            </section>
            <section id="pricing_section">
                <Pricing/>
            </section>
            <section>
                <Cta/>
            </section>
            <section>
                <Footer/>
            </section>
        </div>
    )
}

export default Home