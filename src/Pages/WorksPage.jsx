import { Fragment } from "react";
import Helmet from "../General/Helmet";
import CommonHero from "../Components/Common/CommonHero/CommonHero";
import WorksShowcase from "../Components/WorksPage/WorksShowcase/WorksShowcase";
import ContactUs from "../Components/Common/ContactUs/ContactUs";

export default function WorksPage() {
  return (
    <Fragment>
      <Helmet title="Works | Orange Advertising">
        <section className="works-page">
          <CommonHero />
          <WorksShowcase />
          {/* <ContactUs /> */}
        </section>
      </Helmet>
    </Fragment>
  );
}
