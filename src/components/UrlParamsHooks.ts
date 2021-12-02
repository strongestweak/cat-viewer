import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const useURLParams = (): Record<string, any> => {
  let [searchParams] = useSearchParams();
  const params = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);
  return params;
};

export default useURLParams;
