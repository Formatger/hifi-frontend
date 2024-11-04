import React, { useState, useEffect } from "react";
import Chat from "../assets/images/chatwhite.svg";
import User from "../../components/assets/images/userWhite.svg";
import Image from "next/image";
import axios from "axios";

const Header = () => {
  // const [businessName, setBusinessName] = useState<any>("Business Name");
  const [displayLogo, setDisplayLogo] = useState<any>();

  // useEffect(() => {
  //   setBusinessName(localStorage.getItem("businessName"));
  // }, []);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    axios
      .get(baseUrl + `/user/${user_id}/logo`)
      .then((response) => {
        setDisplayLogo(response?.data?.data?.url);
      })
      .catch((error) => {
      });
  }, [baseUrl]);

  return (
    <>
      <div
        className="header"
      >
        <div className="">
          {/* {businessName ? businessName : "Business Name"} */}
        </div>
        <div>
          <div className="user-wrap">
            <Image
              src={displayLogo ? displayLogo : User}
              alt="userlogo"
              width="24"
              height="24"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="sticky-header"></div>
    </>
  );
};

export default Header;
