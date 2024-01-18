import Image from "next/image";
import pencilsimple from "../../assets/images/PencilSimple.svg";
import { formatDate } from "./Payment";

interface MetadataProps {
  metadata: string;
}
const Metadata = ({ metadata }: MetadataProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[#111012] text-xl font-semibold poppins-remove leading-loose">
          Metadata
        </h1>
        <button className="flex text-indigo-900 bg-stone-50 items-center gap-3 rounded-md border border-gray-200 w-[170px] justify-center h-8  ">
          <Image src={pencilsimple} alt="export" />
          <span>Edit metadata </span>
        </button>
      </div>
      <hr className="h-px bg-black w-full" />
      <div className="text-gray-500 poppins-remove leading-normal mt-5">
        {metadata}
      </div>
    </div>
  );
};

export default Metadata;
