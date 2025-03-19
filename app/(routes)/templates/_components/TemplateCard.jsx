"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye } from "lucide-react";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import Link from "next/link";

const TemplateCard = ({ template, type }) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const navigateToTemplate = (type, id) => {
    router.push(`/${type}-templates/${id}`);
  };

  return (
    <>
      <Card className="w-full p-0">
        <CardHeader className="p-3 border-b">
          <CardTitle>{template.name}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={template.image}
              alt={`${template.name} template preview`}
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex w-full gap-2 p-3 border-t">
          <Button
            size="icon"
            variant="outline"
            className="min-w-9"
            onClick={() => setIsOpenPreview(true)}
          >
            <Eye />
          </Button>
          <Link href={`/editor?template=${template.name}`} className="w-full">
            <Button
              className="w-full"
              onClick={() => navigateToTemplate(type, template.id)}
            >
              Use Template <ChevronRight />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Dialog open={isOpenPreview} onOpenChange={() => setIsOpenPreview(false)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-semibold">
              {template.name} Template
            </DialogTitle>
          </DialogHeader>
          <div className="h-[70vh] overflow-y-auto">
            <img
              src={template.image}
              alt={`${template.name} template preview`}
              className="w-full h-auto"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateCard;
