import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Function to parse the URL fragment and extract the token
    const extractToken = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1)); // Remove the '#' and parse
      return params.get("access_token"); // Assuming the token is passed as 'access_token'
    };

    // Call our API with the token
    const callApiWithToken = async (token: string) => {
      try {
        const response = await fetch(
          `/api/auth/magiclinkredirect?access_token=${token}`,
          {
            method: "GET", // Or 'POST', depending on your API endpoint's method
          }
        );
        const data = await response.json();

        if (response.ok) {
          // Handle success - navigate to dashboard or another page
          console.log("API call successful", data);
          router.push("/dashboard/dashboard");
        } else {
          // Handle error - perhaps redirect to an error page or login
          console.error("API call failed", data.error);
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("Fetch error", error);
        router.push("/auth/signin");
      }
    };

    // Extract the token and make the API call
    const token = extractToken();
    if (token) {
      console.log("Token extracted:", token);
      callApiWithToken(token);
    } else {
      console.log("No token found in URL fragment.");
      router.push(`/auth/signin`);
    }
  }, [router]);

  return <div></div>;
}
