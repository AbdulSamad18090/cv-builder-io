import React from "react";
import HeroSection from "./compoenents/hero-section/HeroSection";
import { HeroParallax } from "../ui/hero-parallax";
import { Features } from "./compoenents/features-section/Features";
import Testimonials from "./compoenents/testimonials/Testimonials";
import HowItWorksSection from "./compoenents/how-it-works-section/how-it-works-section";
import DeveloperContact from "./compoenents/dev-contact/DeveloperContact";

const cvTemplates = [
  {
    title: "Modern Resume",
    link: "/templates/modern",
    thumbnail: "/images/template-1.webp", // CV
  },
  {
    title: "Creative Cover Letter",
    link: "/templates/creative",
    thumbnail: "/images/cover-letter-1.webp", // Cover Letter
  },
  {
    title: "Professional Resume",
    link: "/templates/professional",
    thumbnail: "/images/template-2.webp", // CV
  },
  {
    title: "Minimal Cover Letter",
    link: "/templates/minimal",
    thumbnail: "/images/cover-letter-2.webp", // Cover Letter
  },
  {
    title: "Executive Resume",
    link: "/templates/executive",
    thumbnail: "/images/template-3.webp", // CV
  },
  {
    title: "Infographic Cover Letter",
    link: "/templates/infographic",
    thumbnail: "/images/cover-letter-3.webp", // Cover Letter
  },
  {
    title: "ATS-Friendly Resume",
    link: "/templates/ats-friendly",
    thumbnail: "/images/template-4.webp", // CV
  },
  {
    title: "Classic Cover Letter",
    link: "/templates/classic",
    thumbnail: "/images/cover-letter-4.webp", // Cover Letter
  },
  {
    title: "One-Page Resume",
    link: "/templates/one-page",
    thumbnail: "/images/template-5.webp", // CV
  },
  {
    title: "Freelancer Cover Letter",
    link: "/templates/freelancer",
    thumbnail: "/images/cover-letter-5.webp", // Cover Letter
  },
];

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <HeroParallax templates={cvTemplates} />
      <Features />
      <HowItWorksSection />
      <Testimonials />
      <DeveloperContact/>
    </>
  );
};

export default LandingPage;
