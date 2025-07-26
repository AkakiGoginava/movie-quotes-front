import { useEffect, useState } from 'react';

const useInfoField = () => {
  const [promptOpen, setPromptOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return { promptOpen, setPromptOpen, isMobile };
};

export default useInfoField;
