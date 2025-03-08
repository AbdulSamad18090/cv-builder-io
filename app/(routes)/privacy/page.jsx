import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

      <h2 className="text-2xl font-semibold mt-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Builder.io. Your privacy is important to us. This Privacy
        Policy explains how we collect, use, and protect your personal
        information when you use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-4">2. Information We Collect</h2>
      <p className="mb-4">
        When you use our CV Builder, we may collect the following types of
        information:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal information (e.g., name, email address, phone number)</li>
        <li>CV-related data (e.g., education, work experience, skills)</li>
        <li>Usage data (e.g., log files, device information, IP address)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">
        3. How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the collected data for the following purposes:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide and improve our CV Builder services</li>
        <li>To personalize your experience</li>
        <li>To communicate with you regarding updates and support</li>
        <li>To analyze usage trends and improve security</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">
        4. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell your personal information. However, we may share your
        data with third-party service providers who assist in operating our
        platform, subject to confidentiality agreements.
      </p>

      <h2 className="text-2xl font-semibold mt-4">5. Data Security</h2>
      <p className="mb-4">
        We implement security measures to protect your personal data from
        unauthorized access or disclosure. However, no method of transmission
        over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-4">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, correct, or delete your personal
        information. You may also opt out of marketing communications at any
        time.
      </p>

      <h2 className="text-2xl font-semibold mt-4">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify
        users of significant changes via email or through our website.
      </p>

      <h2 className="text-2xl font-semibold mt-4">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at [Insert Contact Email].
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
