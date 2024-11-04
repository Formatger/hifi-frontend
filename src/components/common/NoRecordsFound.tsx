import React from 'react';

type MessageKey = 'default' | 'search' | 'bank' | 'team';

interface NoRecordsFoundProps {
  messageKey: MessageKey;
}

const messages: Record<MessageKey, string> = {
  default: "No records found",
  search: "There are no records matching your search criteria in the table.",
  bank: 'Please add a bank account first.',
  team: 'Please add a team member first.'
};

const NoRecordsFound: React.FC<NoRecordsFoundProps> = ({ messageKey }) => {
  const message = messages[messageKey];
  
  return (
    <div className="no-records-wrap">
      <div className="h7">
        No Records Found
      </div>
      <div className="m-4">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default NoRecordsFound;
