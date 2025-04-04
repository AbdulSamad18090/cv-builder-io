import React, { useEffect, useRef } from "react";
import PrintPdfButton from "../PrintPdfButton";
import { Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Professional = ({ cvData, sendDataToParent }) => {
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
      className="w-full min-w-full max-w-full overflow-auto flex-shrink-0 mx-auto bg-white border border-gray-200 flex"
    >
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-6 flex flex-col items-center">
        {/* Profile Image */}
        {profileImage ? (
          <div className="w-36 h-36 rounded-full overflow-hidden my-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-36 h-36 rounded-full bg-gray-500 mb-4"></div>
        )}

        {/* <h1 className="text-2xl font-bold text-center">
          {getPersonalInfo("name") || "Your Name"}
        </h1>
        <p className="text-gray-400 text-sm text-center">
          {getPersonalInfo("title") || "Your Job Title"}
        </p> */}

        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">
            Contact
          </h2>

          {getPersonalInfo("phone") && (
            <div className="flex items-center mt-3">
              <Phone size={16} className="text-gray-400 mr-2" />
              <a
                href={`tel:${getPersonalInfo("phone")}`}
                className="text-gray-300 text-sm hover:text-white"
              >
                {getPersonalInfo("phone")}
              </a>
            </div>
          )}

          {getPersonalInfo("email") && (
            <div className="flex items-center mt-2">
              <Mail size={16} className="text-gray-400 mr-2" />
              <a
                href={`mailto:${getPersonalInfo("email")}`}
                className="text-gray-300 text-sm hover:text-white"
              >
                {getPersonalInfo("email")}
              </a>
            </div>
          )}

          {getPersonalInfo("address") && (
            <div className="flex items-center mt-2">
              <MapPin size={16} className="text-gray-400 mr-2" />
              <p className="text-gray-300 text-sm">
                {getPersonalInfo("address")}
              </p>
            </div>
          )}

          {getPersonalInfo("linkedin") && (
            <div className="flex items-center mt-2">
              <Linkedin size={16} className="text-gray-400 mr-2" />
              <a
                href={normalizeUrl(getPersonalInfo("linkedin"))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 text-sm hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          )}

          {getPersonalInfo("github") && (
            <div className="flex items-center mt-2">
              <Github size={16} className="text-gray-400 mr-2" />
              <a
                href={normalizeUrl(getPersonalInfo("github"))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 text-sm hover:text-white"
              >
                GitHub
              </a>
            </div>
          )}

          {getPersonalInfo("website") && (
            <div className="flex items-center mt-2">
              <Globe size={16} className="text-gray-400 mr-2" />
              <a
                href={normalizeUrl(getPersonalInfo("website"))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 text-sm hover:text-white"
              >
                Website
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">
            Skills
          </h2>
          <ul className="text-gray-300 text-sm mt-2">
            {skills.map((skill) => (
              <li key={skill.id} className="mt-1">
                {skill.name} {skill.level ? `(${skill.level})` : ""}
              </li>
            ))}
            {skills.length === 0 && <li className="mt-1">Add your skills</li>}
          </ul>
        </div>
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">
            Languages
          </h2>
          <ul className="text-gray-300 text-sm mt-2">
            {languages.map((language) => (
              <li key={language.id} className="mt-1">
                {language.name} {language.level ? `(${language.level})` : ""}
              </li>
            ))}
            {languages.length === 0 && (
              <li className="mt-1">Add your languages</li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-6">
        <div className="text-left mt-[2.8rem] mb-20 flex flex-col items-start">
          <h1 className="text-5xl font-bold text-center">
            {getPersonalInfo("name") || "Your Name"}
          </h1>
          <p className="text-gray-600 text-2xl text-center">
            {getPersonalInfo("title") || "Your Job Title"}
          </p>
        </div>
        {professionalSummary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1">
              Professional Summary
            </h2>
            <p className="mt-2 text-gray-700 text-justify">
              {professionalSummary}
            </p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold border-b pb-1">Experience</h2>
          {experience.length > 0 ? (
            experience.map((exp) => (
              <div
                key={exp.id}
                className="mt-4 grid grid-cols-3 gap-2 break-inside-avoid"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {exp.company ? `${exp.company}` : ""}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {exp.startDate.split("-")[0]}{" "}
                    {exp.endDate
                      ? `- ${exp.endDate.split("-")[0]}`
                      : "- Present"}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-base font-semibold">{exp.position}</h3>
                  <p className="text-gray-600 text-sm text-justify">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">Add your work experience</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold border-b pb-1">Education</h2>
          {education.length > 0 ? (
            education.map((edu) => (
              <div
                key={edu.id}
                className="mt-4 grid grid-cols-3 gap-2 break-inside-avoid"
              >
                <div className="">
                  <p className="text-sm font-semibold">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">
                    {edu.startDate.split("-")[0]}{" "}
                    {edu.endDate
                      ? `- ${edu.endDate.split("-")[0]}`
                      : "- Present"}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-base font-semibold ">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </h3>

                  <p className="text-gray-600 text-sm text-justify">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">Add your education</p>
          )}
        </div>
        <div>
          {customSections.map((section, i) => (
            <div key={i} className="mt-6 break-inside-avoid">
              {/* <h2 className="text-xl font-semibold border-b pb-1">
              {section.title}
            </h2> */}
              {section?.items.map((item, i) => (
                <div key={i} className="mt-6 break-inside-avoid">
                  <h2 className="text-xl font-semibold border-b pb-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm text-justify mt-4">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Professional;
