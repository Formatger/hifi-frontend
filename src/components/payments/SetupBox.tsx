import React from "react";
import CaretRight from "../assets/images/CaretRight.svg";
import Image from "next/image";
import Checkbox from "../assets/images/CheckCircleBlue.svg";

const SetupBox = () => {
  return (
    
    <div className="setup-box">
<div className="row-wrap-2">
  <div>
    <Image src={Checkbox} alt="Icon" width={30} height={30} />
  </div>
  <div>
    <p className="bold blue-text">
      Learn how to setup your checkout
    </p>
    <p className="text-s-thin">
      Get started by generating the API keys for your store checkout.
    </p>
  </div>
</div>

<div className="button-wrap">
  <button
    className="sec-button blue"
    type="button"
    onClick={undefined}
    >            
    <span>Get Started</span>
  </button>
</div>

</div>
  );
};

export default SetupBox;
