import { renderHook } from '@testing-library/react-hooks';

import { useSearchLoadData } from './useSearchLoadData';

describe('useSearchLoadData', () => {
  it('Проверка корректности начальной загрузки опций', async () => {
    const testOptions = [{ id: 1, name: 'test_1' }];
    const loadOptions = jest.fn(async () => {
      return Promise.resolve({
        options: testOptions,
        total: 100,
        page: 1,
        isNext: true,
      });
    });
    const searchValue = 'test';

    const testLoadData = {
      loadOptions,
      searchValue,
      debounceTime: 0,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      // @ts-ignore
      useSearchLoadData(testLoadData)
    );

    expect(result.current.options).toStrictEqual([]);
    expect(result.current.hasUnloadedOptions).toBe(false);
    expect(result.current.total).toBe(0);
    expect(result.current.isLoading).toBe(false);

    expect(result.current.options).toStrictEqual([]);
    expect(result.current.hasUnloadedOptions).toBe(false);
    expect(result.current.total).toBe(0);
    expect(result.current.isLoading).toBe(false);

    await waitForNextUpdate();

    expect(loadOptions.mock.calls.length).toBe(1);

    // @ts-ignore
    expect(loadOptions.mock.calls[0][0]).toStrictEqual({
      page: 1,
      perPage: 20,
      search: 'test',
    });

    expect(result.current.options).toStrictEqual(testOptions);
    expect(result.current.hasUnloadedOptions).toBe(true);
    expect(result.current.total).toBe(100);
    expect(result.current.isLoading).toBe(false);
  });

  it('Проверка перезагрузки опций при изменении поискового слова', async () => {
    const testOptions = [{ id: 1, name: 'test_1' }];
    const loadOptions = jest.fn(async () => {
      return Promise.resolve({
        options: testOptions,
        total: 100,
        page: 1,
        isNext: true,
      });
    });
    const searchValue = 'test';

    const testLoadData = {
      loadOptions,
      searchValue,
      debounceTime: 0,
    };

    const { waitForNextUpdate } = renderHook(() =>
      // @ts-ignore
      useSearchLoadData(testLoadData)
    );

    testLoadData.searchValue = 'change search';
    await waitForNextUpdate();

    expect(loadOptions.mock.calls.length).toBe(1);
    // @ts-ignore
    expect(loadOptions.mock.calls[0][0].page).toBe(1);
    // @ts-ignore
    expect(loadOptions.mock.calls[0][0].search).toBe('test');

    await waitForNextUpdate();

    // @ts-ignore
    expect(loadOptions.mock.calls.length).toBe(2);
    // @ts-ignore
    expect(loadOptions.mock.calls[1][0].page).toBe(1);
    // @ts-ignore
    expect(loadOptions.mock.calls[1][0].search).toBe('change search');
  });

  it('Проверка корректности дозагрузки опций', async () => {
    const loadOptions = jest.fn(async ({ page }) => {
      if (page === 1) {
        return Promise.resolve({
          options: [{ id: 1, name: 'test_1' }],
          total: 2,
          page: 1,
          isNext: true,
        });
      }

      return Promise.resolve({
        options: [{ id: 2, name: 'test_2' }],
        total: 2,
        page: 2,
        isNext: false,
      });
    });
    const searchValue = 'test';

    const testLoadData = {
      loadOptions,
      searchValue,
      debounceTime: 0,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      // @ts-ignore
      useSearchLoadData(testLoadData)
    );

    await waitForNextUpdate();
    result.current.loadMoreOptions();

    await waitForNextUpdate();

    expect(result.current.options).toStrictEqual([
      { id: 1, name: 'test_1' },
      { id: 2, name: 'test_2' },
    ]);
    expect(loadOptions.mock.calls.length).toBe(2);
    expect(loadOptions.mock.calls[1][0].page).toBe(2);
  });
});
