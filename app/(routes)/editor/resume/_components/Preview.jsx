import React, { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Professional from "./Templates/Professional";
import Creative from "./Templates/Creative";
import Academic from "./Templates/Academic";
import Modern from "./Templates/Modern";

const Preview = ({ cvData, sendDataToParent }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Add this line to actually use the hook
  const template = searchParams.get("template");
  const router = useRouter();

  const isResumeEditor = pathname.includes("resume");
  const isCoverLetterEditor = pathname.includes("cover-letter");

  useEffect(() => {
    if (pathname) {
      if ((!isResumeEditor && !isCoverLetterEditor) || !template) {
        router.push("/templates?type=resume");
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Resume Templates */}
      {isResumeEditor && template === "Professional" && (
        <Professional cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      {isResumeEditor && template === "Creative" && (
        <Creative cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      {isResumeEditor && template === "Academic" && (
        <Academic cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      {isResumeEditor && template === "Modern" && (
        <Modern cvData={cvData} sendDataToParent={sendDataToParent} />
      )}
      
    </>
  );
};

export default Preview;
