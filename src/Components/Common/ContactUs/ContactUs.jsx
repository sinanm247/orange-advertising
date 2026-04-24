import "./ContactUs.scss";

export default function ContactUs() {
  return (
    <section className="contact-us-section" id="contact">
      <div className="contact-us-section__inner">
        <div className="contact-us-section__left">
          <h2>
            Got a
            <br />
            partnership
            <br />
            in mind?
            <br />
            Let&apos;s bond.
          </h2>
        </div>

        <form className="contact-us-section__form">
          <div className="contact-us-section__row">
            <label className="contact-us-section__field">
              <span>(Name)</span>
              <input type="text" placeholder="First Name" />
            </label>
            <label className="contact-us-section__field">
              <span>(Email)</span>
              <input type="email" placeholder="Email Address" />
            </label>
          </div>

          <label className="contact-us-section__field contact-us-section__field--full">
            <span>(Message)</span>
            <textarea placeholder="A little something about your project..." />
          </label>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}
