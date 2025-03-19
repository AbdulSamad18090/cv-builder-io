import { Briefcase, FileText, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const LeftSide = () => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      <div className="lg:flex items-center gap-2 hidden">
        <Image src={"/images/logo.ico"} width={40} height={40} />
        <h1 className="text-2xl font-bold text-rose-500">Builder.io</h1>
      </div>

      <div className="hidden lg:block">
        <div className="bg-background backdrop-blur-sm p-5">
          <h2 className="text-xl font-semibold text-rose-500 mb-4">
            Build your career story
          </h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-rose-100 dark:bg-rose-500 h-8 w-8 rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-rose-500 dark:text-rose-50" />
              </div>
              <div>
                <p className="font-medium">Professional templates</p>
                <p className="text-sm text-muted-foreground">
                  Stand out with modern designs
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-rose-100 dark:bg-rose-500 h-8 w-8 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-rose-500 dark:text-rose-50" />
              </div>
              <div>
                <p className="font-medium">AI-powered suggestions</p>
                <p className="text-sm text-muted-foreground">
                  Optimize your content
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-rose-100 dark:bg-rose-500 h-8 w-8 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-rose-500 dark:text-rose-50" />
              </div>
              <div>
                <p className="font-medium">Track applications</p>
                <p className="text-sm text-muted-foreground">
                  Manage your job hunt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
