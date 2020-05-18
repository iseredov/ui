import { renderHook } from '@testing-library/react-hooks';

import { useLoadData } from '.';

describe('useLoadData', () => {
  it('Проверка корректности работы debounce', async () => {
    const testLoadData = jest.fn(() => Promise.resolve([]));

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoadData(testLoadData)
    );

    for (let i = 0; i < 10; i++) {
      result.current.patchedLoadData({});
    }

    expect(testLoadData.mock.calls.length).toBe(0);

    await waitForNextUpdate();
    expect(testLoadData.mock.calls.length).toBe(1);

    result.current.patchedLoadData({});
    await waitForNextUpdate();

    expect(testLoadData.mock.calls.length).toBe(2);
  });

  it('Проверка корректности загрузки данных', async () => {
    const testOptions = ['test_1', 'test_2'];
    const testLoadData = jest.fn(() => {
      return Promise.resolve(testOptions);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoadData(testLoadData)
    );

    result.current.patchedLoadData({});
    expect(result.current.data).toBe(null);

    await waitForNextUpdate();
    expect(result.current.data).toBe(testOptions);
  });

  it('Проверка корректности перехвата ошибки', async () => {
    const customError = { error: true };
    const testLoadData = jest.fn(() => {
      return new Promise((_, rej) => setTimeout(() => rej(customError)));
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoadData(testLoadData)
    );

    result.current.patchedLoadData({});

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(customError);
  });

  it('Проверка корректности отмены загрузки, если размаунт произошел быстрее дебаунса', async () => {
    const testLoadData = jest.fn();

    // $FlowFixMe
    const { result, unmount } = renderHook(() => useLoadData(testLoadData));

    result.current.patchedLoadData({});

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    unmount();

    expect(testLoadData.mock.calls.length).toBe(0);
    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
