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
import { Loading2 } from "@/components/auth/Loading";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";

interface AddAccountModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isEdit: boolean;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  closeModal,
  isEdit,
}) => {
  const [formValue, setFormValue] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Please select an option"),
    bankaccounttype: Yup.string().required("Please select an option"),
    accountnumber: Yup.string().required("Please add account number"),
    international: Yup.string().required("Please select an option"),
    routingnumber: Yup.string(),
    nameofbusiness: Yup.string().required("Please add name of business"),
    firstname: Yup.string().required("Please add first name"),
    lastname: Yup.string().required("Please add last name"),
    wirenumber: Yup.string(),
    bankname: Yup.string().required("Please add bank name"),
    swiftnumber: Yup.string().when("international", {
      is: "no",
      then: (schema) => schema,
      otherwise: (schema) => schema.required("Swift number is required"),
    }),
    wireinstructions: Yup.string(),
    currency: Yup.string().required("Please select an option"),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Account Modal"
      className="w-[90%] sidebarModal relative rounded-lg poppins-remove sm:w-[452px] shadow-xl bg-white max-h-[90vh]"
      overlayClassName="bg-black bg-opacity-60 fixed inset-0 flex justify-center items-center z-50"
    >
      <div className="h-[80px] bg-[#F6F8F9] border-[#E5E9EB] border flex rounded-lg items-center justify-center sticky top-0 z-20">
        <button className="" onClick={closeModal}>
          <Image src={x} alt="close" className="top-2 right-2 absolute" />
        </button>
        <h2 className="font-semibold  text-neutral-900 mt-4 poppins-remove text-[23px]">
          {isEdit ? "Edit Bank Account" : "Add Bank Account"}
        </h2>
      </div>

      <div className="relative w-full bg-white border-l border-t border-b border-[#E5E9EB] flex-col justify-start items-start gap-8">
        <Formik
          initialValues={{
            type: "",
            bankaccounttype: "",
            accountnumber: "",
            international: "",
            routingnumber: "",
            nameofbusiness: "",
            firstname: "",
            lastname: "",
            wirenumber: "",
            bankname: "",
            swiftnumber: "",
            wireinstructions: "",
            currency: "USD-US Dollar",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setLoader(true);

            const user_id = localStorage.getItem("userId");

            axios
              .post(baseUrl + `/user/${user_id}/bank`, {
                accountnumber: values?.accountnumber,
                bankAccountType: values?.bankaccounttype,
                bankCurrency: "usd",
                bankname: values?.bankname,
                enableWires: true,
                firstname: values?.firstname,
                isInternational: values?.international === "yes" ? true : false,
                lastname: values?.lastname,
                name: `${values?.firstname} + ${values?.lastname}`,
                swiftnumber:
                  formValue?.international === "yes" && values?.swiftnumber,
                type: values?.type,
                wireInstructions: values?.wireinstructions,
              })
              .then((response) => {
                setTimeout(() => {
                  closeModal();
                }, 1000);

                setLoader(false);
                toast.success(`Bank account updated..!`, {
                  position: toast.POSITION.TOP_RIGHT,
                });
              })
              .catch((error) => {
                toast.error(error?.response?.data?.error, {
                  position: toast.POSITION.TOP_RIGHT,
                });
                setLoader(false);
                console.log(error);
              });
          }}
        >
          <Form>
            <>
              <div className="pl-2 lg:pl-5 pr-1 py-[30px] w-full overflow-auto max-h-[50vh]">
                <div className="relative w-full mt-4">
                  <RadioTitle title="TYPE" />
                  <RenderRadiobutton
                    title="Individual"
                    name="type"
                    value="Individual"
                    selectedoption={formValue?.type}
                  />
                  <RenderRadiobutton
                    title="Corporate"
                    name="type"
                    value="Corporate"
                    selectedoption={formValue?.type}
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="error text-[red] absolute bottom-[-16px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="Bank account type" />
                  <RenderRadiobutton
                    title="Checking"
                    name="bankaccounttype"
                    value="Checking"
                    selectedoption={formValue?.bankaccounttype}
                  />
                  <RenderRadiobutton
                    title="Savings"
                    name="bankaccounttype"
                    value="Savings"
                    selectedoption={formValue?.bankaccounttype}
                  />
                  <ErrorMessage
                    name="bankaccounttype"
                    component="div"
                    className="error text-[red] absolute bottom-[-16px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="International" />
                  <RenderRadiobutton
                    title="Yes"
                    name="international"
                    value="yes"
                    selectedoption={formValue?.international}
                  />
                  <RenderRadiobutton
                    title="No"
                    name="international"
                    value="no"
                    selectedoption={formValue?.international}
                  />
                  <ErrorMessage
                    name="international"
                    component="div"
                    className="error text-[red] absolute bottom-[-16px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="Account Number" />
                  <InputFields name="accountnumber" placeholder="000123456" />
                  <ErrorMessage
                    name="accountnumber"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="Routing  Number" />
                  <InputFields name="routingnumber" placeholder="000123456" />
                  <ErrorMessage
                    name="routingnumber"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="name of business" />
                  <InputFields name="nameofbusiness" placeholder="Nike" />
                  <ErrorMessage
                    name="nameofbusiness"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="first name" />
                  <InputFields name="firstname" placeholder="Zach" />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="last name" />
                  <InputFields name="lastname" placeholder="Walsh" />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="Currency" />
                  <InputFields2 name="currency" placehoder="USD-US Dollar" />
                  <ErrorMessage
                    name="currency"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="wire number" />
                  <InputFields name="wirenumber" placeholder="000123456" />
                  <ErrorMessage
                    name="wirenumber"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                <div className="relative w-full mt-4">
                  <RadioTitle title="bank name" />
                  <InputFields name="bankname" placeholder="Bank of America" />
                  <ErrorMessage
                    name="bankname"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
                {formValue?.international === "yes" && (
                  <div className="relative w-full mt-4">
                    <RadioTitle title="swift number" />
                    <InputFields name="swiftnumber" placeholder="000123456" />
                    <ErrorMessage
                      name="swiftnumber"
                      component="div"
                      className="error text-[red] absolute bottom-[-20px] left-[4px]"
                    />
                  </div>
                )}

                <div className="relative w-full mt-4">
                  <RadioTitle title="Wire Instructions" />
                  <InputFields
                    name="wireinstructions"
                    placeholder="000123456"
                  />
                  <ErrorMessage
                    name="wireinstructions"
                    component="div"
                    className="error text-[red] absolute bottom-[-20px] left-[4px]"
                  />
                </div>
              </div>
              <AutoSubmitToken setFormValue={setFormValue} />
            </>
            <div className="sticky bottom-0 w-full z-10 rounded-b-lg">
              <div className="border-t border-b rounded-b-lg bg-[#F6F8F9] pl-5 pr-1 pt-5 text-sm lg:text-base">
                <span className="text-gray-600  font-normal poppins-remove leading-normal">
                  By clicking ‘Confirm’ I agree to the
                </span>
                <Link
                  href={"https://www.hifibridge.com/terms"}
                  target="_blank"
                  className="text-violet-500  font-normal poppins-remove underline leading-normal mx-2"
                >
                  term and conditions
                </Link>
                <span className="text-[#4B5563]  font-normal leading-normal">
                  associated with my paying my balances to a domiciled bank
                  account.
                </span>
              </div>

              <div className="flex h-[80px] rounded-b-lg items-center justify-between bg-[#F6F8F9] p-2 lg:p-5">
                <button
                  className="h-8 w-20 text-[#6200EE] border bg-white rounded-md border-[#E5E9EB]"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                {loader ? (
                  <>
                    <Loading2 />
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={
                        !(
                          formValue?.type &&
                          formValue?.accountnumber &&
                          formValue?.bankaccounttype &&
                          formValue?.international &&
                          formValue?.nameofbusiness &&
                          formValue?.firstname &&
                          formValue?.lastname &&
                          formValue?.bankname &&
                          formValue?.swiftnumber &&
                          formValue?.currency
                        )
                      }
                      className={`${
                        formValue?.type &&
                        formValue?.accountnumber &&
                        formValue?.bankaccounttype &&
                        formValue?.international &&
                        formValue?.nameofbusiness &&
                        formValue?.firstname &&
                        formValue?.lastname &&
                        formValue?.bankname &&
                        formValue?.swiftnumber &&
                        formValue?.currency
                          ? "bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] text-stone-50 hover:text-[#6200EE]"
                          : "bg-[#B0BABF] text-[#F9F9F7]"
                      }  flex items-center justify-center gap-3 h-8 px-4 rounded-md`}
                    >
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
  );
};

export const RadioTitle = ({ title }: any) => {
  return (
    <div
      className={`self-stretch  text-base  uppercase leading-normal tracking-tight mt-[16px] font-medium text-[rgb(17,16,18)]`}
    >
      {title}
    </div>
  );
};

export const RenderRadiobutton = ({
  name,
  value,
  title,
  selectedoption,
}: any) => {
  return (
    <div className="grow shrink basis-0 h-8 p-1 justify-start items-center gap-1 flex mt-[6px]">
      <div className="w-6 h-6 relative">
        <Field
          type="radio"
          className="w-4 h-4 left-[2px] top-[3px] absolute custom-radio"
          name={name}
          value={value}
        />
      </div>
      <label
        className={`grow shrink basis-0 text-base leading-normal ${
          selectedoption === title
            ? "text-[#6200EE] font-semibold"
            : "text-[#4B5563] font-normal"
        }`}
      >
        {title}
      </label>
    </div>
  );
};

export const InputFields = ({ placeholder, name }: any) => {
  return (
    <>
      <div className="self-stretch mt-[6px] mb-[16px] lg:w-full sm:w-[400px] h-[34px] px-2 py-1 bg-white rounded border border-gray-400 ">
        <div className="grow shrink basis-0 h-6 text-gray-800 text-base font-normal leading-normal">
          <Field type="text" placeholder={placeholder} name={name} />
        </div>
      </div>
    </>
  );
};

export const InputFields2 = ({ placeholder, name }: any) => {
  return (
    <>
      <div className="self-stretch mt-[6px] mb-[16px] w-full sm:w-[400px] h-[34px] px-2 py-1 bg-white rounded border border-gray-400 ">
        <div className="grow shrink basis-0 h-6 text-gray-800 text-base font-normal leading-normal">
          <Field type="text" placeholder={placeholder} name={name} readOnly />
        </div>
      </div>
    </>
  );
};

export const Dropdown = () => {
  return (
    <div className="self-stretch mt-[6px] mb-[16px] w-full sm:w-[400px] h-[34px] px-2 py-1 bg-white rounded border border-gray-400 ">
      <div className="grow shrink basis-0 h-6 text-gray-800 text-base font-normal leading-normal">
        <Field
          as="select"
          name="currency"
          id="currency"
          className="bg-white w-full"
        >
          <option value="USD-US Dollar">USD-US Dollar</option>
        </Field>
      </div>
    </div>
  );
};

// function renderInputField(label: string, index: number, placeholder: string) {
//   return (
//     <div
//       key={index}
//       className="self-stretch h-[76px] flex-col justify-start items-start gap-0.5 flex"
//     >
//       <div className="self-stretch text-[#111012] text-base font-medium uppercase leading-normal tracking-tight">
//         {label}
//       </div>
//       <div className="self-stretch h-[50px] py-1 flex-col justify-start items-start flex">
//         <div className="self-stretch h-[34px] px-1.5 pt-1.5 pb-1 bg-white rounded border border-gray-400 ">
//           <div className="grow shrink basis-0 h-6 text-gray-800 text-base font-normal leading-normal">
//             {label === "CURRENCY" ? (
//               <select className="bg-white w-full">
//                 {currencyOptions.map((currencyOption, optionIndex) => (
//                   <option key={optionIndex} value={currencyOption}>
//                     {currencyOption}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input type="text" placeholder={placeholder} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default AddAccountModal;
