import { LoaderCircle } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

const Loader = ({ size = 60, speed = 700, loading, title = "Please Wait..." }) => {
  return (
    <div
      className={`w-full h-dvh fixed overflow-y-hidden top-0 left-0 z-50 bg-black/85 flex items-center justify-center ${
        loading ? "block" : "hidden"
      }`}
    >
      <Card className="p-6 flex items-center justify-center gap-4">
        <LoaderCircle
          size={size}
          className={`text-primary animate-spin duration-${speed} `}
        />
        {title && <h2 className="font-thin">{title}</h2>}
      </Card>
    </div>
  );
};

export default Loader;
