import React, { useState, useEffect } from "react";
import Chat from "../assets/images/chatwhite.svg";
import User from "@/components/assets/images/userWhite.svg";
import Image from "next/image";
import axios from "axios";

const Header = () => {
  const [businessName, setBusinessName] = useState<any>("Business Name");
  const [displayLogo, setDisplayLogo] = useState<any>();

  useEffect(() => {
    setBusinessName(localStorage.getItem("businessName"));
  }, []);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    axios
      .get(baseUrl + `/user/${user_id}/logo`)
      .then((response) => {
        setDisplayLogo(response?.data?.data?.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="fixed headerwidth w-full top-[48px] lg:top-0  main-grad pl-[20px] pr-[30px] z-20 lg:z-50 py-[10px] border-b border-[#E5E9EB] flex items-center justify-between mb-14 lg:mb-0">
        <div className="capitalize text-white text-2xl md:text-[36px] font-normal text-poppins leading-normal tracking-[0.36px]">
          {businessName ? businessName : "Business Name"}
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={Chat}
            alt="chat"
            className="mr-[28px] w-[24px] h-[24px]"
          />
          <div className="w-[24px] h-[24px] flex justify-center items-center">
            <Image
              src={displayLogo ? displayLogo : User}
              alt="userlogo"
              className="rounded-full w-full "
              width="24"
              height="24"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="sticky top-[48px] lg:top-0  bg-white px-[20px] z-0 py-[10px] border-b border-[#E5E9EB] flex items-center justify-between mb-14 lg:mb-0">
        <div className="capitalize text-white text-2xl md:text-[36px] font-normal text-poppins leading-normal tracking-[0.36px]">
          {businessName ? businessName : "Business Name"}
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={Chat}
            alt="chat"
            className="mr-[28px] w-[24px] h-[24px]"
          />
          <div className="w-[24px] h-[24px]">
            <Image
              src={displayLogo ? displayLogo : User}
              alt="userlogo"
              className="rounded-full w-full"
              width="24"
              height="24"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
