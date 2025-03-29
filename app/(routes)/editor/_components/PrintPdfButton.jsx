import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
import { useReactToPrint } from "react-to-print";

const PrintPdfButton = ({ printRef }) => {
  const reactToPrintFn = useReactToPrint({ contentRef: printRef });
  return (
    <div>
      <Button onClick={reactToPrintFn} className="w-fit">
        <Download /> Print PDF
      </Button>
    </div>
  );
};

export default PrintPdfButton;
