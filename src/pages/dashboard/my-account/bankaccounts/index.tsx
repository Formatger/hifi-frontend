import Header from "@/components/common/Header";
import Sidebar from "@/components/common/navigation/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import React, { useState, useEffect } from "react";
import plus from "@/components/assets/images/plus-white.svg";
import Image from "next/image";
import bank from "../../../../components/assets/images/Bank.svg";
import info from "@/components/assets/images/Info.svg";
import { number } from "yup";
import pencilsimple from "@/components/assets/images/PencilSimpleBlack.svg";
import AddAccountModal from "@/components/myaccount/AddAccountModal";
import axios from "axios";
import { BiCheck, BiSolidTrashAlt } from "react-icons/bi";
import MainLoader from "@/components/common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";
import Modal from "react-modal";
import x from "@/components/assets/images/XBlack.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NoRecordsFound from "@/components/common/NoRecordsFound";

const items = [
  { label: "Settings", link: "./" },
  { label: "Bank Accounts", link: "/", current: true },
];

interface BankAccount {
  id: string;
  status: string;
  requires_verification: number;
  requires_support: number;
  routing_number: string;
  account_number: string;
  name1: string;
  currency: string;
  type: string;
  bank_name: string;
  ach_enabled: boolean;
  international_bank: boolean;
  ref_id: string;
  wire_withdrawal_fee: number;
}

const BankAccounts = () => {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [bankdata, setBankData] = useState<BankAccount[] | any>();
  const [state, setState] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [amount1, setAmount1] = useState<any>();
  const [amount2, setAmount2] = useState<any>();
  const [bankid, setbankid] = useState<any>();

  const [role, setRole] = useState<any>("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    const apiUrl = baseUrl + `/user/${user_id}/bank`;
    setLoader(true);
    const fetchData = async () => {
      await axios
        .get(apiUrl)
        .then((response) => {
          const data = response?.data?.data;
          setBankData(data);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, [state, isAddAccountModalOpen, baseUrl]);

  const openAddAccountModal = () => {
    setIsAddAccountModalOpen(true);
  };

  const closeAddAccountModal = () => {
    setIsAddAccountModalOpen(false);
  };

  const openEditAccountModal = () => {
    setIsEditAccountModalOpen(true);
  };

  const closeEditAccountModal = () => {
    setIsEditAccountModalOpen(false);
  };

  const deletebank = (id: any) => {
    const user_id = localStorage.getItem("userId");
    axios
      .delete(baseUrl + `/user/${user_id}/bank/${id}`)
      .then((response) => {
        setTimeout(() => {
          setState(!state);
        }, 2000);
        toast.success(`Bank account deleted..!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setState(!state);
        toast.error("Please try again..!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const VerifyBankAccount = (id: any) => {
    setIsOpen(true);
    setbankid(id);
  };

  const verifybankaccount = () => {
    const user_id = localStorage.getItem("userId");
    axios
      .post(baseUrl + `/user/${user_id}/verifybank`)
      .then((response) => {
        setTimeout(() => {
          setState(!state);
        }, 2000);
        closeModal();
        toast.success(`Bank account verification is in progress..!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setState(!state);
        toast.error("Please try again..!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="main-container" id="bank">
        <div className="w-full">
          <Header />
          <div className="fixed-heading">
            <Breadcrumbs items={items} />
          </div>
          <div className="page-container">
            <div>
              <h1 className="h1">Bank Accounts</h1>
              {bankdata?.length > 0 ? (
                <></>
              ) : (
                <>
                  {" "}
                  {/* {role === "0" || role === "1" ? ( */}
                    <div className="section-title">
                      <div></div>
                      <button
                        className="sec-button blue"
                        onClick={openAddAccountModal}
                      >
                        <Image src={plus} alt="plus" className="" />
                        Add Account
                      </button>
                    </div>
                  {/* ) : (
                    <></>
                  )} */}
                </>
              )}

              <div className="w-full overflow-y-scroll overflow-x-auto lg:overflow-hidden">
                {loader ? (
                  <MainLoader />
                ) : (
                  <>
                    {bankdata?.length > 0 ? (
                      <>
                        {" "}
                        <table className="w-full">
                          <thead>
                            <tr className=" text-[#111012] text-left poppins-remove font-semibold border-y border-y-[#E5E9EB] h-14">
                              <th className="py-2 px-4">CURRENCY</th>
                              <th className="py-2 px-4">BANK ACCOUNT</th>
                              <th className="py-2 px-4">
                                <div className="flex items-center gap-2">
                                  {/* <span>PAYOUT FEE</span> */}
                                  {/* <Image src={info} alt="info" className="" /> */}
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {bankdata?.map((account: any, index: any) => (
                              <tr
                                key={index}
                                className="border-b border-b-[#E5E9EB] h-14 poppins-remove text-[#252C32]"
                              >
                                <td className="py-2 px-4">
                                  <div className="flex items-center gap-3">
                                    <span>
                                      {account.currency === "usd"
                                        ? "USD-US DOLLAR"
                                        : account.currency}
                                    </span>
                                    {account.verificationSent === true && (
                                      <span className="small-tag grey">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-2 px-4">
                                  <div className="flex items-center gap-3">
                                    <Image src={bank} alt="" className="" />
                                    <span>{account?.bank_name}</span>
                                    <span>{account?.account_number}</span>
                                    <span>
                                      {account?.verificationSent === true ? (
                                        <>
                                          <BiCheck color="green" size="24px" />
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          {role === "0" || role === "1" ? (
                                            <button
                                              onClick={() =>
                                                VerifyBankAccount(account?.id)
                                              }
                                              className="w-[100px] h-[32px] bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] rounded-md text-white hover:blue-text"
                                            >
                                              Verify
                                            </button>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-2 px-4">
                                  <div className="flex items-center justify-between">
                                    {/* <span>{account?.wire_withdrawal_fee}</span> */}
                                    {role === "0" || role === "1" ? (
                                      <button
                                        className=""
                                        onClick={() => deletebank(account?.id)}
                                      >
                                        {/* <Image src={pencilsimple} alt="edit" className="" /> */}
                                        <BiSolidTrashAlt size="20px" />
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <NoRecordsFound messageKey="bank" />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <AddAccountModal
          isOpen={isAddAccountModalOpen}
          closeModal={closeAddAccountModal}
          isEdit={false}
        />
        <AddAccountModal
          isOpen={isEditAccountModalOpen}
          closeModal={closeEditAccountModal}
          isEdit={true}
        />

        {/* verify modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Account Modal"
          className="w-[90%] sidebarModal relative rounded-lg poppins-remove sm:w-[452px] shadow-xl bg-white max-h-[90vh]"
          overlayClassName="bg-black bg-opacity-60 fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="h-[80px] bg-[#F6F8F9] border-[#E5E9EB] border flex rounded-t-lg items-center justify-center sticky top-0 z-20">
            <button className="" onClick={closeModal}>
              <Image src={x} alt="close" className="top-2 right-2 absolute" />
            </button>
            <h2 className="font-semibold  text-neutral-900 mt-4 poppins-remove text-[23px]">
              Verify Bank Account
            </h2>
          </div>
          <div>
            <div className="relative w-full mt-4 px-4">
              <Title title="Amount 1" />
              <InputFields
                name="amount1"
                placeholder="$ 1"
                onChange={(e: any) => setAmount1(e.target.value)}
              />
            </div>
            <div className="relative w-full mt-4 px-4">
              <Title title="Amount 2" />
              <InputFields
                name="amount2"
                placeholder="$ 1"
                onChange={(e: any) => setAmount2(e.target.value)}
              />
            </div>
            <div className="flex h-[80px] rounded-b-lg items-center justify-between bg-[#F6F8F9] p-2 lg:p-5">
              <button
                className="h-8 w-20 blue-text border bg-white rounded-md border-[#E5E9EB]"
                onClick={closeModal}
              >
                Cancel
              </button>
              {amount1?.length > 0 && amount2?.length > 0 ? (
                <>
                  <button
                    type="submit"
                    onClick={verifybankaccount}
                    className={`
                 
                  bg-[#6200EE] text-stone-50 flex items-center justify-center gap-3 h-8 px-4 rounded-md`}
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    type="submit"
                    onClick={verifybankaccount}
                    disabled={true}
                    className={`
                    bg-[#B0BABF] flex items-center justify-center gap-3 h-8 px-4 rounded-md`}
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const Title = ({ title }: any) => {
  return (
    <div
      className={`self-stretch  text-remove  uppercase leading-normal tracking-tight mt-[16px] font-medium text-[rgb(17,16,18)]`}
    >
      {title}
    </div>
  );
};

const InputFields = ({ placeholder, name, onChange }: any) => {
  return (
    <>
      <div className="self-stretch mt-[6px] mb-[16px] w-full sm:w-[400px] h-[34px] px-2 py-1 bg-white rounded border border-gray-400 inline-flex">
        <div className="grow shrink basis-0 h-6 text-gray-800 text-remove  font-remove leading-normal">
          <input
            type="number"
            placeholder={placeholder}
            name={name}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

const BankAccountsPage = () => {
  return <Sidebar layout={<BankAccounts />} />;
};

export default BankAccountsPage;
