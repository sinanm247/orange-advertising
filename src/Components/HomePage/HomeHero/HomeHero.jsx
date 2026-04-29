import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../Common/Header/Header";
import "./HomeHero.scss";

import heroVideo from "../../../assets/Banners/Banner-Video.mp4";
import logoSecondary from "../../../assets/Logo/Logo-Secondary.png";
import logoPrimary from "../../../assets/Logo/Logo-Primary.png";

export default function HomeHero() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageScrollY, setPageScrollY] = useState(window.scrollY);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) {
        return;
      }

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const maxScrollDistance = Math.max(sectionHeight - window.innerHeight, 1);
      const currentScroll = window.scrollY - sectionTop;
      const nextProgress = Math.min(Math.max(currentScroll / maxScrollDistance, 0), 1);

      setScrollProgress(nextProgress);
      setPageScrollY(window.scrollY);
    };

    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      updateProgress();
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const motionStyles = useMemo(() => {
    const mixChannel = (from, to, phase) => Math.round(from + (to - from) * phase);
    const mixRgb = (from, to, phase) => ({
      r: mixChannel(from.r, to.r, phase),
      g: mixChannel(from.g, to.g, phase),
      b: mixChannel(from.b, to.b, phase),
    });

    const easeOut = 1 - (1 - scrollProgress) ** 3;
    const latePhase = Math.min(Math.max((scrollProgress - 0.55) / 0.45, 0), 1);
    const colorPhase = Math.min(Math.max((scrollProgress - 0.48) / 0.24, 0), 1);
    const logoSwapPhase = Math.min(Math.max((latePhase - 0.75) / 0.25, 0), 1);

    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2;
    const targetX = viewport.width > 1024 ? 145 : 95;
    const targetY = viewport.width > 1024 ? 48 : 40;
    const brandShiftX = (targetX - centerX) * latePhase;
    const brandShiftY = (targetY - centerY) * latePhase;
    const brandScale = 1 - 0.84 * latePhase;
    const brandR = Math.round(254 + (255 - 254) * colorPhase);
    const brandG = Math.round(80 + (249 - 80) * colorPhase);
    const brandB = Math.round(1 + (235 - 1) * colorPhase);
    const brandA = 0.7 + (1 - 0.7) * colorPhase;
    const aboutTransitionPhase = Math.min(Math.max((scrollProgress - 0.78) / 0.22, 0), 1);
    const brandToPrimaryR = Math.round(brandR + (254 - brandR) * aboutTransitionPhase);
    const brandToPrimaryG = Math.round(brandG + (80 - brandG) * aboutTransitionPhase);
    const brandToPrimaryB = Math.round(brandB + (1 - brandB) * aboutTransitionPhase);
    const brandColor = `rgba(${brandToPrimaryR}, ${brandToPrimaryG}, ${brandToPrimaryB}, ${brandA})`;

    const closePhase = Math.min(Math.max((scrollProgress - 0.48) / 1, 0), 1);
    const normalizedClosePhase = Math.min(closePhase / 0.52, 1);
    const videoScale = 1 - 0.42 * normalizedClosePhase;
    const clipInset = 52 * normalizedClosePhase ** 1.45;
    const primaryBgOpacity = aboutTransitionPhase;
    const navWidthEstimate = viewport.width > 1024 ? 620 : 360;
    const horizontalPadding = viewport.width > 1024 ? 40 : 24;
    const maxSafeShift = Math.max(
      viewport.width / 2 - horizontalPadding - navWidthEstimate / 2,
      0
    );
    const headerNavShift = Math.min(-brandShiftX, maxSafeShift);
    const headerBgPhase = Math.min(Math.max((scrollProgress - 0.8) / 0.2, 0), 1);
    const ctaOpacity = 1 - Math.min(scrollProgress * 2.5, 1);
    const footerNode = document.querySelector(".site-footer");
    const footerRect = footerNode?.getBoundingClientRect();
    const footerStart = viewport.height * 0.52;
    const footerEnd = viewport.height * 0.08;
    const footerPhase = footerRect
      ? Math.min(Math.max((footerStart - footerRect.top) / (footerStart - footerEnd), 0), 1)
      : 0;
    const footerFlipPhase = Math.min(Math.max((footerPhase - 0.02) / 0.34, 0), 1);
    const footerMovePhase = Math.min(Math.max((footerPhase - 0.38) / 0.62, 0), 1);
    const easedFooterMovePhase = 1 - (1 - footerMovePhase) ** 3;
    const easedFooterFlipPhase = 1 - (1 - footerFlipPhase) ** 3;
    const footerTargetX = viewport.width / 2;
    const footerTargetY = viewport.width > 1024 ? 300 : 180;
    const footerShiftX = (footerTargetX - targetX) * easedFooterMovePhase;
    const footerShiftY = (footerTargetY - targetY) * easedFooterMovePhase;
    const finalShiftX = brandShiftX + footerShiftX;
    const finalShiftY = brandShiftY + footerShiftY;
    const finalBrandScale = brandScale * (1 + 5.25 * easedFooterMovePhase);
    const textLogoTransform = `translate(-50%, -50%) translate(${finalShiftX}px, ${finalShiftY}px) scale(${finalBrandScale})`;
    const imageScaleBoost = 1 + 2.6 * logoSwapPhase;
    const finalImageScaleBoost = imageScaleBoost * (1 - 0.38 * easedFooterMovePhase);
    const imageLogoTransform = `translate(-50%, -50%) translate(${finalShiftX}px, ${finalShiftY}px) scale(${finalBrandScale * finalImageScaleBoost})`;
    const baseTextOpacity = 1 - logoSwapPhase;
    const baseImageOpacity = logoSwapPhase;
    const baseTextRotate = 90 * logoSwapPhase;
    const baseImageRotate = -90 + 90 * logoSwapPhase;
    const footerTextOpacity = baseTextOpacity + (1 - baseTextOpacity) * easedFooterFlipPhase;
    let footerImageOpacity = baseImageOpacity * (1 - easedFooterFlipPhase);
    if (footerFlipPhase > 0.82) {
      footerImageOpacity = 0;
    }
    const footerTextRotate = baseTextRotate * (1 - easedFooterFlipPhase);
    const footerImageRotate = baseImageRotate + (-90 - baseImageRotate) * easedFooterFlipPhase;
    const worksSection = document.getElementById("works");
    const servicesSection = document.getElementById("services");
    const contactSection = document.getElementById("contact");
    const footerSection = document.getElementById("footer");
    const worksRect = worksSection?.getBoundingClientRect();
    const servicesRect = servicesSection?.getBoundingClientRect();
    const contactRect = contactSection?.getBoundingClientRect();
    const footerSectionRect = footerSection?.getBoundingClientRect();
    const worksStart = viewport.height * 0.9;
    const worksEnd = viewport.height * 0.2;
    const worksBgPhase = worksRect
      ? Math.min(Math.max((worksStart - worksRect.top) / (worksStart - worksEnd), 0), 1)
      : 0;
    const servicesBgPhase = servicesRect
      ? Math.min(Math.max((worksStart - servicesRect.top) / (worksStart - worksEnd), 0), 1)
      : 0;
    const contactBgPhase = contactRect
      ? Math.min(Math.max((worksStart - contactRect.top) / (worksStart - worksEnd), 0), 1)
      : 0;
    const footerBgPhase = footerSectionRect
      ? Math.min(Math.max((worksStart - footerSectionRect.top) / (worksStart - worksEnd), 0), 1)
      : 0;
    const primaryWeightAfterHero = 1 - aboutTransitionPhase;
    const primaryWeightFromSections =
      worksBgPhase * (1 - servicesBgPhase) + contactBgPhase * (1 - footerBgPhase);
    const primaryWeight = Math.min(
      Math.max(
        primaryWeightAfterHero + (1 - primaryWeightAfterHero) * primaryWeightFromSections,
        0
      ),
      1
    );
    const bgRgb = mixRgb({ r: 255, g: 249, b: 235 }, { r: 254, g: 80, b: 1 }, primaryWeight);
    const fgRgb = mixRgb({ r: 254, g: 80, b: 1 }, { r: 255, g: 249, b: 235 }, primaryWeight);
    const secondaryLogoOpacity = footerImageOpacity * primaryWeight;
    const primaryLogoOpacity = footerImageOpacity * (1 - primaryWeight);

    return {
      videoShell: {
        transform: `scale(${videoScale})`,
        clipPath: `inset(${clipInset}% 0 ${clipInset}% 0 round 0px)`,
      },
      primaryBg: { opacity: primaryBgOpacity },
      brandText: {
        transform: `${textLogoTransform} rotateY(${footerTextRotate}deg)`,
        color: brandColor,
        opacity: footerTextOpacity,
      },
      brandImage: {
        transform: `${imageLogoTransform} rotateY(${footerImageRotate}deg)`,
        opacity: secondaryLogoOpacity,
      },
      brandImageAlt: {
        transform: `${imageLogoTransform} rotateY(${footerImageRotate}deg)`,
        opacity: primaryLogoOpacity,
      },
      headerShell: {
        backgroundColor: `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, ${headerBgPhase})`,
        color: `rgba(${fgRgb.r}, ${fgRgb.g}, ${fgRgb.b}, 0.92)`,
      },
      headerNav: {
        transform: `translateX(${headerNavShift * (1 - easedFooterMovePhase)}px)`,
        marginRight: `${80 * (1 - footerMovePhase)}px`,
      },
      cta: { opacity: ctaOpacity },
    };
  }, [pageScrollY, scrollProgress, viewport.height, viewport.width]);

  return (
    <>
      <Header
        className="site-header--shared site-header--home-start"
        style={motionStyles.headerShell}
        navStyle={motionStyles.headerNav}
        hideFollow
        showAnimatedLogo
        logoImageSrc={logoSecondary}
        logoAltImageSrc={logoPrimary}
        logoTextStyle={motionStyles.brandText}
        logoImageStyle={motionStyles.brandImage}
        logoAltImageStyle={motionStyles.brandImageAlt}
      />

      <section className="home-hero" ref={sectionRef}>
        <div className="home-hero__sticky">
          <div className="home-hero__primary-bg" style={motionStyles.primaryBg} />

          <div className="home-hero__video-shell" style={motionStyles.videoShell}>
            <video className="home-hero__video" autoPlay muted loop playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>

            <div className="home-hero__video-overlay" />
            <div className="home-hero__grain" />
            <div className="home-hero__art" />
          </div>

          <div className="home-hero__content" />

          <a href="#" className="home-hero__cta" style={motionStyles.cta}>
            Start a Project
          </a>
        </div>
      </section>
    </>
  );
}
