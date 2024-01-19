import React, { useState, useEffect } from "react";
import Chat from "../assets/images/chatwhite.svg";
import User from "@/components/assets/images/userWhite.svg";
import Image from "next/image";
import axios from "axios";
import useMediaQuery from "@/components/common/hooks/useMediaQuery";


const Header = () => {
  const [businessName, setBusinessName] = useState<any>("Business Name");
  const [displayLogo, setDisplayLogo] = useState<any>();
  const isDesktop = useMediaQuery('(min-width: 1025px)');

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
      <div 
      className="header"
      // className="fixed headerwidth main-grad w-full h-[60px] top-[48px] lg:top-0 pl-[20px] pr-[30px] z-20 lg:z-50 py-[10px] flex items-center justify-between mb-14 lg:mb-0"
      >
       <div className="">
          {/* {businessName ? businessName : "Business Name"} */}
        </div>
        <div className="flex items-center justify-center">
          <div className="user-wrap">
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
      <div className="sticky-header">

      </div>
    </>
  );
};

export default Header;
