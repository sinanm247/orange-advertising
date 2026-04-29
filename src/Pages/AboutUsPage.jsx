import { Fragment } from "react";
import Helmet from "../General/Helmet";
import AboutUsHero from "../Components/AboutUsPage/AboutUsHero/AboutUsHero";
import AboutUsVisual from "../Components/AboutUsPage/AboutUsVisual/AboutUsVisual";
import Clients from "../Components/AboutUsPage/Clients/Clients";
import ContactUs from "../Components/Common/ContactUs/ContactUs";

export default function AboutUsPage() {
  return (
    <Fragment>
      <Helmet title="About Us | Orange Advertising">
        <section className="about-us-page">
          <AboutUsHero />
          <AboutUsVisual />
          <Clients />
          <ContactUs />
        </section>
      </Helmet>
    </Fragment>
  );
}
