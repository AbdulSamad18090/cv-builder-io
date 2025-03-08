import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-2xl font-semibold mt-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to [CV Builder Name]. By using our services, you agree to comply with these Terms and Conditions.
        Please read them carefully.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">2. Use of Service</h2>
      <p className="mb-4">
        You agree to use our CV Builder services for lawful purposes only. You must not engage in activities that
        violate applicable laws or regulations.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">3. User Accounts</h2>
      <p className="mb-4">
        If you create an account with us, you are responsible for maintaining the confidentiality of your account
        credentials and for all activities under your account.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">4. Content Ownership</h2>
      <p className="mb-4">
        You retain ownership of any content you create using our CV Builder. However, by using our services,
        you grant us a limited license to store and display your CV for functionality purposes.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access to our services at any time if you violate these
        Terms and Conditions.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">6. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any indirect, incidental, or consequential damages arising from your use of our
        services.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">7. Changes to These Terms</h2>
      <p className="mb-4">
        We may update these Terms and Conditions from time to time. Any changes will be posted on our website,
        and your continued use of our services constitutes acceptance of the revised terms.
      </p>
      
      <h2 className="text-2xl font-semibold mt-4">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms and Conditions, please contact us at [Insert Contact Email].
      </p>
    </div>
  );
};

export default TermsAndConditionsPage;
