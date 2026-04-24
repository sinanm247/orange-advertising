import { Fragment } from "react";
import Helmet from "../General/Helmet";
import HomeHero from "../Components/HomePage/HomeHero/HomeHero";
import About from "../Components/HomePage/About/About";
import Works from "../Components/HomePage/Works/Works";
import Services from "../Components/HomePage/Services/Services";
import ContactUs from "../Components/Common/ContactUs/ContactUs";
import Footer from "../Components/Common/Footer/Footer";

export default function HomePage() {
  return (
    <Fragment>
      <Helmet title="Home | Orange Advertising">
        <HomeHero />
        <About />
        <Works />
        <Services />
        <ContactUs />
        <Footer />
      </Helmet>
    </Fragment>
  );
}