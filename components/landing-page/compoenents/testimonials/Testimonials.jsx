import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";

const testimonials = [
  {
    quote:
      "This CV builder made my job search so much easier! The templates are professional, and the process was incredibly smooth.",
    name: "Aisha Khan",
    title: "Marketing Specialist",
  },
  {
    quote:
      "I landed my dream job thanks to this amazing platform! The ATS-friendly templates helped me get noticed by recruiters.",
    name: "James Peterson",
    title: "Software Engineer",
  },
  {
    quote:
      "As a freelancer, I needed a standout resume. This builder allowed me to customize every detail effortlessly!",
    name: "Maria Lopez",
    title: "Graphic Designer",
  },
  {
    quote:
      "I was struggling with resume formatting, but this tool made it so easy. Highly recommended for job seekers!",
    name: "David Smith",
    title: "Project Manager",
  },
  {
    quote:
      "The AI suggestions were a game-changer! My CV looks more polished and professional than ever before.",
    name: "Sophia Chang",
    title: "Data Analyst",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold ">
          What Our <span className="text-primary">Users</span> Say
        </h2>
        {/* Subtitle */}
        <p className="mt-2 text-lg text-muted-foreground">
          Hear from professionals who landed their dream jobs with our CV
          Builder.
        </p>
      </div>

      {/* Infinite Moving Cards */}
      <div className="mt-10">
        <InfiniteMovingCards items={testimonials} speed="normal" />
      </div>
    </section>
  );
};

export default Testimonials;
