import React from "react";
import LogoApp from "@/components/auth/LogoApp";
import Link from "next/link";

const PasswordChanged = () => {
  return (
    <div className="auth-container">
      <div className="authbox-wrap">
        <div>
          <LogoApp />
        </div>
        <div className="authbox">
          <div className="authbox-title">
            Password changed!
          </div>
          <div className="authbox-note">
            You have successfully changed your password.
          </div>
          <div className="mt-text">
            <div className="footnote">
              <Link
                href="/auth/signin"
                className="auth-link"
              >
                Continue to Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
