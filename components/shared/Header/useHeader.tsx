import { useState } from 'react';

export const useHeader = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return { loginOpen, setLoginOpen };
};
