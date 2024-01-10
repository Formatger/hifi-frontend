import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("userVerified");
    if (token === null) {
      router.push(`/auth/signin`); // Redirect to login page if token is not found
    } else {
      router.push(`/dashboard/dashboard`);
    }
  });

  return <h1 className="text-base font-bold underline"></h1>;
}
