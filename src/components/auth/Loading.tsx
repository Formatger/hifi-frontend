import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({}) => {
  return (
    <button disabled={true} className={"app-button"}>
      <div className="button-loader">
        <TailSpin
          height="20"
          width="20"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </button>
  );
};


export const Loading2 = ({}) => {
  return (
    <button
      disabled={true}
      className={`w-[117px] h-[32px]  bg-[#B0BABF] rounded-md flex flex-col justify-start items-center`}
    >
      <div className="self-stretch mt-[5px] justify-center items-center gap-2 inline-flex">
        <TailSpin
          height="20"
          width="20"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </button>
  );
};

export const Loading3 = ({}) => {
  return (
    <button
      disabled={true}
      className={`w-[98px] h-[32px]  bg-[#B0BABF] rounded-md flex flex-col justify-start items-center`}
    >
      <div className="self-stretch mt-[5px] justify-center items-center gap-2 inline-flex">
        <TailSpin
          height="20"
          width="20"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </button>
  );
};

export const Loading4 = ({}) => {
  return (
    <button
      disabled={true}
      className={`h-8 w-[100px] bg-[#B0BABF] rounded-md flex flex-col justify-start items-center`}
    >
      <div className="self-stretch mt-[5px] justify-center items-center gap-2 inline-flex">
        <TailSpin
          height="20"
          width="20"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </button>
  );
};

export default Loading;
