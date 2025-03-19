"use client";
import Loader from "@/components/loader/Loader";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditorComponent from "./EditorComponent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Editor = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
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
          <EditorComponent />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel defaultSize={40}>
        <div className="flex items-center justify-center h-screen p-6">
          <span className="font-semibold">Preview</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Editor;
