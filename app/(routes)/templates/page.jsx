"use client";
import React, { Suspense } from "react";
import Loader from "@/components/loader/Loader";
import TemplatesContent from "./_components/TemplatesContent";

const TemplatesPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-1">Templates</h1>
      <p className="text-muted-foreground mb-8">
        Choose a template to start building your professional documents
      </p>

      {/* Wrap in Suspense */}
      <Suspense fallback={<Loader size={30} />}>
        <TemplatesContent />
      </Suspense>
    </div>
  );
};

export default TemplatesPage;
