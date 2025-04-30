"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import SignatureCanvas with no SSR
const SignatureCanvas = dynamic(
  () => import("react-signature-canvas").then((mod) => mod.default),
  { ssr: false }
);

export default function SignatureCanvasFullWidth({ sendUrlToParent }) {
  const sigCanvas = useRef(null);

  // Load signature after canvas is mounted and ref is set
  useEffect(() => {
    const savedData = JSON.parse(
      sessionStorage.getItem("cover-letter-editor-data")
    );

    const interval = setInterval(() => {
      if (sigCanvas.current && savedData?.signature) {
        sigCanvas.current.fromDataURL(savedData.signature);
        clearInterval(interval); // Clear once loaded
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const clear = () => {
    sigCanvas.current?.clear();
    sendUrlToParent("");

    const savedData = JSON.parse(
      sessionStorage.getItem("cover-letter-editor-data")
    );
    const updatedData = { ...savedData, signature: "" };
    sessionStorage.setItem("cover-letter-editor-data", JSON.stringify(updatedData));
  };

  const save = () => {
    const dataURL = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    if (dataURL) {
      sendUrlToParent(dataURL);

      const savedData = JSON.parse(
        sessionStorage.getItem("cover-letter-editor-data")
      );
      const updatedData = { ...savedData, signature: dataURL };
      sessionStorage.setItem(
        "cover-letter-editor-data",
        JSON.stringify(updatedData)
      );
    }
  };

  return (
    <div className="w-full">
      <SignatureCanvas
        ref={sigCanvas}
        penColor="blue"
        canvasProps={{
          className: "border rounded-xl w-full h-48",
        }}
      />
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={clear}>
          Reset
        </Button>
        <Button onClick={save}>Confirm Signature</Button>
      </div>
    </div>
  );
}
