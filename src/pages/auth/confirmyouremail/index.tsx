import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogoApp from "@/components/auth/LogoApp";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";

const VerifyEmailSent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const { email } = router.query;

  const handleClick = () => {
    setLoader(true);
  };

  useEffect(() => {
    // Redirects to sign-in page if no email is provided in the URL
    if (!email) {
      router.push("/auth/signin");
    }
  }, [email, router]);

  return (
    <div>
      <ToastContainer />
      
      <div className="auth-container">
        <div className="authbox-wrap">
            <div>
              <LogoApp />
            </div>
          <div className="authbox">
            <div className="authbox-title">
              Verify your email
            </div>

            <div className="authbox-note">
            A verification email has been sent to{" "}
              {email ? email : "your email"}. 
            Please check your inbox.
            </div>
            <div className="footnote mt-3">
              <div>Already verified?</div>
              <Link href="/auth/signin" className="auth-link ml-text">
                Sign In.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>    
  );
};

export default VerifyEmailSent;
