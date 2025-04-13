import React, { useEffect, useRef } from "react";

const Modern = ({ cvData, sendDataToParent }) => {
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

  // Normalize URL (add https:// if missing)
  const normalizeUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };
  return (
    <div
      ref={printRef}
      className="w-full min-w-full max-w-full min-h-max overflow-auto flex-shrink-0 mx-auto text-justify text-gray-600 bg-[#f0f0f0] p-10"
    >
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-48 h-48 rounded-full border-[8px] border-[#014bab] mr-4"
          />
        )}
        <div className="flex flex-col w-full">
          <h1 className="text-5xl font-bold text-[#014bab] uppercase">
            {getPersonalInfo("name")}
          </h1>
          <h2 className="text-2xl capitalize mt-1">
            {getPersonalInfo("title")}
          </h2>
          <div className="border-t border-[#014bab] pt-4 mt-4 w-full flex items-center justify-between text-sm">
            <p className="">{getPersonalInfo("email")}</p>
            <div className="h-7 border-r border-[#014bab]" />
            <p className="">{getPersonalInfo("phone")}</p>
            <div className="h-7 border-r border-[#014bab]" />
            <p className="">{getPersonalInfo("city")}</p>
          </div>
        </div>
      </div>
      {/* Profile Summary */}
      <div className="mb-8 w-full">
        <div className="flex items-center gap-4 w-full">
          <h3 className="text-xl font-bold text-[#014bab] min-w-max">
            PROFILE SUMMARY
          </h3>
          <div className="w-full border-t border-[#014bab]" />
        </div>
        <p className="text-sm mt-4">{professionalSummary}</p>
      </div>
      {/* Education Section */}
      <div className="mb-8 w-full">
        <div className="flex items-center gap-4 w-full">
          <h3 className="text-xl font-bold text-[#014bab] min-w-max">
            EDUCATION
          </h3>
          <div className="w-full border-t border-[#014bab]" />
        </div>
        {education.length > 0 && (
          <div className="flex flex-col mt-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4 break-inside-avoid relative">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{edu.institution}</h2>

                  <p className="text-sm text-[#014bab] italic">
                    {edu.startDate.split("-")[0]} —{" "}
                    {edu.endDate.split("-")[0] || "PRESENT"}
                  </p>
                </div>
                <p className="text-lg font-medium">
                  {edu.degree}
                  {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                </p>
                <ul className="list-disc pl-4 text-sm ml-4 mt-2">
                  {edu.description
                    .split(/(?<=[.!?])\s+/) // Splits after ., !, or ? followed by whitespace
                    .map((sentence, index) => (
                      <li key={index}>{sentence}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Work Experience */}
      <div className="mb-8 w-full">
        <div className="flex items-center gap-4 w-full">
          <h3 className="text-xl font-bold text-[#014bab] min-w-max">
            WORK EXPERIENCE
          </h3>
          <div className="w-full border-t border-[#014bab]" />
        </div>
        {experience.length > 0 && (
          <div className="flex flex-col mt-4">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 break-inside-avoid relative">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg">
                    <span>{exp.position}</span> | <span>{exp.company}</span>
                  </h2>
                  <p className="text-sm text-[#014bab] italic">
                    {exp.startDate.split("-")[0]} —{" "}
                    {exp.endDate.split("-")[0] || "PRESENT"}
                  </p>
                </div>
                <ul className="list-disc pl-4 text-sm ml-4 mt-2">
                  {exp.description
                    .split(/(?<=[.!?])\s+/) // Splits after ., !, or ? followed by whitespace
                    .map((sentence, index) => (
                      <li key={index}>{sentence}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Professional Skills & Languages */}
      <div className="grid grid-cols-2 gap-10 w-full mb-8">
        {/* Prfessional Skills */}
        <div>
          <div className="flex items-center gap-4 w-full">
            <h3 className="text-xl font-bold text-[#014bab] min-w-max">
              PROFESSIONAL SKILLS
            </h3>
            <div className="w-full border-t border-[#014bab]" />
          </div>
          <div className="grid grid-cols-2 w-full text-sm mt-4 ml-4">
            {skills.map((skill) => (
              <li key={skill.id} className="mt-1">
                {skill.name} {skill.level ? `(${skill.level})` : ""}
              </li>
            ))}
            {skills.length === 0 && <li className="mt-1">Add your skills</li>}
          </div>
        </div>
        {/* Languages */}
        <div>
          <div className="flex items-center gap-4 w-full">
            <h3 className="text-xl font-bold text-[#014bab] min-w-max">
              LANGUAGES
            </h3>
            <div className="w-full border-t border-[#014bab]" />
          </div>
          <div className="grid grid-cols-2 w-full text-sm mt-4 ml-4">
            {languages.map((lang) => (
              <li key={lang.id} className="mt-1">
                {lang.name} {lang.level ? `(${lang.level})` : ""}
              </li>
            ))}
            {languages.length === 0 && (
              <li className="mt-1">Add your languages</li>
            )}
          </div>
        </div>
      </div>
      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-8 w-full">
          {section.items.length > 0 && (
            <div className="flex flex-col mt-4">
              {section.items.map((item) => (
                <div key={item.id} className="mb-8 break-inside-avoid relative">
                  <div className="flex items-center gap-4 w-full">
                    <h3 className="text-xl font-bold text-[#014bab] min-w-max">
                      {item.title}
                    </h3>
                    <div className="w-full border-t border-[#014bab]" />
                  </div>
                  <ul className="list-disc pl-4 text-sm ml-4 mt-4">
                    {item.description
                      .split(/(?<=[.!?])\s+/) // Splits after ., !, or ? followed by whitespace
                      .map((sentence, index) => (
                        <li key={index}>{sentence}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Modern;
