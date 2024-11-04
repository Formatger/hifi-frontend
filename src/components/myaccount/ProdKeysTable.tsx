import React, { useEffect, useState } from "react";
import moment from "moment";

interface ProdKeysTable {
  name: string;
  created_at: string;
  api_key_id: string;
}

interface ProdKeysTableProps {
  apiKeyData?: ProdKeysTable[];
}

const maskApiKey = (apiKey: string) => {
  if (apiKey.length <= 4) {
    return apiKey;
  }
  const visiblePart = apiKey.slice(-4);
  const maskedPart = "*".repeat(apiKey.length - 4);

  return `${visiblePart}${maskedPart}`;
};

const ProdKeysTable: React.FC<ProdKeysTableProps> = ({ apiKeyData = [] }) => {
  return (
    <div className="scroll-wrap">
      <table className="Table">
        <thead>
          <tr className="table-head">
            <th className="th-title">Name</th>
            <th className="th-title">Created Date</th>
            <th className="th-title">ID</th>
          </tr>
        </thead>
        <tbody>
          {apiKeyData.length > 0 ? (
            apiKeyData.map((item) => (
              <tr key={item.api_key_id} className="table-row wide">
                <td className="table-col apiName">
                  <div className="table-cell">{item.name}</div>
                </td>
                <td className="table-col apiDate">
                  <div className="table-cell">
                    {moment(item.created_at).format("LL, LTS")}
                  </div>
                </td>
                <td className="table-col apiId">
                  <div className="table-cell">
                    {/* FIXME:  */}
                    {item.api_key_id}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No API Keys Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProdKeysTable;
