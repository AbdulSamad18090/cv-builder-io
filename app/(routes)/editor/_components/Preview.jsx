import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Professional from "./Templates/Professional";
import Creative from "./Templates/Creative";
import Academic from "./Templates/Academic";
import Modern from "./Templates/Modern";

const Preview = ({ cvData, sendDataToParent }) => {
  const searchParams = useSearchParams();
  const template = searchParams.get("template");

  return (
    <>
      {template === "Professional" && (
        <Professional cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      {template === "Creative" && (
        <Creative cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      {template === "Academic" && (
        <Academic cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      {template === "Modern" && (
        <Modern cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
    </>
  );
};

export default Preview;
