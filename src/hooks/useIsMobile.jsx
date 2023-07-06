/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';



const useIsMobile = (breakpoint = 640) => {
  const checkForDevice = () => window.innerWidth < breakpoint;
  const checkForScale = () => window.innerWidth == 800 && window.innerHeight==527

  const [isMobile, setIsMobile] = useState(checkForDevice());
  const [isBizerba, setIsBizerba] = useState(checkForScale());

  useEffect(() => {
    const handlePageResized = () => {
      setIsMobile(checkForDevice());
      setIsBizerba(checkForScale());

    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handlePageResized);
      window.addEventListener('orientationchange', handlePageResized);
      window.addEventListener('load', handlePageResized);
      window.addEventListener('reload', handlePageResized);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handlePageResized);
        window.removeEventListener('orientationchange', handlePageResized);
        window.removeEventListener('load', handlePageResized);
        window.removeEventListener('reload', handlePageResized);
      }
    };
  }, []);

  return {
    isMobile,isBizerba
  };
};

export default useIsMobile;