import React from 'react';

const NoRecordsFound = () => {
  return (
    <div className="no-records-wrap">
      <div className="h7">
        No Records Found
      </div>
      <div className="m-4">
        There are no records matching your search criteria in the table.
      </div>
    </div>
  );
}

export default NoRecordsFound;
