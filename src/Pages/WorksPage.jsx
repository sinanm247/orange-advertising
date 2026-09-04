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
          <CommonHero copy="Large format printing works produced in-house for brands across the UAE — from flex banners and 3D hoardings to rooftop installs, vehicle branding, and full façade wraps." />
          <WorksShowcase />
          {/* <ContactUs /> */}
        </section>
      </Helmet>
    </Fragment>
  );
}
