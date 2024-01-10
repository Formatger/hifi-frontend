import metamask from "@/components/assets/images/metamask.png";
import coinbase from "@/components/assets/images/coinbase.svg";
import walletconnect from "@/components/assets/images/WalletConnect.svg";
import HifiLogo from "@/components/assets/images/hifiLogo.svg";

export const getWalletIcon = (wallet: any) => {
  switch (wallet) {
    case "MetaMask":
      return metamask;
    case "Coinbase":
      return coinbase;
    case "WalletConnect":
      return walletconnect;
    case "HIFIPay":
      return HifiLogo;
  }
};
