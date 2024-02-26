import React, { useState, useRef, useEffect } from "react";
import profileicon from "@/components/assets/images/Vector.svg";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import uploadsimple from "@/components/assets/images/UploadSimple.svg";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";
import MainLoader from "@/components/common/Loader";
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
  }, [isPopupOpen, baseUrl]);

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
  }, [uploadedImage, baseUrl, router]);

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
          <MainLoader />
      ) : (
        <>
          <div className="upload-wrap">
            {displayLogo ? (
              <div className="column-wrap">
                  {/* <p className="bold">
                    Business Logo
                  </p> */}
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
            <div className="column-wrap">
              {!displayLogo ? null : (
                <>
                  <p className="bold">
                    Upload your business logo
                  </p>
                  <p className="text-s-thin">
                    Suggested logo size 300px x 300px
                  </p>
                </>
              )}
            </div>
            {displayLogo ? (
              <>
                {/* <div className="ml-auto flex items-center gap-3">
              <button
                className="w-[123px] h-8 py-1 bg-[#F6F8F9] rounded-md blue-text border border-[#7856E4] poppins-remove"
                onClick={handleRemoveLogo}
              >
                Remove Logo
              </button>
            </div> */}
                {role === "0" || role === "1" ? (
                  <button
                    className="sec-button"
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
                className="sec-button"
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
            <h4 className="">
              Upload business logo
            </h4>
            <button onClick={closePopup}>
              <Image src={x} alt="close" className="top-2 right-2 absolute" />
            </button>
          </div>
          <Image src={uploadsimple} alt="" />
          <div className="flex flex-col px-3 lg:px-0">
            <p className="text-gray-800 text-remove font-semibold poppins-remove leading-normal">
              Drop your image here to upload
            </p>
            <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
              Works with any .JPG or .PNG File.
            </p>
          </div>
          {!loader ? (
            <button
              className="modal-button"
              onClick={handleClickChooseFile}
              disabled={loader}
            >
              Choose File
            </button>
          ) : (
            <Loading />
          )}

          <div className="bg-[#F6F8F9] w-full h-7 mt-auto"></div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadLogo;
