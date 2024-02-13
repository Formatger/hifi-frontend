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
        <h1 className="text-[#111012] text-xl font-semibold poppins-remove leading-loose">
          Risk Insights
        </h1>
      </div>
      <hr className="h-px bg-black w-full mt-0 mb-4" />
      <div className="text-gray-500 poppins-remove flex flex-col leading-normal gap-4">
        <p className="text-[#111012] text-remove  font-remove poppins-remove leading-normal">
          LATEST ACTIVITY
        </p>
        <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
          Payment Intent Status:
          <span className="ml-4 text-gray-800 text-remove  font-remove poppins-remove leading-normal">
            {payment_status}
          </span>
        </p>
      </div>
      <hr className="h-px bg-black w-full mt-4 " />
    </div>
  );
};

export default RiskInsights;
