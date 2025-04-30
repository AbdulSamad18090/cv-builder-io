import React, { useEffect, useRef } from "react";

const ModernLetterhead = ({ letterData, sendDataToParent }) => {
  const printRef = useRef();

  // Send the ref to parent component for printing functionality
  useEffect(() => {
    if (sendDataToParent) {
      sendDataToParent(printRef);
    }
  }, [sendDataToParent]);

  // Default values
  const defaultData = {
    fullName: "ABDUL SAMAD",
    address: "Lahore, Pakistan",
    phone: "03345455964",
    email: "abdulsamad18090@gmail.com",

    recipientName: "KHURRAM",
    position: "Human Resource Manager",
    companyName: "Switch Communications",
    recipientAddress: "Lahore, Pakistan",

    introduction:
      "I am excited to apply for the Full Stack Developer position at Switch Communications. With a strong background in both front-end and back-end development, I specialize in building scalable web applications using technologies like React, Next.js, Node.js, and MongoDB. I am passionate about writing clean, efficient code and creating user-focused solutions that drive real impact.",

    bodyParagraphs: [
      "In my previous roles, I have developed and maintained full-stack applications, collaborated closely with designers and product teams, and contributed to building secure, high-performance systems. I enjoy solving complex problems, staying updated with new technologies, and continuously improving both my technical and soft skills to add value to the teams I work with.",
      "In my previous roles, I have developed and maintained full-stack applications, collaborated closely with designers and product teams, and contributed to building secure, high-performance systems. I enjoy solving complex problems, staying updated with new technologies, and continuously improving both my technical and soft skills to add value to the teams I work with.",
    ],

    closingParagraph:
      "I am excited about the opportunity to bring my experience and energy to Switch Communications and contribute to your innovative projects. I would love the chance to discuss how I can help your team achieve its goals. Thank you for considering my application.",

    closing: "Best Regards,",
  };

  // Merge default data with provided letterData
  const data = letterData ? letterData : defaultData;

  // Process template strings
  const processedData = {
    ...data,
    introduction: data.introduction.replace("[Company Name]", data.companyName),
    closingParagraph: data.closingParagraph.replace(
      "[Company Name]",
      data.companyName
    ),
  };

  // Format recipient name for greeting
  const greeting = `Dear ${processedData.recipientName},`;

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      ref={printRef}
      className="w-full bg-white text-black font-sans relative text-justify"
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with diagonal design */}
      <div className="relative">
        <div style={{ height: "120px", position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "60%",
              height: "100%",
              backgroundColor: "#1e3a8a",
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#dbeafe",
              clipPath: "polygon(40% 0, 100% 0, 100% 100%)",
            }}
          ></div>
        </div>
      </div>

      {/* Content container with padding */}
      <div className="px-12 pt-0 flex-grow" style={{ paddingBottom: "140px" }}>
        {/* Header with name and contact info */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 uppercase">{data.fullName}</h1>
          <p className="text-lg text-gray-600">
            {data.email} | {data.phone} | {data.city}
          </p>
          <hr className="my-4 border-t-2 border-gray-800" />
        </div>

        {/* Recipient info */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex flex-col justify-between h-full">
            <p className="text-lg font-semibold mb-2">{formatDate()}</p>
            <h2 className="text-3xl capitalize font-medium">
              {data.recipientName}
            </h2>
          </div>
          <div>
            <p>{data.position}</p>
            <p>{data.companyName}</p>
            <p>{data.recipientCity}</p>
          </div>
        </div>

        {/* Letter content */}
        <div className="mb-8">
          <p className="mb-4">{greeting}</p>

          <p className="mb-4">{processedData.introduction}</p>

          {processedData.bodyParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}

          <p className="mb-4">{processedData.closingParagraph}</p>

          <p className="mb-6">{processedData.closing}</p>

          <p className="mb-1 font-semibold text-lg">Best Regards,</p>

          {/* Signature */}
          <div className="mb-4">
            <img src={data?.signature} className="h-8 w-auto" />
            <p className="text-blue-800 font-bold">
              {processedData.fullName.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Footer with diagonal design - positioned at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "40%",
            height: "100%",
            backgroundColor: "#dbeafe",
            clipPath: "polygon(0 0, 100% 100%, 0 100%)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "70%",
            height: "100%",
            backgroundColor: "#1e3a8a",
            clipPath: "polygon(100% 100%, 0 100%, 100% 30%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ModernLetterhead;
