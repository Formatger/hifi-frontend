import Image from "next/image";
import checkcircle from "../../assets/images/CheckCircle.svg";
import Link from "next/link";

// interface PaymentMethodDetailsProps {
//   currency_paid: string;
//   currency_received: string;
//   exchange_rate: string;
//   blockchain_record: string;
//   id: string;
//   wallet_address: string;
//   fingerprint: string;
//   type: string;
//   issuer: string;
//   address: string;
//   origin: string;
//   signature_check: string;
// }

const PaymentMethodFull = ({
  paymentMethodDetails,
}: {
  paymentMethodDetails: any;
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="section-title">
      <h4>
        Payment Method
      </h4>
      </div>

      <table className="pay-method-table">
          <tr className="pay-method">
            <td className="first-column">
              <p>Currency Paid</p>
              <p>Currency Received</p>
              <p>Exchange Rate</p>
              <p>Blockchain Record</p>
              <p>Wallet Address</p>
              <p>Type</p>
              <p>Issuer</p>
              {/* <p>Signature Check</p> */}
            </td>
          
            <td className="second-column">
              <p className="uppercase">
                {paymentMethodDetails?.currency_paid}
              </p>
              <p className="uppercase">
                {paymentMethodDetails?.currency_received}
              </p>
              <p className="uppercase">
                {paymentMethodDetails?.exchange_rate}
              </p>
              <Link
                  href={`https://goerli.etherscan.io/tx/${paymentMethodDetails?.txHash}`}
                  target="_blank"
                  className=" text-sm lg:text-remove  font-remove blue-text3 underline poppins-remove "
                >
                  {paymentMethodDetails?.blockchain_record}
              </Link>
              <p className="truncate">
                {paymentMethodDetails?.wallet_address}
                </p>
              <p>
                {paymentMethodDetails?.type}
              </p>
              <p>
              {paymentMethodDetails?.issuer}
                </p>

              {/* <p className="row-wrap">
                {paymentMethodDetails?.signature_check}
                <Image src={checkcircle} alt="check" className="" />
              </p> */}
            </td>
          </tr>
      </table>
      

      {/* <div className="flex flex-col lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Currency Paid
            </p>
            <p className="text-[#252C32] text-sm lg:text-remove  font-remove poppins-remove uppercase">
              {paymentMethodDetails?.currency_paid}
            </p>
          </div>
          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Currency Received
            </p>
            <p className="text-[#252C32] text-sm lg:text-remove  font-remove poppins-remove uppercase">
              {paymentMethodDetails?.currency_received}
            </p>
          </div>
          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Exchange Rate
            </p>
            <p className="text-[#252C32] text-sm lg:text-remove  font-remove poppins-remove uppercase">
              {paymentMethodDetails?.exchange_rate}
            </p>
          </div>
          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Blockchain Record
            </p>
            <Link
              href={`https://goerli.etherscan.io/tx/${paymentMethodDetails?.txHash}`}
              target="_blank"
              className=" text-sm lg:text-remove  font-remove blue-text3 underline poppins-remove "
            >
              {paymentMethodDetails?.blockchain_record}
            </Link>
          </div>

          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Wallet Address
            </p>
            <p className="text-[#252C32] w-28 lg:w-auto text-sm lg:text-remove  font-remove poppins-remove truncate">
              {paymentMethodDetails?.wallet_address}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Type
            </p>
            <p className="text-[#252C32] text-sm lg:text-remove  font-remove poppins-remove">
              {paymentMethodDetails?.type}
            </p>
          </div>
          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Issuer
            </p>
            <p className="text-[#252C32] text-sm lg:text-remove  font-remove poppins-remove ">
              {paymentMethodDetails?.issuer}
            </p>
          </div>



          <div className="flex gap-3 lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-remove  font-remove poppins-remove w-36">
              Signature Check
            </p>
            <p className="text-[#252C32] flex items-center gap-3 text-sm lg:text-remove  font-remove poppins-remove ">
              {paymentMethodDetails?.signature_check}
              <Image src={checkcircle} alt="check" className="" />
            </p>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default PaymentMethodFull;
