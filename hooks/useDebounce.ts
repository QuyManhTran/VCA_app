import { useState, useEffect } from "react";
const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);
  if (value === "") {
    delay = 0;
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value]);
  return debounce;
};
export default useDebounce;
