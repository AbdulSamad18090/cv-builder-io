import {
  BriefcaseBusiness,
  FileBadge2,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";
import React, { useEffect, useRef } from "react";

const Academic = ({ cvData, sendDataToParent }) => {
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
      className="w-full min-w-full max-w-full overflow-auto flex-shrink-0 mx-auto bg-white"
    >
      {/* Header */}
      <div className="relative bg-[#323b4c] text-white py-10 px-6 text-center">
        {/* Profile Image */}
        <div className="absolute left-[54px] -bottom-16 z-50 w-40 h-40 rounded-full overflow-hidden border-4 border-[#e4e4e4]">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-500"></div>
          )}
        </div>

        {/* Name & Title */}
        <div className="text-left ml-72">
          <h1 className="text-5xl font-bold uppercase">
            {getPersonalInfo("name") || "Your Name"}
          </h1>
          <p className="text-2xl mt-2 tracking-wide uppercase">
            {getPersonalInfo("title") || "Your Job Title"}
          </p>
        </div>
      </div>
      {/* main Content */}
      <div className="w-full flex">
        {/* Left Side */}
        <div className="w-1/3 bg-[#e4e4e4] p-6 flex flex-col items-center pt-16">
          <div className="mt-6 w-full">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-800 pb-2">
              CONTACT
            </h2>

            {getPersonalInfo("phone") && (
              <div className="flex items-center mt-3">
                <Phone size={16} className="text-gray-800 mr-2" />
                <a
                  href={`tel:${getPersonalInfo("phone")}`}
                  className="text-gray-800 text-sm hover:text-gray-700"
                >
                  {getPersonalInfo("phone")}
                </a>
              </div>
            )}

            {getPersonalInfo("email") && (
              <div className="flex items-center mt-2">
                <Mail size={16} className="text-gray-800 mr-2" />
                <a
                  href={`mailto:${getPersonalInfo("email")}`}
                  className="text-gray-800 text-sm hover:text-gray-700"
                >
                  {getPersonalInfo("email")}
                </a>
              </div>
            )}

            {getPersonalInfo("address") && (
              <div className="flex items-center mt-2">
                <MapPin size={16} className="text-gray-800 mr-2" />
                <p className="text-gray-300 text-sm">
                  {getPersonalInfo("address")}
                </p>
              </div>
            )}

            {getPersonalInfo("linkedin") && (
              <div className="flex items-center mt-2">
                <Linkedin size={16} className="text-gray-800 mr-2" />
                <a
                  href={normalizeUrl(getPersonalInfo("linkedin"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 text-sm hover:text-gray-700"
                >
                  LinkedIn
                </a>
              </div>
            )}

            {getPersonalInfo("github") && (
              <div className="flex items-center mt-2">
                <Github size={16} className="text-gray-800 mr-2" />
                <a
                  href={normalizeUrl(getPersonalInfo("github"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 text-sm hover:text-gray-700"
                >
                  GitHub
                </a>
              </div>
            )}

            {getPersonalInfo("website") && (
              <div className="flex items-center mt-2">
                <Globe size={16} className="text-gray-800 mr-2" />
                <a
                  href={normalizeUrl(getPersonalInfo("website"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 text-sm hover:text-gray-700"
                >
                  Website
                </a>
              </div>
            )}
          </div>
          {/* Skills Section */}
          <div className="mt-6 w-full">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-800 pb-2">
              SKILLS
            </h2>
            <ul className="text-gray-800 text-sm mt-2">
              {skills.map((skill) => (
                <li key={skill.id} className="mt-1">
                  • {skill.name} {skill.level ? `(${skill.level})` : ""}
                </li>
              ))}
              {skills.length === 0 && <li className="mt-1">Add your skills</li>}
            </ul>
          </div>
          {/* Languages Section */}
          <div className="mt-6 w-full">
            {languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-800 pb-2 mb-2">
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
        </div>
        {/* Right Side */}
        <div className="w-2/3 flex flex-col gap-6 text-justify text-gray-800 p-6">
          {/* Professional Summary */}
          <div className="border-l border-gray-800 pl-6 relative">
            <h1 className="font-bold text-xl mb-4 border-b border-gray-800 pb-1">
              PROFILE
            </h1>
            <p className="text-sm">
              {professionalSummary || "Your Professional Summary"}
            </p>
            <span className="w-8 h-8 rounded-full bg-gray-800 absolute top-0 -left-[16.5px] flex items-center justify-center">
              <User className="text-white" />
            </span>
            <span className="w-2 h-2 bg-white border border-gray-800 rounded-full absolute top-[60%] -left-[4.5px]"></span>
          </div>
          {/* Work Experience */}
          <div className="border-l border-gray-800 pl-6 relative">
            <h1 className="font-bold text-xl mb-4 border-b border-gray-800 pb-1">
              WORK EXPERIENCE
            </h1>
            {experience.length > 0 && (
              <div className="flex flex-col">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="mb-4 break-inside-avoid relative"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">{exp.company}</h2>
                      <p className="text-sm text-gray-600">
                        {exp.startDate.split("-")[0]} —{" "}
                        {exp.endDate.split("-")[0] || "PRESENT"}
                      </p>
                    </div>
                    <p className="text-gray-800 font-medium">{exp.position}</p>
                    <ul className="list-disc pl-4 text-sm ml-4">
                      {exp.description
                        .split(/(?<=[.!?])\s+/) // Splits after ., !, or ? followed by whitespace
                        .map((sentence, index) => (
                          <li key={index}>{sentence}</li>
                        ))}
                    </ul>
                    <span className="w-2 h-2 bg-white border border-gray-800 rounded-full absolute top-2.5 -left-[28px]"></span>
                  </div>
                ))}
              </div>
            )}
            <span className="w-8 h-8 rounded-full bg-gray-800 absolute top-0 -left-[16.5px] flex items-center justify-center">
              <BriefcaseBusiness className="text-white" />
            </span>
          </div>
          {/* Education */}
          <div className="border-l border-gray-800 pl-6 relative">
            <h1 className="font-bold text-xl mb-4 border-b border-gray-800 pb-1">
              EDUCATION
            </h1>
            {education.length > 0 && (
              <div className="flex flex-col">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="mb-4 break-inside-avoid relative"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        {edu.degree}
                        {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {edu.startDate.split("-")[0]} —{" "}
                        {edu.endDate.split("-")[0] || "PRESENT"}
                      </p>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {edu.institution}
                    </p>
                    <ul className="list-disc pl-4 text-sm ml-4">
                      {edu.description
                        .split(/(?<=[.!?])\s+/) // Splits after ., !, or ? followed by whitespace
                        .map((sentence, index) => (
                          <li key={index}>{sentence}</li>
                        ))}
                    </ul>
                    <span className="w-2 h-2 bg-white border border-gray-800 rounded-full absolute top-2.5 -left-[28px]"></span>
                  </div>
                ))}
              </div>
            )}
            <span className="w-8 h-8 rounded-full bg-gray-800 absolute top-0 -left-[16.5px] flex items-center justify-center">
              <GraduationCap className="text-white" />
            </span>
          </div>
          {/* Additional Sections */}
          {customSections.map((section, i) => (
            <div key={i} className="flex flex-col gap-4">
              {section.items.map((item, j) => (
                <div className="border-l border-gray-800 pl-6 relative">
                  <h1 className="font-bold text-xl mb-4 border-b border-gray-800 pb-1 uppercase">
                    {item.title}
                  </h1>
                  <p className="text-sm">{item.description}</p>
                  <span className="w-8 h-8 rounded-full bg-gray-800 absolute top-0 -left-[16.5px] flex items-center justify-center">
                    <Star className="text-white" />
                  </span>
                  <span className="w-2 h-2 bg-white border border-gray-800 rounded-full absolute top-[60%] -left-[4.5px]"></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academic;
