import { useState, useEffect } from 'react';

export const useHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
