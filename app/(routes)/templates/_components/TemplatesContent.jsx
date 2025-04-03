import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import TemplateCard from "./TemplateCard";
import { coverLetterTemplates, resumeTemplates } from "@/lib/utils";

const TemplatesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "resume"; // Default to "resume" if type is null

  return (
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
            <TemplateCard key={template.id} template={template} type="resume" />
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
  );
};

export default TemplatesContent;
