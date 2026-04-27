import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../Common/Header/Header";
import "./HomeHero.scss";

import heroVideo from "../../../assets/Banners/Banner-Video.mp4";
import logo from "../../../assets/Logo/Logo-Secondary.png";

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
    const brandColor = `rgba(${brandR}, ${brandG}, ${brandB}, ${brandA})`;

    const closePhase = Math.min(Math.max((scrollProgress - 0.48) / 1, 0), 1);
    const normalizedClosePhase = Math.min(closePhase / 0.52, 1);
    const videoScale = 1 - 0.42 * normalizedClosePhase;
    const clipInset = 50 * normalizedClosePhase ** 1.45;
    const primaryBgOpacity = 0.12 + 0.88 * easeOut;
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
        opacity: footerImageOpacity,
      },
      headerShell: {
        backgroundColor: `rgba(254, 80, 1, ${headerBgPhase})`,
      },
      headerNav: {
        transform: `translateX(${headerNavShift * (1 - easedFooterMovePhase)}px)`,
      },
      cta: { opacity: ctaOpacity },
    };
  }, [pageScrollY, scrollProgress, viewport.height, viewport.width]);

  return (
    <>
      <Header
        className="home-hero__header-common"
        style={motionStyles.headerShell}
        navStyle={motionStyles.headerNav}
        hideFollow
        showAnimatedLogo
        logoImageSrc={logo}
        logoTextStyle={motionStyles.brandText}
        logoImageStyle={motionStyles.brandImage}
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
