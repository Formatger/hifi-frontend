import Image from "next/image";
import checkcircle from "../../assets/images/CheckCircleGreen.svg";
import cardholder from "../../assets/images/pay.svg";
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
      <div className="column-wrap">
        
        <div className="timeline-item-wrap">
          <div className="timeline-img">
            <Image src={checkcircle} alt="" className="" />
            <div className="time-line"></div>
          </div>
          <div className="column-wrap">
            <div className="text-s-grey">
              Payment Succeeded
            </div>
            <div className="text-small">
              {moment(timelineDetails?.paymentSucceededDate).format(
                "MMM DD, YYYY h:mm A"
              )}
            </div>
          </div>
        </div>

        <div className="timeline-item-wrap">
          <div className="timeline-img">
            <Image src={cardholder} alt="" className="mt-1" />
            <div className="time-line"></div>
          </div>
          <div className="column-wrap">
            <div className="text-s-grey">
              Payment Initiated
            </div>
            <div className="text-small">
              {moment(timelineDetails?.paymentStartedDate).format(
                "MMM DD, YYYY h:mm A"
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Timeline;
