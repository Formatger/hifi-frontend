import React, { useState, useRef, useEffect } from "react";
import profileicon from "@/components/assets/images/Vector.svg";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import uploadsimple from "@/components/assets/images/UploadSimple.svg";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading2 } from "@/components/auth/Loading";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/router";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "0px",
    padding: "0px",
  },
};

const UploadLogo = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [loadermain, setLoadermain] = useState<boolean>(false);
  const [displayLogo, setDisplayLogo] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [role, setRole] = useState<any>("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    setLoadermain(true);
    axios
      .get(baseUrl + `/user/${user_id}/logo`)
      .then((response) => {
        setDisplayLogo(response?.data?.data?.url);
        setLoadermain(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadermain(false);
      });
  }, [isPopupOpen]);

  useEffect(() => {
    if (uploadedImage) {
      setLoader(true);

      const formData = new FormData();
      formData.append("image", uploadedImage);

      const user_id = localStorage.getItem("userId");

      axios
        .post(baseUrl + `/user/${user_id}/upload/logo`, formData)
        .then((response) => {
          setTimeout(() => {
            closePopup();
            router.reload();
          }, 2000);

          setLoader(false);
          toast.success(`Logo uploaded..!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Server error. Please try again..!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoader(false);
          console.log(error);
        });
    }
  }, [uploadedImage]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedImage(file);
  };

  const handleRemoveLogo = () => {
    setUploadedImage(null);
  };

  const handleClickChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <ToastContainer />
      {loadermain ? (
        <>
          {" "}
          <div className="flex items-center justify-center mt-10">
            <Oval
              height={50}
              width={50}
              color="#E5E9EB"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="bg-slate-100"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-center gap-10 border-b border-[#E5E9EB] py-5 lg:py-0 lg:pb-5">
            {displayLogo ? (
              <div className="flex flex-col">
                <p className="text-[#111012] text-base font-semibold text-poppins">
                  Business profile logo
                </p>
                <Image
                  src={displayLogo}
                  alt="profile"
                  width={100}
                  height={100}
                  className="mt-4 rounded-full"
                />
              </div>
            ) : (
              <Image src={profileicon} alt="profile" />
            )}
            <div className="flex flex-col">
              {displayLogo ? null : (
                <>
                  <p className="text-[#111012] text-base font-semibold text-poppins">
                    Upload your business logo
                  </p>
                  <p className="text-[#4B5563] text-base font-normal text-poppins">
                    Suggested logo size 300px x 300px
                  </p>
                </>
              )}
            </div>
            {displayLogo ? (
              <>
                {/* <div className="ml-auto flex items-center gap-3">
              <button
                className="w-[123px] h-8 py-1 bg-[#F6F8F9] rounded-md text-[#6200EE] border border-[#7856E4] text-poppins"
                onClick={handleRemoveLogo}
              >
                Remove Logo
              </button>
              <button
                className="w-[123px] h-8 py-1 bg-[#6200EE] rounded-md text-stone-50 text-poppins "
                onClick={handleClickChooseFile}
              >
                Change Logo
              </button>
            </div> */}
                {role === "0" || role === "1" ? (
                  <button
                    className="w-[123px] h-8 py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] text-[#6200EE] text-poppins lg:ml-auto"
                    onClick={openPopup}
                  >
                    Upload logo
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <button
                className="w-[123px] h-8 py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] text-[#6200EE] text-poppins lg:ml-auto"
                onClick={openPopup}
              >
                Upload logo
              </button>
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </>
      )}

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={closePopup}
        style={customStyles}
        contentLabel="Upload Business Logo"
      >
        <div className="flex flex-col lg:w-[452px] items-center justify-center gap-4  rounded-2xl border shadow-lg">
          <div className="h-[80px] w-full bg-[#F6F8F9] border-[#E5E9EB] border flex items-center justify-center relative rounded-t-2xl">
            <button onClick={closePopup}>
              <Image src={x} alt="close" className="top-2 right-2 absolute" />
            </button>
            <p className="text-[#111012] text-[23px] font-semibold text-poppins leading-loose">
              Upload business logo
            </p>
          </div>
          <Image src={uploadsimple} alt="" />
          <div className="flex flex-col px-3 lg:px-0">
            <p className="text-gray-800 text-base font-semibold text-poppins leading-normal">
              Drop your image here to upload
            </p>
            <p className="text-[#4B5563] text-base font-normal text-poppins leading-normal">
              Works with any .JPG or .PNG File.
            </p>
          </div>
          {!loader ? (
            <button
              className="w-[117px] h-8 py-1 bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] text-stone-50 hover:text-[#6200EE] border-[1px] rounded-md text-poppins"
              onClick={handleClickChooseFile}
              disabled={loader}
            >
              Choose File
            </button>
          ) : (
            <Loading2 />
          )}

          <div className="bg-[#F6F8F9] w-full h-7 mt-auto"></div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadLogo;
