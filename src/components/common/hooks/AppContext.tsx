// import React, { createContext, useState, useContext, useEffect } from 'react';

// interface AppContextProps {
//   toggleNavSidebar: () => void;
//   getNavSidebarOpen: () => boolean;
//   setNavSidebarOpen: (value: boolean) => void;
//   children: React.ReactNode;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export const AppProvider = ({ children }: { children: React.ReactNode }) => {
//   const [navSidebarOpen, setNavSidebarOpen] = useState(false);

//   const toggleNavSidebar = () => {
//     setNavSidebarOpen(prevState => !prevState);
//   };

//   const getNavSidebarOpen = () => { return navSidebarOpen }

//   const value = {
//     getNavSidebarOpen,
//     toggleNavSidebar,
//     setNavSidebarOpen,
//     children
//   };


//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );

// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error('useAppContext must be used within a UserProvider');
//   }
//   return context;
// };