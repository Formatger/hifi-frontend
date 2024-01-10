import Image from "next/image";
import pencilsimple from "../../assets/images/PencilSimple.svg";
import { formatDate } from "./Payment";

interface RiskinsightsProps {
  payment_status: string;
}
const RiskInsights = ({ payment_status }: RiskinsightsProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[#111012] text-xl font-semibold text-poppins leading-loose">
          Risk Insights
        </h1>
      </div>
      <hr className="h-px bg-black w-full mt-0 mb-4" />
      <div className="text-gray-500 text-poppins flex flex-col leading-normal gap-4">
        <p className="text-[#111012] text-base font-normal text-poppins leading-normal">
          LATEST ACTIVITY
        </p>
        <p className="text-[#4B5563] text-base font-normal text-poppins leading-normal">
          Payment Intent Status:
          <span className="ml-4 text-gray-800 text-base font-normal text-poppins leading-normal">
            {payment_status}
          </span>
        </p>
      </div>
      <hr className="h-px bg-black w-full mt-4 " />
    </div>
  );
};

export default RiskInsights;
