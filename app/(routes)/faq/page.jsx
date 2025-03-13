import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is this CV Builder?",
      answer:
        "Our CV Builder is an easy-to-use tool that helps you create a professional CV in minutes. Simply enter your details, choose a template, and download your CV.",
    },
    {
      question: "Do I need to sign up to use the CV Builder?",
      answer:
        "No, you can start building your CV right away. However, signing up allows you to save and edit your CVs later.",
    },
    {
      question: "Is this CV Builder free to use?",
      answer:
        "Yes! Our basic CV Builder is completely free. We also offer premium templates and additional features for a small fee.",
    },
    {
      question: "Can I download my CV as a PDF?",
      answer:
        "Yes, you can download your CV in PDF format with a single click after completing the customization process.",
    },
    {
      question: "Can I edit my CV after creating it?",
      answer:
        "Yes! If you have an account, you can log in and edit your saved CV anytime.",
    },
    {
      question: "What templates are available?",
      answer:
        "We offer a variety of modern and professional CV templates. You can choose one that best suits your industry and personal style.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take data security seriously. Your information is encrypted and stored securely. We never share your data with third parties.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-foreground">
              {faq.question}
            </h3>
            <p className="text-muted-foreground mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
