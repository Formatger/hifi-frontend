// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface ApiKeysContextType {
//   hasApiKeys: boolean;
//   setHasApiKeys: (hasKeys: boolean) => void;
// }

// const ApiKeysContext = createContext<ApiKeysContextType | undefined>(undefined);

// export function useApiKeys() {
//   const context = useContext(ApiKeysContext);
//   if (context === undefined) {
//     throw new Error('useApiKeys must be used within a ApiKeysProvider');
//   }
//   return context;
// }

// export const ApiKeysProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [hasApiKeys, setHasApiKeys] = useState<boolean>(false);

//   return (
//     <ApiKeysContext.Provider value={{ hasApiKeys, setHasApiKeys }}>
//       {children}
//     </ApiKeysContext.Provider>
//   );
// };
