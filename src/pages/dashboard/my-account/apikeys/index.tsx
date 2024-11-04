// hello 

import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/navigation/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import Image from "next/image";
import ApiLinkTable from "@/components/myaccount/ApiLinkTable";
import NewApiKeyModal from "./NewApiKeyModal";
import ProdKeysTable from "@/components/myaccount/ProdKeysTable";
import axios, { AxiosError } from "axios";
import MainLoader from "@/components/common/Loader";
import ClipCopy from "@/components/common/ClipCopy";
import { useDispatch } from "react-redux";
import { setHasApiKeys } from "@/store/slice/apiKeySlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ApiKeyData {
  id: number;
  created_at: string;
  api_key_id: string;
  user_id: null | number;
  description: string;
  api_key_value: null | string;
  deactivated_at: null | string;
  environment: string;
  name: string;
  merchant_id: number;
}

const items = [
  { label: "HIFI Pay", link: "./" },
  { label: "API Keys", link: "/", current: true },
];

const ApiKeys = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [apiKeyData, setApiKeyData] = useState<ProdKeysTable[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const merchantId = localStorage.getItem("merchantId");
    if (userId) {
      fetchApiKeys(userId);
    }
  }, []);

  useEffect(() => {
    const fetchedUserId = localStorage.getItem("userId") || "User ID not found";
    setUserId(fetchedUserId);
  }, []);

  const fetchApiKeys = async (merchantId: string) => {
    setLoader(true);
    try {
      const response = await axios.get(
        // "http://localhost:5001/merchant/api-keys",
        "https://api.hifibridge.com/merchant/api-keys",
        {
          params: { merchantId: merchantId },
        }
      );

      const fetchedData = response.data.data.map((key: ApiKeyData) => ({
        name: key.name,
        created_at: key.created_at,
        api_key_id: key.api_key_id,
      }));
      setApiKeyData(fetchedData);
    } catch (error) {
      console.error("Error fetching API keys:", error);
    } finally {
      setLoader(false);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const refreshApiKeys = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchApiKeys(userId);
    }
  };

  return (
    <div className="main-container" id="apikeys">
      <div className="w-full">
        <Header />
        <div className="fixed-heading">
          <Breadcrumbs items={items} />
        </div>
        <div className="page-container">
          <div className="apiheader-wrap">
            <h1 className="h1">Get your API Keys</h1>
            <div className="left-wrap">
              <div className="merchant-id">
                <p className="mb-1">Merchant ID</p>
                <div className="main-input copy-clip text-s-thin">
                  <p className="truncate">{userId}</p>
                  <ClipCopy textToCopy={userId} />
                </div>
              </div>
            </div>
          </div>

          <div className="app-box">
            <div className="box-header">
              <div>
                <h4>Production Keys</h4>
              </div>
              <div className="button-wrap">
                <button
                  className="sec-button blue"
                  type="button"
                  onClick={openModal}
                >
                  {/* <Image src={Plusicon} alt="NewCustomerIcon" /> */}
                  <span>Generate API Key</span>
                </button>
              </div>
            </div>

            <div className="box-content">
              <div>
                <p className="mb-1">Production base URL</p>
                <div className="main-input copy-clip">
                  <p>https://api.hifibridge.com/</p>
                  <ClipCopy textToCopy="https://api.hifibridge.com/" />
                </div>
              </div>
              <div className="flex flex-col mt-5">
                {loader ? (
                  <MainLoader />
                ) : (
                  <ProdKeysTable apiKeyData={apiKeyData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewApiKeyModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onApiKeyCreated={refreshApiKeys}
      />
    </div>
  );
};

const NoVerified = () => {
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="main-container" id="apikeys"> 
      <div className="w-full">
        <Header />
        <div className="fixed-heading">
          <Breadcrumbs items={items} />
        </div>
        <div className="page-container">
          <div className="apiheader-wrap">
            <h1 className="h1">Get your API Keys</h1>
            <div className="left-wrap">
              <div className="merchant-id">
                <p className="mb-1">Merchant ID</p>
                <div className="main-input copy-clip text-s-thin">
                  <p className="truncate">{userId}</p>
                  <ClipCopy textToCopy={userId} />
                </div>
              </div>
            </div>
          </div>

          <div className="app-box">
            <div className="box-header">
              <div>
                <h4>Get your API Keys</h4>
              </div>
              <div className="button-wrap">
                {/* <button
                  className="sec-button blue"
                  type="button"
                  onClick={() => window.location.href = 'mailto:compliance@hifibridge.com?subject=Subject Here&body=Body Content Here'}
                  >            
                  <span>Contact us</span>
                </button> */}
              </div>
            </div>

            <div className="box-content">
              <div>
                <p className="mb-1">Please contact{" "}
                <span className="blue-text">compliance@hifibridge.com </span>
                {" "} to get access to your api keys.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiStart = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isVerified = true;
  
  return isVerified ? <ApiKeys /> : <NoVerified/>;
};

const ApiKeysPage = () => {
  return <Sidebar layout={<ApiKeys />} />;
};

export default ApiKeysPage;
