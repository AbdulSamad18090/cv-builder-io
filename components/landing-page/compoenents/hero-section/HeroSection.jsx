import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { WavyBackground } from "@/components/ui/wavy-background";
import GetStartedButtton from "@/components/get-started-button/GetStartedButtton";
import Link from "next/link";

const HeroSection = () => {
  return (
    <WavyBackground>
      <HeroHighlight className="flex flex-col items-start text-left max-w-6xl mx-auto md:mx-0">
        {/* Hero Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
          Build a Stunning <span className="text-primary">CV</span> in Minutes
        </h1>
        {/* <TrueFocus
          sentence="Build a Stunning CV in Minutes"
          manualMode={false}
          blurAmount={3}
          borderColor="#E11D48"
          animationDuration={0.7}
          pauseBetweenAnimations={1}
        /> */}
        <p className="text-lg md:text-xl  mt-4">
          Create, customize, and download your professional CV effortlessly with
          our AI-powered CV Builder.
        </p>
        {/* <TrueFocus
          sentence="Create, customize, and download your professional CV effortlessly with
          our AI-powered CV Builder"
          manualMode={false}
          blurAmount={2}
          borderColor="#E11D48"
          animationDuration={0.7}
          pauseBetweenAnimations={1}
        /> */}

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <GetStartedButtton />
          <Link href={"/templates"}>
            <Button variant="outline">View Templates</Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            "AI-Powered CV Generation",
            "Customizable Templates",
            "One-Click Download",
          ].map((text, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="text-primary w-6 h-6" />
              <p className="">{text}</p>
            </div>
          ))}
        </div>
      </HeroHighlight>
    </WavyBackground>
  );
};

export default HeroSection;
