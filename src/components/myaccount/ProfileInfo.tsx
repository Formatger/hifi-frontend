import React, { useEffect, useState } from "react";
import Image from "next/image";
import pencilsimple from "@/components/assets/images/PencilSimple.svg";
import ChangePasswordModal from "@/components/myaccount/ChangePassowrdModal";
import x from "@/components/assets/images/XViolet.svg";

const ProfileInfo = (userData: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("email.example@hifipay.com");
  const [name, setName] = useState("Jane Smith");
  const [password, setPassword] = useState("**********");
  const [tempEmail, setTempEmail] = useState(email);
  const [tempName, setTempName] = useState(name);
  const [tempPassword, setTempPassword] = useState(password);

  const [role, setRole] = useState<any>("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  //for update password modal

  const [passwordModal, setsetPasswrdModal] = useState<boolean>(false);
  const [verification, setVerification] = useState<boolean>(false);

  const openPasswordModal = () => {
    setsetPasswrdModal(true);
    setVerification(false);
  };

  const closePasswordModal = () => {
    setsetPasswrdModal(false);
    setVerification(false);
  };

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      setEmail(tempEmail);
      setName(tempName);
      setPassword(tempPassword);
    } else {
      setIsEditing(true);
      setTempEmail(email);
      setTempName(name);
      setTempPassword(password);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#E5E9EB] py-5">
        <p className="text-[#111012] text-lg lg:text-4xl font-semibold poppins-remove">
          Profile
        </p>

        {/* {isEditing ? (
          <div className="flex items-center gap-4">
            <button
              className="w-[87px] h-8 py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] blue-text poppins-remove flex items-center justify-center gap-3"
              onClick={handleEdit}
            >
              Cancel
            </button>
            <button
              className="w-[87px] h-8 py-1 bg-[#6200EE] text-stone-50 rounded-md border border-gray-20 poppins-remove ml-auto flex justify-center"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className="w-[87px] h-8 py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] blue-text poppins-remove ml-auto flex items-center justify-center gap-3"
            onClick={handleEdit}
          >
            <Image src={pencilsimple} alt="edit" className="" />
            Edit
          </button>
        )} */}
      </div>
      <div className="flex flex-col gap-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20 items-center">
          <p className="text-[#111012] text-base font-semibold poppins-remove w-20">
            Email
          </p>
          {/* {isEditing ? (
            <>
              <input
                type="text"
                value={email}
                className="border border-[#E5E9EB] h-[34px] px-3 rounded text-[#6A7781] poppins-remove"
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : ( */}
          <p className="text-[#252C32] text-base font-normal poppins-remove">
            {userData?.userData?.data?.email}
          </p>
          {/* )} */}
        </div>
        <div className="flex  flex-col lg:flex-row gap-5 lg:gap-20 items-center">
          <p className="text-[#111012] text-base font-semibold poppins-remove w-20">
            Name
          </p>
          {/* {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                className="border border-[#E5E9EB] h-[34px] px-3 rounded text-[#6A7781] poppins-remove"
                onChange={(e) => setName(e.target.value)}
              />
            </>
          ) : ( */}
          <p className="text-[#252C32] text-base font-normal poppins-remove">
            {userData?.userData?.data?.name}
          </p>
          {/* )} */}
        </div>
        <div className="flex  flex-col lg:flex-row gap-5 lg:gap-20 items-center">
          <p className="text-[#111012] text-base font-semibold poppins-remove w-20">
            Password
          </p>
          {isEditing ? (
            <div className="flex items-center gap-3">
              <button
                className="w-[174px] h-8 py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] blue-text poppins-remove flex items-center justify-center gap-3"
                onClick={openPasswordModal}
              >
                Change Password
              </button>
              <button className="" onClick={handleEdit}>
                <Image src={x} alt="cancel" className="text-blue-700" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-[#252C32] flex justify-center items-center text-center pt-[8px] text-base font-normal poppins-remove">
                {password}
              </p>
              {role === "0" || role === "1" ? (
                <button onClick={openPasswordModal}>
                  <Image src={pencilsimple} alt="icon" className="" />
                </button>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
      <ChangePasswordModal
        isOpen={passwordModal}
        closeModal={closePasswordModal}
        verification={verification}
        setVerification={setVerification}
      />
    </>
  );
};

export default ProfileInfo;
