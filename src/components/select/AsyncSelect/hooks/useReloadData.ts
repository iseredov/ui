import { useCallback, useState } from 'react';

export const useReloadData = (): [boolean, () => void] => {
  const [needReloadData, setNeedReloadData] = useState(false);

  const reloadData = useCallback(() => {
    setNeedReloadData(true);
    setNeedReloadData(false);
  }, []);

  return [needReloadData, reloadData];
};
