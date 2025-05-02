import React, { useEffect, useRef } from "react";

const Minimalist = ({ letterData, sendDataToParent }) => {
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
      "My technical expertise includes proficiency in JavaScript/TypeScript, React ecosystem, Node.js, database management, and cloud services. I have successfully delivered projects that improved operational efficiency, enhanced user experience, and generated measurable business outcomes. I am particularly proud of implementing responsive designs and optimizing application performance, resulting in better user retention and satisfaction.",
    ],

    closingParagraph:
      "I am excited about the opportunity to bring my experience and energy to Switch Communications and contribute to your innovative projects. I would love the chance to discuss how I can help your team achieve its goals. Thank you for considering my application.",

    closing: "Best Regards,",

    jobReference: "Full Stack Developer",
  };

  // Merge default data with provided letterData
  const data = letterData;

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
      className="w-full bg-white text-black font-sans relative p-8 text-justify max-w-3xl mx-auto"
    >
      {/* Sender's Information */}
      <div className="text-right mb-6">
        <p className="font-bold text-lg">{processedData.fullName}</p>
        <p>{processedData.city}</p>
        <p className="mt-2">{formatDate()}</p>
      </div>

      {/* Recipient's Information */}
      <div className="mb-6">
        <p className="font-bold text-lg">{processedData.recipientName}</p>
        <p>{processedData.position}</p>
        <p>{processedData.companyName}</p>
        <p>{processedData.recipientCity}</p>
      </div>

      {/* Job Reference */}
      {/* <div className="mb-4">
        <p className="font-semibold underline">Job Reference: {processedData.jobReference}</p>
      </div> */}

      {/* Greeting */}
      <div className="mb-4">
        <p>{greeting}</p>
      </div>

      {/* Letter Content */}
      <div className="space-y-4 mb-4">
        <p>{processedData.introduction}</p>

        {processedData.bodyParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <p>{processedData.closingParagraph}</p>
      </div>

      <p className="mb-1 font-semibold text-lg">Best Regards,</p>

          {/* Signature */}
          <div className="mb-4">
            <img src={data?.signature} className="h-8 w-auto" />
            <p className="text-blue-800 font-bold">
              {processedData.fullName.toUpperCase()}
            </p>
          </div>
    </div>
  );
};

export default Minimalist;
