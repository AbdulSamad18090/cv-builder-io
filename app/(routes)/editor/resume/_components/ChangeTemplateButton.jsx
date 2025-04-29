import TemplateCard from "@/app/(routes)/templates/_components/TemplateCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { coverLetterTemplates, resumeTemplates } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LayoutTemplate } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const ChangeTemplateButton = ({ type = "resume", variant = "default" }) => {
  const searchParams = useSearchParams();
  const templateInURL = searchParams.get("template");

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={variant} className="w-fit">
          <LayoutTemplate /> Change Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Change Template</DialogTitle>
          <DialogDescription>
            Choose your template to customize your document.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto">
          {type === "resume" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {resumeTemplates.map((template) => (
                <div
                  className={`h-fit rounded-md ${
                    templateInURL === template.name && "border-2 border-primary"
                  }`}
                >
                  <TemplateCard
                    key={template.id}
                    template={template}
                    type="resume"
                  />
                </div>
              ))}
            </div>
          )}
          {type === "cover-letter" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {coverLetterTemplates.map((template) => (
                <div
                  className={`h-fit rounded-md ${
                    templateInURL === template.name && "border-2 border-primary"
                  }`}
                >
                  <TemplateCard
                    key={template.id}
                    template={template}
                    type="cover-letter"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeTemplateButton;
