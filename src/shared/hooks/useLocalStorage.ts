import { useState, useEffect } from "react";

export default function useLocalStorage<T = string>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue };
}
