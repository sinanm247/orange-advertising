import "./CommonHero.scss";

export default function CommonHero({
  copy = "Large format printing works produced in-house for brands across the UAE - from flex banners and 3D hoardings to rooftop installs, vehicle branding, and full façade wraps.",
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
