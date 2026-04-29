import "./CommonHero.scss";

export default function CommonHero({
  copy = "Thank you for your patience as we add projects to our showcase. Meanwhile, if you would like to see works from specific industries, please reach out for additional samples.",
  tone = "1",
  textColor = "secondary",
}) {
  const textClassName =
    textColor === "primary" ? "common-hero__copy common-hero__copy--primary" : "common-hero__copy";

  return (
    <section className="common-hero" data-bg-tone={tone}>
      <p className={textClassName}>{copy}</p>
    </section>
  );
}
