import "./Clients.scss";

import abuDhabiAirport from "../../../assets/Clients/Abu-Dhabi-International-Airport-Logo.png";
import adib from "../../../assets/Clients/ADIB-Logo.png";
import chevrolet from "../../../assets/Clients/Chevrolet-Logo.png";
import cocacola from "../../../assets/Clients/Cocacola-Logo.png";
import du from "../../../assets/Clients/DU-Logo.png";
import dubaiChambers from "../../../assets/Clients/Dubai-Chambers-Logo.png";
import emaar from "../../../assets/Clients/Emaar-Logo.png";
import etisalat from "../../../assets/Clients/Etisalat-Logo.png";
import jumeirah from "../../../assets/Clients/Jumeirah-Group-Logo.png";
import lenova from "../../../assets/Clients/Lenova-Logo.png";
import lg from "../../../assets/Clients/LG-Logo.png";
import lorealParis from "../../../assets/Clients/Loreoal-Paris-Logo.png";
import nakheel from "../../../assets/Clients/Nakheel-Logo.png";
import nestle from "../../../assets/Clients/Nestle-Logo.png";
import pegasus from "../../../assets/Clients/Pegasus-Airlines-Logo.png";
import saharaCentre from "../../../assets/Clients/Sahara-Centre-Logo.png";
import samsung from "../../../assets/Clients/Samsung-Logo.png";
import starbucks from "../../../assets/Clients/Starbucks-Coffee-Logo.png";
import timberland from "../../../assets/Clients/Timberland-Logo.png";
import wojooh from "../../../assets/Clients/Wojooh-Logo.png";

const clientLogos = [
  { src: abuDhabiAirport, alt: "Abu Dhabi International Airport" },
  { src: adib, alt: "ADIB" },
  { src: chevrolet, alt: "Chevrolet" },
  { src: cocacola, alt: "Coca-Cola" },
  { src: du, alt: "du" },
  { src: dubaiChambers, alt: "Dubai Chambers" },
  { src: emaar, alt: "Emaar" },
  { src: etisalat, alt: "Etisalat" },
  { src: jumeirah, alt: "Jumeirah Group" },
  { src: lenova, alt: "Lenovo" },
  // { src: lg, alt: "LG" },
  { src: lorealParis, alt: "L'Oréal Paris" },
  { src: nakheel, alt: "Nakheel" },
  { src: nestle, alt: "Nestlé" },
  { src: pegasus, alt: "Pegasus Airlines" },
  { src: saharaCentre, alt: "Sahara Centre" },
  { src: samsung, alt: "Samsung" },
  // { src: starbucks, alt: "Starbucks" },
  { src: timberland, alt: "Timberland" },
  { src: wojooh, alt: "Wojooh" },
];

const clientLogosRowOne = clientLogos.slice(0, 10);
const clientLogosRowTwo = clientLogos.slice(10);

function ClientLogoSlide({ logos, duplicate = false }) {
  return (
    <div className="about-us-clients__slider-track" aria-hidden={duplicate || undefined}>
      {logos.map((client) => (
        <div className="about-us-clients__logo" key={`${client.alt}${duplicate ? "-dup" : ""}`}>
          <img src={client.src} alt={duplicate ? "" : client.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function ClientMarquee({ logos, direction }) {
  return (
    <div
      className={`about-us-clients__slider about-us-clients__slider--${direction}`}
      aria-label="Client logos"
    >
      <ClientLogoSlide logos={logos} />
      <ClientLogoSlide logos={logos} duplicate />
    </div>
  );
}

export default function Clients() {
  return (
    <section className="about-us-clients" data-bg-tone="1" data-bg-offset="0.45" data-bg-delay-blend="0.4">
      <div className="about-us-clients__header section-container">
        <p className="about-us-clients__label">Clients</p>
        <h3>Trusted by Brands Across UAE</h3>
      </div>
      <div className="about-us-clients__sliders">
        <ClientMarquee logos={clientLogosRowOne} direction="left" />
        <ClientMarquee logos={clientLogosRowTwo} direction="right" />
      </div>
    </section>
  );
}
