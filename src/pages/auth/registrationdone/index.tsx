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
            Resgistration successful!
          </div>
          <div className="authbox-note">
            Welcome! You've successfully registered for the HIFI app. You can sign in now.
          </div>
          <div className="footnote">
            <Link
              href="/auth/signin"
              className="auth-link"
            >
            Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDone;
