"use client";

import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MousePointerClick,
  Bot,
  CheckCircle,
  FileType,
  Paintbrush,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function Features() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: <MousePointerClick className="h-10 w-10" />,
      title: "Drag & Drop Editor",
      description:
        "Easily customize your CV layout with our intuitive drag and drop interface. No design skills required.",
      emoji: "🖱️",
    },
    {
      icon: <Bot className="h-10 w-10" />,
      title: "AI Content Suggestions",
      description:
        "Get smart recommendations for skills, achievements, and job descriptions based on your experience.",
      emoji: "🤖",
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "ATS-Friendly Templates",
      description:
        "Our templates are designed to pass through Applicant Tracking Systems with ease, increasing your chances of landing interviews.",
      emoji: "✅",
    },
    {
      icon: <FileType className="h-10 w-10" />,
      title: "Multiple Export Formats",
      description:
        "Download your CV in various formats including PDF, DOCX, and more to suit any application requirement.",
      emoji: "📄",
    },
    {
      icon: <Paintbrush className="h-10 w-10" />,
      title: "Customizable Designs",
      description:
        "Choose from a variety of professional designs and customize colors, fonts, and layouts to match your personal brand.",
      emoji: "🎨",
    },
  ];

  return (
    <section className="flex justify-center py-12 bg-background my-6">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Powerful Features for Your Professional Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our CV builder comes packed with everything you need to create
            standout resumes that get noticed by recruiters and pass through ATS
            systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative flex flex-col p-6 bg-background border shadow-sm transition-all duration-300",
                hoveredFeature === index
                  ? "shadow-lg scale-105 border-primary/50"
                  : "hover:shadow-md",
                // Fixing grid spans properly
                [1, 2].includes(index) ? "col-span-1 md:col-span-2" : "col-span-1",
                index === 4 ? "lg:col-span-3" : "",
              )}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="absolute -top-3 -right-3 bg-foreground text-primary-foreground w-10 h-10 flex items-center justify-center text-xl">
                {feature.emoji}
              </div>
              <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button>Start Building Your CV</Button>
        </div>
      </div>
    </section>
  );
}
