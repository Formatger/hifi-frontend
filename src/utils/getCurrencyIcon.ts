import dollar from "@/components/assets/images/dollar.png";

export const getCurrencyIcon = (wallet: string) => {
  const currencies = [
    {
      currency: "avax",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/avalanche-avax-logo.png",
    },
    {
      currency: "zrx",
      logoUrl: "https://hifibridgedocs.s3.amazonaws.com/0x-zrx-logo.png",
    },
    {
      currency: "near",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/near-protocol-near-logo.png",
    },
    {
      currency: "usdc",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/Circle_USDC_Logo.svg.png",
    },
    {
      currency: "link",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/chainlink-link-logo.png",
    },
    {
      currency: "yfi",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/yearn-finance-yfi-logo.png",
    },
    {
      currency: "btc",
      logoUrl: "https://hifibridgedocs.s3.amazonaws.com/bitcoin.png",
    },
    {
      currency: "bat",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/1200px-Brave_Basic_Attention_Token_(BAT)_Logo.svg.png",
    },
    {
      currency: "eth",
      logoUrl: "https://hifibridgedocs.s3.amazonaws.com/ethereum-eth-logo.png",
    },
    {
      currency: "usdt",
      logoUrl: "https://hifibridgedocs.s3.amazonaws.com/tether-usdt-logo.png",
    },
    {
      currency: "sol",
      logoUrl: "https://hifibridgedocs.s3.amazonaws.com/solana-sol-logo.png",
    },
    {
      currency: "uni",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/1026px-Uniswap_Logo.svg.png",
    },
    {
      currency: "sushi",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/sushiswap-sushi-logo.png",
    },
    {
      currency: "usd",
      logoUrl:
        "https://hifibridgedocs.s3.amazonaws.com/Circle_USDC_Logo.svg.png",
    },
  ];

  const currency = currencies.find((c) => c.currency === wallet);

  return currency ? currency.logoUrl : "";
};
