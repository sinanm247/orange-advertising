import { Fragment, useEffect, useMemo, useState } from "react";
import Helmet from "../General/Helmet";
import HomeHero from "../Components/HomePage/HomeHero/HomeHero";
import About from "../Components/HomePage/About/About";
import Works from "../Components/HomePage/Works/Works";
import Services from "../Components/HomePage/Services/Services";
import ContactUs from "../Components/Common/ContactUs/ContactUs";
import Footer from "../Components/Common/Footer/Footer";

export default function HomePage() {
  const [worksBgPhase, setWorksBgPhase] = useState(0);
  const [servicesBgPhase, setServicesBgPhase] = useState(0);
  const [contactBgPhase, setContactBgPhase] = useState(0);
  const [footerBgPhase, setFooterBgPhase] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateBgPhase = () => {
      const worksSection = document.getElementById("works");
      const servicesSection = document.getElementById("services");
      const contactSection = document.getElementById("contact");
      const footerSection = document.getElementById("footer");
      if (!worksSection || !servicesSection || !contactSection || !footerSection) {
        return;
      }

      const rect = worksSection.getBoundingClientRect();
      const servicesRect = servicesSection.getBoundingClientRect();
      const contactRect = contactSection.getBoundingClientRect();
      const footerRect = footerSection.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.2;
      const worksPhase = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      const servicesPhase = Math.min(
        Math.max((start - servicesRect.top) / (start - end), 0),
        1
      );
      const contactPhase = Math.min(Math.max((start - contactRect.top) / (start - end), 0), 1);
      const footerPhase = Math.min(Math.max((start - footerRect.top) / (start - end), 0), 1);
      setWorksBgPhase(worksPhase);
      setServicesBgPhase(servicesPhase);
      setContactBgPhase(contactPhase);
      setFooterBgPhase(footerPhase);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateBgPhase();
      });
    };

    updateBgPhase();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const pageBg = useMemo(() => {
    const primaryWeight =
      worksBgPhase * (1 - servicesBgPhase) + contactBgPhase * (1 - footerBgPhase);
    const clampedPrimaryWeight = Math.min(Math.max(primaryWeight, 0), 1);
    const r = Math.round(255 + (254 - 255) * clampedPrimaryWeight);
    const g = Math.round(249 + (80 - 249) * clampedPrimaryWeight);
    const b = Math.round(235 + (1 - 235) * clampedPrimaryWeight);
    return `rgb(${r}, ${g}, ${b})`;
  }, [contactBgPhase, footerBgPhase, servicesBgPhase, worksBgPhase]);

  return (
    <Fragment>
      <Helmet title="Home | Orange Advertising">
        <div className="home-page-shell" style={{ backgroundColor: pageBg }}>
          <HomeHero />
          <About />
          <Works />
          <Services />
          <ContactUs />
          <Footer />
        </div>
      </Helmet>
    </Fragment>
  );
}