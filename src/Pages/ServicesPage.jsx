import { Fragment } from "react";
import Helmet from "../General/Helmet";
import CommonHero from "../Components/Common/CommonHero/CommonHero";
import Services from "../Components/HomePage/Services/Services";

export default function ServicesPage() {
  return (
    <Fragment>
      <Helmet title="Services | Orange Advertising">
        <section className="services-page">
          <CommonHero
            tone="0"
            textColor="primary"
            copy="From brand signage to installation-ready print systems, we deliver complete production services that scale with your campaign needs."
          />
          <Services />
        </section>
      </Helmet>
    </Fragment>
  );
}
