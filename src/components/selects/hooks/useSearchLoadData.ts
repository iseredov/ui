import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import { useLoadData } from './useLoadData';

import { IBaseOptionType } from '../types';

export interface ILoadOptionParams {
  search: string;
  page: number;
  perPage: number;
}

export interface ILoadOptionsData<Option> {
  options: Option[];
  total: number;
  page: number;
  isNext?: boolean;
}

interface ILazySearchParams<Option> {
  loadOptions: (
    loadOptionsParams: ILoadOptionParams
  ) => Promise<ILoadOptionsData<Option>>;
  searchValue?: string;
  debounceTime?: number;
}

interface ILazyScrollSearchData<Option> {
  options: Option[];
  isLoading: boolean;
  hasUnloadedOptions: boolean;
  total: number;
  reloadData: () => void;
  loadMoreOptions: () => void;
}

export const useSearchLoadData = <Option extends IBaseOptionType>({
  loadOptions,
  searchValue = '',
  debounceTime = 500,
}: ILazySearchParams<Option>): ILazyScrollSearchData<Option> => {
  const { data, isLoading, patchedLoadData } = useLoadData(loadOptions);

  const [page, setPage] = useState(1);
  const [options, setResultOptions] = useState<Option[]>([]);

  const debounceLoadDataOnChangeSearch = useMemo(
    () => debounce(patchedLoadData, debounceTime),
    [debounceTime, patchedLoadData]
  );

  const loadData = useCallback(() => {
    debounceLoadDataOnChangeSearch({ search: searchValue, page, perPage: 20 });
  }, [searchValue, page, debounceLoadDataOnChangeSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (data) {
      const { page, options } = data;
      setResultOptions(resultOptions =>
        page === 1 ? options : [...resultOptions, ...options]
      );
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const loadMoreOptions = useCallback(() => {
    if (data && data.isNext && !isLoading) {
      setPage(page => page + 1);
    }
  }, [data, isLoading]);

  return {
    options,
    isLoading,
    hasUnloadedOptions: get(data, 'isNext', false),
    total: get(data, 'total', 0),
    loadMoreOptions,
    reloadData: loadData,
  };
};
