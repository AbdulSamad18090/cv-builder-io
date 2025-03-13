"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import TemplateCard from "./_components/TemplateCard";

const TemplatesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "resume"; // Default to "resume" if type is null

  const resumeTemplates = [
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
      description:
        "Structured format ideal for academic and research positions",
      image: "/images/template-3.webp",
    },
    {
      id: 4,
      name: "Modern",
      description: "Contemporary design with a sleek, professional appearance",
      image: "/images/template-4.webp",
    },
  ];

  const coverLetterTemplates = [
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-1">Templates</h1>
      <p className="text-muted-foreground mb-8">
        Choose a template to start building your professional documents
      </p>

      {/* Controlled Tabs (value changes dynamically) */}
      <Tabs
        value={type}
        onValueChange={(val) => router.push(`/templates?type=${val}`)}
        className="w-full"
      >
        <TabsList className="mb-8">
          <TabsTrigger value="resume">Resume Templates</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="resume">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resumeTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                type="resume"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cover-letter">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {coverLetterTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                type="cover-letter"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesPage;
