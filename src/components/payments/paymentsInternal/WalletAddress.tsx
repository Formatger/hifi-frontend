import Link from "next/link";
import React from "react";

const WalletAddress = ({ walletaddress }: { walletaddress: string }) => {
  return (
    <div className="flex flex-col w-[230px]  justify-center lg:px-5 lg:border-r">
      <p className="text-[#4B5563] text-base font-normal text-poppins">
        Wallet Address
      </p>
      <Link
        href={`https://goerli.etherscan.io/address/${walletaddress}`}
        target="_blank"
        className="text-[#6200EE] underline w-[200px] truncate"
      >
        {walletaddress}
      </Link>
    </div>
  );
};

export default WalletAddress;
