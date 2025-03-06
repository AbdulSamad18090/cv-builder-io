"use client";

import { Layout, FileText, Edit, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Layout className="h-10 w-10" />,
      title: "Choose a template",
      description:
        "Browse through our collection of professional templates designed for various industries and career levels.",
    },
    {
      icon: <Edit className="h-10 w-10" />,
      title: "Fill in your details",
      description:
        "Enter your personal information, work experience, education, and skills in our user-friendly form.",
    },
    {
      icon: <Download className="h-10 w-10" />,
      title: "Customize & download",
      description:
        "Adjust colors, fonts, and layout to match your style, then download your polished CV in PDF format.",
    },
  ];

  return (
    <section className="w-full py-10 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter sm:text-4xl">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Create your professional CV in three simple steps
            </p>
          </div>
        </div>

        {/* Steps with connecting lines */}
        <div className="relative mx-auto max-w-5xl mt-12">
          {/* Desktop connecting lines (hidden on mobile) */}
          {/* <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0"></div> */}

          {/* Curved connecting lines */}
          <div className="hidden md:block">
            {/* Line from step 1 to 2 */}
            <svg
              className="absolute top-1/2 left-[calc(16.67%-8px)] w-[calc(33.33%+16px)] h-12 -translate-y-1/2 z-0"
              viewBox="0 0 200 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,25 C40,5 160,45 200,25"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Line from step 2 to 3 */}
            <svg
              className="absolute top-1/2 left-[calc(50%-8px)] w-[calc(33.33%+16px)] h-12 -translate-y-1/2 z-0"
              viewBox="0 0 200 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,25 C40,45 160,5 200,25"
                stroke="url(#gradient2)"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient id="gradient2" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile connecting lines (hidden on desktop) */}
          <div className="md:hidden absolute left-[28px] top-[84px] w-0.5 h-[calc(100%-168px)] bg-slate-200 z-0"></div>

          {/* Curved mobile connecting lines */}
          <div className="md:hidden">
            {/* Line from step 1 to 2 */}
            <svg
              className="absolute left-[28px] top-[84px] w-12 h-[calc(50%-84px)]"
              viewBox="0 0 50 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25,0 C5,40 45,160 25,200"
                stroke="url(#gradientMobile1)"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient
                  id="gradientMobile1"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Line from step 2 to 3 */}
            <svg
              className="absolute left-[28px] top-[calc(50%+84px)] w-12 h-[calc(50%-84px)]"
              viewBox="0 0 50 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25,0 C45,40 5,160 25,200"
                stroke="url(#gradientMobile2)"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient
                  id="gradientMobile2"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center space-y-4 border border-primary bg-card p-6 shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div className="absolute -top-7 -left-3 flex h-10 w-10 items-center justify-center bg-primary text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-center text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <motion.div
            className="relative w-full max-w-3xl h-64 rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100 dark:from-rose-500 to-indigo-100 dark:to-indigo-500 flex items-center justify-center">
              <div className="flex space-x-8 items-center">
                <div className="w-32 h-44 bg-card rounded shadow-md flex flex-col">
                  <div className="h-6 bg-primary/20 rounded-t"></div>
                  <div className="flex-1 p-2">
                    <div className="w-full h-3 bg-neutral-200 rounded mb-2"></div>
                    <div className="w-3/4 h-3 bg-neutral-200 rounded mb-4"></div>
                    <div className="w-full h-20 bg-neutral-100 rounded"></div>
                  </div>
                </div>
                <div className="w-40 h-52 bg-card rounded shadow-md flex flex-col relative z-10">
                  <div className="h-6 bg-primary/40 rounded-t"></div>
                  <div className="flex-1 p-2">
                    <div className="w-full h-3 bg-neutral-200 rounded mb-2"></div>
                    <div className="w-3/4 h-3 bg-neutral-200 rounded mb-4"></div>
                    <div className="w-full h-24 bg-neutral-100 rounded mb-2"></div>
                    <div className="w-3/4 h-3 bg-neutral-200 rounded"></div>
                  </div>
                </div>
                <div className="w-48 h-60 bg-card rounded shadow-md flex flex-col relative z-20">
                  <div className="h-6 bg-primary rounded-t"></div>
                  <div className="flex-1 p-2">
                    <div className="w-full h-3 bg-neutral-200 rounded mb-2"></div>
                    <div className="w-3/4 h-3 bg-neutral-200 rounded mb-4"></div>
                    <div className="w-full h-28 bg-neutral-100 rounded mb-2"></div>
                    <div className="w-3/4 h-3 bg-neutral-200 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Button>
            Get Started Now
            <FileText className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
