"use client";
import Loader from "@/components/loader/Loader";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditorComponent from "./_components/EditorComponent";
import Preview from "./_components/Preview";
import PrintPdfButton from "./_components/PrintPdfButton";

const Editor = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [cvData, setCvData] = useState([]);
  const [printRef, setPrintRef] = useState(null);

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
      <PrintPdfButton printRef={printRef} />
      <EditorComponent
        onSave={(data) => {
          setCvData(data);
        }}
      />
      <div className="hidden">
        <Preview
          cvData={cvData}
          sendDataToParent={(data) => setPrintRef(data)}
        />
      </div>
    </div>
  );
};

export default Editor;
