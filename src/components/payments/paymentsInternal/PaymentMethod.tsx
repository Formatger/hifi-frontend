import clippathgroup from "@/components/assets/images/Clippathgroup.svg";
import Image from "next/image";
import metamask from "@/components/assets/images/metamask.png";
import coinbase from "@/components/assets/images/coinbase.svg";
import walletconnect from "@/components/assets/images/WalletConnect.svg";
import { getWalletIcon } from "@/utils/getWalletIcon";

const formatWalletName = (wallet: any) => {
  return wallet.replace(/\s/g, "").toLowerCase();
};

const PaymentMethod = ({ payment_method }: { payment_method: string }) => {
  return (
    <div className="flex flex-col  justify-center lg:px-5 lg:border-r">
      <p className="text-[#4B5563]">
        Payment Method
      </p>
      <p className="flex gap-3 text-[#252C32]">
        {/* <Image
          src={getWalletIcon(payment_method)}
          alt="icon"
          className=""
          width={24}
          height={24}
        /> */}
        {payment_method}
        {/* {formatWalletName(payment_method)} */}
      </p>
    </div>
  );
};

export default PaymentMethod;
