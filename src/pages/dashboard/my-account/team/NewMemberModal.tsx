import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading3 } from "@/components/auth/Loading";

interface NewMemberModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type RoleCategory = {
  category: string;
  roles: string[];
};

const rolesData: RoleCategory[] = [
  {
    category: "Roles",
    roles: ["Administrator", "Analyst"],
  },
];

const NewMemberModal: React.FC<NewMemberModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [formValue, setFormValue] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState("Administrator");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const handleCheckboxChange = (value: any) => {
    setSelectedCheckbox(value);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Add Account Modal"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <button className="" onClick={closeModal}>
            <Image src={x} alt="close" className="close-btn" />
          </button>
          <h5>
            Invite team members
          </h5>
        </div>

        <div className="modal-box-content">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setLoader(true);

              const user_id = localStorage.getItem("userId");
              axios
                .post(baseUrl + `/user/${user_id}/team/add`, {
                  email: values?.email,
                  role: selectedCheckbox === "Administrator" ? 1 : 2,
                })
                .then((response) => {
                  setTimeout(() => {
                    closeModal();
                  }, 1000);

                  setLoader(false);
                  toast.success(`Invite send..!`, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                })
                .catch((error) => {
                  toast.error(error?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  setLoader(false);
                  console.log(error);
                });
            }}
          >
            <Form>
              <div className="pl-5 pr-1 py-[30px]">
                <div className="relative w-full mt-4">
                  <Title />
                  <InputFields />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-[red] absolute bottom-[-5px] left-[4px]"
                  />
                </div>
                <div className="mt-4 mb-4">
                  {rolesData.map((category) => (
                    <div
                      key={category.category}
                      className="flex flex-col gap-3 pr-6"
                    >
                      <label
                        htmlFor={category.category}
                        className=" poppins-remove bg-gray-200 opacity-80 px-8 py-2.5 text-[#111012] font-semibold"
                      >
                        {category.category}
                      </label>
                      {category.roles.map((role) => (
                        <div key={role} className="flex items-center px-6">
                          <input
                            type="checkbox"
                            id={role}
                            name={role}
                            checked={selectedCheckbox === role}
                            onChange={() => handleCheckboxChange(role)}
                            className="mr-2 custom-checkbox"
                          />
                          <label
                            htmlFor={role}
                            className="text-black poppins-remove"
                          >
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <AutoSubmitToken setFormValue={setFormValue} />
              <div className="">
                <div className="modal-footer">
                  <button
                    className="modal-button grey"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  {loader ? (
                    <>
                      <Loading3 />
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={!formValue?.email}
                        className="modal-button">
                        Confirm
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export const Title = () => {
  return (
    <>
      <p className=" text-[#111012] text-remove font-medium poppins-remove uppercase leading-normal tracking-tight">
        enter team member email address
      </p>
    </>
  );
};

export const InputFields = () => {
  return (
    <>
      <div className="self-stretch mt-[6px] mb-[16px] mr-5 w-[240px] sm:w-[400px] h-[34px] px-2 py-1 bg-white rounded border border-gray-400 inline-flex">
        <div className="grow shrink basis-0 h-6 text-gray-800 text-remove  font-remove leading-normal">
          <Field
            type="text"
            className="w-full"
            placeholder="example@hifipay.com"
            name="email"
            id="email"
          />
        </div>
      </div>
    </>
  );
};

export default NewMemberModal;
