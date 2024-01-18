import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import Modal from "./Modal";

const ScanQr = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [QrCode, setQrCode] = useState<any>("");

  useEffect(() => {
    setQrCode(localStorage.getItem("qr_code"));
  }, []);

  const user = useSelector((state: RootState) => state.user);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        onClick={openModal}
        className="poppins-remove cursor-pointer text-center text-[#6200EE] font-normal underline"
      >
        Scan QR
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="mt-2">
          <div className="flex items-center justify-center flex-col">
            <div className="mb-4">
              Scan this QR to generate authenticator code
            </div>
            <QRCode value={user.user?.qr_code ? user.user?.qr_code : QrCode} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScanQr;
