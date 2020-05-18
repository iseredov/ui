import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

interface TLoadDataResult<Data, LoadingParams, Error> {
  data: Data | null;
  error: Error | null;
  isLoading: boolean;
  patchedLoadData: (params: LoadingParams) => void;
}

export const useLoadData = <Data, LoadingParams, Error>(
  loadData: (params: LoadingParams) => Promise<Data>,
  debounceTime = 0
): TLoadDataResult<Data, LoadingParams, Error> => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMountRef = useRef(true);

  const cancelableLoadData = useCallback(
    (loadingParams: LoadingParams) => {
      if (!isMountRef.current) {
        return;
      }

      setLoading(true);

      loadData(loadingParams)
        .then(data => {
          if (isMountRef.current) {
            setLoading(false);
            setData(data);
          }
        })
        .catch((error: Error) => {
          if (isMountRef.current) {
            console.error(error);
            setLoading(false);
            setError(error);
          }
        });
    },
    [loadData]
  );

  useEffect(() => {
    return () => {
      isMountRef.current = false;
    };
  }, []);

  const debouncedLoadData = useMemo(
    () => debounce(cancelableLoadData, debounceTime),
    [cancelableLoadData, debounceTime]
  );

  return {
    data,
    isLoading,
    error,
    patchedLoadData: debouncedLoadData,
  };
};
