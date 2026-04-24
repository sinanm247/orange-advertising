import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import "./HomeHero.scss";

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__grain" />
      <div className="home-hero__art" />

      <Header />

      <div className="home-hero__content">
        <h1 className="home-hero__brand">Orange</h1>
      </div>

      <Footer />
    </section>
  );
}
