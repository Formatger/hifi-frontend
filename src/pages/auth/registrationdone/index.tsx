import React from "react";
import LogoApp from "@/components/auth/LogoApp";
import Link from "next/link";

const RegistrationDone = () => {
  return (
    <div className="auth-container">
      <div className="authbox-wrap">
        <div>
          <LogoApp />
        </div>
        <div className="authbox">
        <div className="authbox-title">
            Check your Email
          </div>
          <div className="authbox-note">
            We have emailed you a Google Form link. Kindly check your email,
            click the link, and complete the form. Thank you.
          </div>
          <div className="footnote">
            <Link
              href="/auth/signin"
              className="auth-link"
            >
            Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDone;
