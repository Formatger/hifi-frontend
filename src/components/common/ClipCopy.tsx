import React from "react";
import Image from "next/image";
import CopyIcon from "../../components/assets/images/copy-icon.svg";
import { toast } from "react-toastify";

interface ClipCopyProps {
  textToCopy: string;
  onCopyMessage?: string;
}

const ClipCopy: React.FC<ClipCopyProps> = ({
  textToCopy,
  onCopyMessage = "Text copied to clipboard!",
}) => {
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);

      toast.success(onCopyMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    } catch (err) {
      toast.error("Failed to copy: ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      });
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button className="" onClick={handleCopyClick}>
      <Image src={CopyIcon} alt="Copy" width={16} height={16} />
    </button>
  );
};

export default ClipCopy;
