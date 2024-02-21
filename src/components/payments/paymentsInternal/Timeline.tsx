import exporticon from "../../assets/images/Export.svg";
import Image from "next/image";
import checkcircle from "../../assets/images/CheckCircleLightGreen.svg";
import cardholder from "../../assets/images/Cardholder.svg";
import { formatDate } from "./Payment";
import clockclockwise from "../../assets/images/ClockClockwise.svg";
import moment from "moment";

interface TimelineProps {
  paymentSucceededDate: string;
  paymentStartedDate: string;
}

const Timeline = ({ timelineDetails }: { timelineDetails: TimelineProps }) => {
  return (
    <div>
      <div className="section-title">
        <h4>
          Timeline
        </h4>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-3 items-start py-2">
          <div className="flex flex-col items-center">
            <Image src={checkcircle} alt="" className="mt-1" />
            <div className="w-px h-6 bg-[#E5E9EB]"></div>
          </div>
          <div className="flex flex-col">
            <div className="text-[#4B5563] text-remove  font-remove poppins-remove ">
              Payment Succeeded
            </div>
            <div className="text-[#4B5563] text-sm  font-remove poppins-remove ">
              {moment(timelineDetails?.paymentSucceededDate).format(
                "MMM DD, YYYY h:mm A"
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-start py-2">
          <div className="flex flex-col items-center">
            <Image src={cardholder} alt="" className="mt-1" />
            <div className="w-px h-6 bg-[#E5E9EB]"></div>
          </div>{" "}
          <div className="flex flex-col">
            <div className="text-[#4B5563] text-remove  font-remove poppins-remove ">
              Payment Initiated
            </div>
            <div className="text-[#4B5563] text-sm  font-remove poppins-remove ">
              {moment(timelineDetails?.paymentStartedDate).format(
                "MMM DD, YYYY h:mm A"
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px bg-black w-full" />
    </div>
  );
};

export default Timeline;
