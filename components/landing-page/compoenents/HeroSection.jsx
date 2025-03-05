import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const HeroSection = () => {
  return (
    <HeroHighlight containerClassName="w-full p-6">
      {/* Hero Content */}
      <h1 className="text-4xl md:text-6xl font-bold text-foreground">
        Build a Stunning <span className="text-primary">CV</span> in Minutes
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mt-4">
        Create, customize, and download your professional CV effortlessly with
        our AI-powered CV Builder.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Button className="px-6 py-3 text-lg font-medium flex items-center gap-2">
          Get Started <ArrowRight className="w-5 h-5" />
        </Button>
        <Button variant="outline" className="px-6 py-3 text-lg font-medium">
          View Templates
        </Button>
      </div>

      {/* Feature Highlights */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-primary w-6 h-6" />
          <p className="text-muted-foreground">AI-Powered CV Generation</p>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="text-primary w-6 h-6" />
          <p className="text-muted-foreground">Customizable Templates</p>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="text-primary w-6 h-6" />
          <p className="text-muted-foreground">One-Click Download</p>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default HeroSection;
