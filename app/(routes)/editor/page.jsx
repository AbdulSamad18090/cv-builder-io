"use client";
import Loader from "@/components/loader/Loader";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorComponent from "./_components/EditorComponent";
import Preview from "./_components/Preview";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScanEye } from "lucide-react";

const Editor = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [cvData, setCvData] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <Loader
          size={30}
          speed={700}
          loading={true}
          title="Preparing Editor & Template..."
        />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <Sheet>
        <SheetTrigger className="w-full flex justify-end">
          <Button>
            <ScanEye />
            Prview
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-full w-full">
          <SheetHeader>
            <SheetTitle>Preview</SheetTitle>
            <SheetDescription>
              See how your CV looks like after printing the preview.
            </SheetDescription>
          </SheetHeader>
          <div className="h-full overflow-y-auto">
            <Preview cvData={cvData} />
          </div>
        </SheetContent>
      </Sheet>
      <EditorComponent
        onSave={(data) => {
          setCvData(data);
        }}
      />
    </div>

    // <ResizablePanelGroup
    //   direction="horizontal"
    //   className="max-w-full rounded-lg border"
    // >
    //   <ResizablePanel defaultSize={50} minSize={50}>
    //     <div className="">
    //       <EditorComponent
    //         onSave={(data) => {
    //           setCvData(data);
    //         }}
    //       />
    //     </div>
    //   </ResizablePanel>
    //   <ResizableHandle withHandle={true} />
    //   <ResizablePanel defaultSize={50} minSize={50}>
    //     <Preview cvData={cvData}/>
    //   </ResizablePanel>
    // </ResizablePanelGroup>
  );
};

export default Editor;
