import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const resumeTemplates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and minimal design for corporate environments",
    image: "/images/template-1.webp",
  },
  {
    id: 2,
    name: "Creative",
    description: "Colorful and unique layout for creative industries",
    image: "/images/template-2.webp",
  },
  {
    id: 3,
    name: "Academic",
    description: "Structured format ideal for academic and research positions",
    image: "/images/template-3.webp",
  },
  {
    id: 4,
    name: "Modern",
    description: "Contemporary design with a sleek, professional appearance",
    image: "/images/template-4.webp",
  },
];

export const coverLetterTemplates = [
  {
    id: 1,
    name: "Standard",
    description: "Traditional format suitable for most industries",
    image: "/images/cover-letter-1.webp",
  },
  {
    id: 2,
    name: "Modern",
    description: "Clean design with contemporary typography",
    image: "/images/cover-letter-2.webp",
  },
  {
    id: 3,
    name: "Minimalist",
    description: "Simple, elegant layout focusing on content",
    image: "/images/cover-letter-3.webp",
  },
];
