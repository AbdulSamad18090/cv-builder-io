"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureCanvasFullWidth({ sendUrlToParent }) {
  const sigCanvas = useRef();

  const savedData = JSON.parse(
    sessionStorage.getItem("cover-letter-editor-data")
  );

  // Load saved signature on mount
  useEffect(() => {
    if (savedData?.signature && sigCanvas.current) {
      sigCanvas.current.fromDataURL(savedData.signature);
    }
  }, []);

  const clear = () => {
    sigCanvas.current.clear();
    sendUrlToParent("");

    // Remove signature from sessionStorage
    const updatedData = { ...savedData, signature: "" };
    sessionStorage.setItem("cover-letter-editor-data", JSON.stringify(updatedData));
  };

  const save = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    sendUrlToParent(dataURL);

    // Save signature to sessionStorage
    const updatedData = { ...savedData, signature: dataURL };
    sessionStorage.setItem("cover-letter-editor-data", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full">
      <SignatureCanvas
        ref={sigCanvas}
        penColor="blue"
        canvasProps={{
          className: "border rounded-xl w-full h-60",
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
