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
import CVGenerator from "./_components/Preview";

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
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={60} minSize={60}>
        <div className="">
          <EditorComponent
            onSave={(data) => {
              setCvData(data);
            }}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel defaultSize={40}>
        {/* <Preview cvData={cvData}/> */}
        <CVGenerator cvData={cvData} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Editor;
