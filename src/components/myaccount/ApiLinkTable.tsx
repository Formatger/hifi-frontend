import React, { useEffect, useState } from "react";
import moment from "moment";

interface ApiLinkTable {
  apiLink: string;
}

interface ApiLinkTableProps {
  apiLinkData: ApiLinkTable[];
}

const ApiLinkTable: React.FC<ApiLinkTableProps> = ({ apiLinkData }) => {
  const [apiLink, setApiLink] = useState<any>("");

  useEffect(() => {
    setApiLink(localStorage.getItem("apiLink"));
  }, []);

  return (
    <div className="scroll-wrap">
      <table className="Table" >
        <thead className="table-head">
          <tr className="table-row">
            <th className="th-title">LINK URLs</th>
          </tr>
        </thead>
        <tbody>
          {apiLinkData.map((item, index) => (
            <tr
              key={index}
              className="table-row wide"
            >
              <td className="table-col">
                <div className="table-cell">
                  <p className="">
                    <div className="">
                      <div className="flex gap-3 items-center">
                        {item?.apiLink}
                      </div>
                    </div>
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiLinkTable;
