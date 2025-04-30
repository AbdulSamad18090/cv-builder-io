import React, { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Professional from "./Templates/Professional";
import Creative from "./Templates/Creative";
import Academic from "./Templates/Academic";
import ModernResume from "./Templates/Modern";
import Standard from "../../cover-letter/Templates/Standard";
import ModernLetter from "../../cover-letter/Templates/Modern";
import Minimalist from "../../cover-letter/Templates/Minimalist";

const Preview = ({ data, sendDataToParent }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Add this line to actually use the hook
  const template = searchParams.get("template");
  const router = useRouter();

  const isResumeEditor = pathname.includes("resume");
  const isCoverLetterEditor = pathname.includes("cover-letter");

  // console.log("Preview Data =>", data);

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
        <Professional cvData={data} sendDataToParent={sendDataToParent} />
      )}
      {isResumeEditor && template === "Creative" && (
        <Creative cvData={data} sendDataToParent={sendDataToParent} />
      )}
      {isResumeEditor && template === "Academic" && (
        <Academic cvData={data} sendDataToParent={sendDataToParent} />
      )}
      {isResumeEditor && template === "Modern" && (
        <ModernResume cvData={data} sendDataToParent={sendDataToParent} />
      )}
      {/* Cover Letter templates */}
      {isCoverLetterEditor && template === "Standard" && (
        <Standard letterData={data} sendDataToParent={sendDataToParent} />
      )}
      {isCoverLetterEditor && template === "Modern" && (
        <ModernLetter letterData={data} sendDataToParent={sendDataToParent} />
      )}
      {isCoverLetterEditor && template === "Minimalist" && (
        <Minimalist letterData={data} sendDataToParent={sendDataToParent} />
      )}
    </>
  );
};

export default Preview;
