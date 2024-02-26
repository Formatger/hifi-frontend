import Link from "next/link";
import React from "react";

const WalletAddress = ({ walletaddress }: { walletaddress: string }) => {
  return (
    <div className="flex flex-col w-[230px]  justify-center lg:px-5 lg:border-r">
      <p className="text-[#4B5563]">
        Wallet Address
      </p>
      <Link
        href={`https://goerli.etherscan.io/address/${walletaddress}`}
        target="_blank"
        className="blue-text underline w-[200px] truncate"
      >
        {walletaddress}
      </Link>
    </div>
  );
};

export default WalletAddress;
