import { useEffect, useState } from "react";

// Define a custom hook to track window size
const useWindowSize = () => {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Function to update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial call to set the window size
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
