import React, { useEffect, useRef } from "react";

const CoverLetterTemplate = ({ letterData, sendDataToParent }) => {
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

  return (
    <div ref={printRef} className="w-full bg-white text-black font-sans text-justify p-12">
      {/* Top border */}
      {/* <div className="border-t-2 border-blue-800 mb-6"></div> */}

      {/* Sender information */}
      <div className="mb-8 border-y-2 border-blue-800 py-6">
        <h1 className="text-blue-800 font-bold text-xl mb-1">
          {processedData.fullName.toUpperCase()}
        </h1>
        <div className="text-gray-600 text-sm">
          <p>{processedData.city}</p>
          <p>{processedData.phone}</p>
          <p>{processedData.email}</p>
        </div>
      </div>

      {/* Recipient information */}
      <div className="mb-8">
        <h2 className="font-bold mb-1">
          {processedData.recipientName.toUpperCase()}
        </h2>
        <div className="text-sm">
          <p>{processedData.position}</p>
          <p>{processedData.companyName}</p>
          <p>{processedData.recipientCity}</p>
        </div>
      </div>

      {/* Date */}
      {/* <div className="mb-4">
        <p>{new Date().toLocaleDateString()}</p>
      </div> */}

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
  );
};

export default CoverLetterTemplate;
