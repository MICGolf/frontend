import { useState } from 'react';

/**
 * 로컬 스토리지(localStorage)와 React 상태를 연결하는 커스텀 훅.
 * @param key 로컬 스토리지에 값을 저장하거나 불러올 때 사용할 키
 * @param initialValue 로컬 스토리지에 값이 없을 때 사용할 초기 값
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; // item에 값이 존재하면 JSON으로 파싱, 없으면 초기값을 사용
    } catch (error) {
      console.error(`로컬 스토리지 키 "${key}"를 읽는 중 오류 발생: `, error);
      return initialValue; // 에러 메세지 출력 후, 안전하게 초기 값 반환
    }
  });

  /**
   * 상태와 로컬 스토리지 값을 동시에 업데이트하는 함수.
   * @param value 새로운 값 또는 함수형 업데이트로 기존 값을 기반으로 계산된 값
   */
  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}": `, error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
