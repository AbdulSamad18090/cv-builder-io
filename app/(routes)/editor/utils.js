export const initialSections = [
  {
    id: "professional-summary",
    title: "Professional Summary",
    type: "summary",
    value: "",
  },
  {
    id: "personal-info",
    title: "Personal Information",
    type: "personal",
    fields: [
      { id: "profileImage", label: "Profile Image", type: "image", value: "" },
      { id: "title", label: "Title", type: "text", value: "" },
      { id: "name", label: "Full Name", type: "text", value: "" },
      { id: "email", label: "Email", type: "email", value: "" },
      { id: "phone", label: "Phone", type: "tel", value: "" },
      { id: "city", label: "City", type: "text", value: "" },
      { id: "linkedin", label: "Linkedin", type: "text", value: "" },
      { id: "github", label: "Github", type: "text", value: "" },
      { id: "website", label: "Website", type: "text", value: "" },
    ],
  },
  {
    id: "contact-info",
    title: "Contact Information",
    type: "personal",
    fields: [
      { id: "email", label: "Email", type: "email", value: "" },
      { id: "phone", label: "Phone", type: "tel", value: "" },
      { id: "address", label: "Address", type: "text", value: "" },
    ],
  },
  {
    id: "education",
    title: "Education",
    type: "education",
    items: [
      {
        id: "edu-1",
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  },
  {
    id: "experience",
    title: "Work Experience",
    type: "experience",
    items: [
      {
        id: "exp-1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    type: "skills",
    items: [{ id: "skill-1", name: "", level: "" }],
  },
];
