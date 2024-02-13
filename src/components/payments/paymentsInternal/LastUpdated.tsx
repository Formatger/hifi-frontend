import moment from "moment";
import { formatDate } from "./Payment";

const LastUpdated = ({ lastUpdated }: { lastUpdated: string }) => {
  return (
    <div className="flex flex-col  justify-center  lg:pl-0 lg:pr-5 lg:border-r">
      <p className="text-[#4B5563] text-remove  font-remove poppins-remove">
        Last Updated
      </p>
      <p className="text-[#252C32]">
        {moment(lastUpdated).format("MMM DD, YYYY h:mm A")}
      </p>
    </div>
  );
};

export default LastUpdated;
