import HomePage from "../Pages/HomePage";
import AboutUsPage from "../Pages/AboutUsPage";
import WorksPage from "../Pages/WorksPage";
import ServicesPage from "../Pages/ServicesPage";
import ContactPage from "../Pages/ContactPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    isProtected: false,
  },
  {
    path: "/about-us",
    element: <AboutUsPage />,
    isProtected: false,
  },
  {
    path: "/works",
    element: <WorksPage />,
    isProtected: false,
  },
  {
    path: "/services",
    element: <ServicesPage />,
    isProtected: false,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    isProtected: false,
  },
];

export default routes;