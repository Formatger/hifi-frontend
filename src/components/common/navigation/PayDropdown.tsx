import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from "@/components/assets/svg/Arrow";
import Payments from "@/components/assets/images/payments.svg";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { toggleNavSidebar, setNavSidebarOpen } from "@/store/slice/uiSlice";
import { RootState } from "@/store/store";

export const PayDropdown = () => {
  const dispatch = useDispatch();
  const [localDropDownOpen, setLocalDropDownOpen] = useState(false);
  const globalDropDownOpen = useSelector((state: RootState) => state.ui.navSidebarOpen);
  const router = useRouter();

  const pathnames = [
    "/dashboard/payments",
    "/dashboard/customer",
    "/dashboard/my-account/apikeys",
  ];

  useEffect(() => {
    // When user navigates to a pathname that should keep the dropdown open, sync with global state
    if (pathnames.includes(router.pathname)) {
      if (!globalDropDownOpen) dispatch(setNavSidebarOpen(true));
      if (!localDropDownOpen) setLocalDropDownOpen(true);
    } else {
      // Close the dropdown when navigating away
      // setLocalDropDownOpen(false);
    }
  }, [router.pathname, globalDropDownOpen, dispatch]);

  const handleToggleDropdown = () => {
    const newOpenState = true;
  
      router.push('/dashboard/payments');
      
    setLocalDropDownOpen(newOpenState);
    dispatch(setNavSidebarOpen(newOpenState));
  };
  

  return (
      <div className={`dropdown ${localDropDownOpen ? 'open' : ''}`}>
        
        <button
          onClick={handleToggleDropdown}
          className={
            `navlink-wrap drop-navlink 
            ${localDropDownOpen ? 'active-link' : ''}`
          }
        >
          <div className='row-wrap'>
            <Image src={Payments} alt="Icon" width={20} height={20} />
            HIFI Pay
          </div>
          <Arrow className={`${localDropDownOpen ? 'arrow-active' : ''}`}/>
        </button>

        {localDropDownOpen && (
        <div className="dropdown-menu">
          <div className='drop-line'></div>
          <div>
            {pathnames.map((path, nav) => (
              <Link key={nav} href={path}
                className={`droplink-wrap ${router.pathname === path ? "drop-active-link" : ""}`}>
                  <div>{['Payments', 'Customers', 'API Keys'][nav]}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PayDropdown;