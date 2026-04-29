import "./Clients.scss";

const clientNames = [
  "Emirates NBD",
  "Emaar",
  "Majid Al Futtaim",
  "Damac",
  "Dubai Holding",
  "Meraas",
  "Noon",
  "Talabat",
];

export default function Clients() {
  return (
    <section className="about-us-clients section-container" data-bg-tone="1">
      <p className="about-us-clients__label">Clients</p>
      <h3>Trusted by Brands Across UAE</h3>
      <div className="about-us-clients__grid">
        {clientNames.map((client) => (
          <div key={client}>{client}</div>
        ))}
      </div>
    </section>
  );
}
