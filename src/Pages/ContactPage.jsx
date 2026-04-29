import { Fragment } from "react";
import Helmet from "../General/Helmet";
import CommonHero from "../Components/Common/CommonHero/CommonHero";
import ContactUs from "../Components/Common/ContactUs/ContactUs";

export default function ContactPage() {
  return (
    <Fragment>
      <Helmet title="Contact | Orange Advertising">
        <section className="contact-page">
          <CommonHero copy="If you have a project in mind, our team is ready to help with strategy, production, and execution from start to finish." />
          <ContactUs />
        </section>
      </Helmet>
    </Fragment>
  );
}
