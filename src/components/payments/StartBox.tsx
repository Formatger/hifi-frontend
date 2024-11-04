import React from "react";
import CaretRight from "../assets/images/CaretRight.svg";
import Image from "next/image";
import Settings from "../assets/images/settings.svg";

const StartBox = () => {
  return (
    

<div className="starting-box">
<div className="img-wrap">
    <Image src={Settings} alt="Icon" width={30} height={30} />
    </div>
    <div>
      <p className="bold blue-text">
      Create your first API Key
    </p>
    <p className="text-s-thin">
      Get started by generating the API keys for your store checkout.
    </p>
    </div>

<div className="button-wrap">
  <button
    className="sec-button blue"
    type="button"
    onClick={() => window.location.href = 'mailto:compliance@hifibridge.com?subject=Subject Here&body=Body Content Here'}
    >            
    <span>Generate API Key</span>
  </button>
</div>

</div>
  );
};

export default StartBox;
