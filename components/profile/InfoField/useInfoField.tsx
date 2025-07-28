import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useInfoField = () => {
  const [promptOpen, setPromptOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return { promptOpen, setPromptOpen, isMobile };
};

export default useInfoField;
