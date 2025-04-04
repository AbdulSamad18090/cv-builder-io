import React, { useEffect, useRef } from "react";

const Creative = ({ cvData, sendDataToParent }) => {
  const printRef = useRef();

  useEffect(() => {
    sendDataToParent(printRef);
  }, [printRef]);

  // Helper function to get personal info fields
  const getPersonalInfo = (fieldId) => {
    const personalInfo = cvData.find((s) => s.id === "personal-info");
    if (personalInfo && personalInfo.fields) {
      const field = personalInfo.fields.find((f) => f.id === fieldId);
      return field ? field.value : "";
    }
    return "";
  };

  // Get profile image
  const profileImage = getPersonalInfo("profileImage");

  // Get personal info fields
  const fullName = getPersonalInfo("name");
  const jobTitle = getPersonalInfo("title");
  const phone = getPersonalInfo("phone");
  const email = getPersonalInfo("email");
  const address = getPersonalInfo("address");

  // Get professional summary
  const professionalSummary =
    cvData.find((s) => s.id === "professional-summary")?.value || "";

  // Get skills
  const skills = cvData.find((s) => s.id === "skills")?.items || [];

  // get Languages
  const languages = cvData.find((s) => s.id === "languages")?.items || [];

  // Get experience
  const experience = cvData.find((s) => s.id === "experience")?.items || [];

  // Get education
  const education = cvData.find((s) => s.id === "education")?.items || [];

  // Get custom sections
  const customSections = cvData.filter((s) => s.id.startsWith("custom-"));

  // Get rewards/achievements (assuming it's a custom section)
  const rewards = cvData.find((s) => s.id === "custom-rewards")?.items || [];

  return (
    <div
      ref={printRef}
      className="w-full min-w-full max-w-full overflow-auto flex-shrink-0 mx-auto bg-white shadow-lg border border-gray-200"
    >
      {/* Main container */}
      <div className="flex flex-col text-justify">
        {/* Main content container */}
        <div className="flex">
          {/* Left column - About Me, Skills, Rewards, Languages */}
          <div className="w-1/3 bg-neutral-100 p-6">
            {/* Profile Image */}
            <div className="w-full flex items-center justify-center mb-5">
              {profileImage ? (
                <div className="w-36 h-3w-36 rounded-full overflow-hidden my-4">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 h-3w-36 rounded-full bg-gray-500 mb-4"></div>
              )}
            </div>
            {/* About me section */}
            {professionalSummary && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-800">
                  About Me
                </h2>
                <p className="text-sm text-gray-600 text-justify">
                  {professionalSummary}
                </p>
              </div>
            )}

            {/* Skills section */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-800">
                  Skills
                </h2>
                <ul className="list-none">
                  {skills.map((skill, index) => (
                    <li key={index} className="mb-2 text-sm">
                      • {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages section */}
            {languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-800">
                  Languages
                </h2>
                {languages.map((language, index) => (
                  <div key={index} className="mb-1 text-sm">
                    • {language.name} ({language.level})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column - Experience and Education */}
          <div className="w-2/3 p-6">
            {/* Header section with name, title, and contact info */}
            <div className="my-5">
              <h2 className="text-5xl font-semibold mb-2 text-gray-800">
                {getPersonalInfo("name") || "Your Name"}
              </h2>
              <p className="text-2xl text-gray-600">
                {getPersonalInfo("title") || "Your Job Title"}
              </p>
              <div className="flex items-center justify-between gap-2 mt-4 mb-6">
                <span>
                  <h1 className="font-semibold">Phone</h1>
                  <a
                    href={`tel:${getPersonalInfo("phone")}`}
                    className="text-gray-600 text-base hover:text-gray-500"
                  >
                    {getPersonalInfo("phone")}
                  </a>
                </span>
                <span className="col-span-2">
                  <h1 className="font-semibold">Email</h1>
                  <a
                    href={`mailto:${getPersonalInfo("email")}`}
                    className="text-gray-600 text-base hover:text-gray-500 line-clamp-1"
                  >
                    {getPersonalInfo("email")}
                  </a>
                </span>
                <span className="col-span-2">
                  <h1 className="font-semibold">Address</h1>
                  <p className="text-gray-600 text-base hover:text-gray-500">
                    {getPersonalInfo("city") || "Your Address"}
                  </p>
                </span>
              </div>
            </div>
            {/* Experience section */}
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-800">
                  Experience
                </h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-6 break-inside-avoid">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-gray-800">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-800 font-bold">
                        {exp.startDate.split("-")[0]} —{" "}
                        {exp.endDate.split("-")[0] || "Present"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education section */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-800">
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-6 break-inside-avoid">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-800 ">
                        {edu.degree}
                        {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                      </h3>
                      <span className="text-sm text-gray-800 font-bold">
                        {edu.startDate.split("-")[0]} —{" "}
                        {edu.endDate.split("-")[0] || "Present"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600">{edu.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Custom sections */}
            <div>
              {customSections.map((section, i) => (
                <div key={i} className="mt-6 break-inside-avoid">
                  {/* <h2 className="text-xl font-semibold border-b pb-1">
              {section.title}
            </h2> */}
                  {section?.items.map((item, i) => (
                    <div key={i} className="mt-6 break-inside-avoid">
                      <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creative;
