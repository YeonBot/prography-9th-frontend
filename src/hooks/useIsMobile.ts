import { useEffect, useState } from "react";

const isMobileDevice = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  window.innerWidth < 768;

export const useIsMobile = () => {
  const initialIsMobile = isMobileDevice();
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
