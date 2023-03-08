import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

const usePageRedirect = (url) => {
  const router = useRouter();

  useEffect(() => {
    void router.prefetch(url);
  }, [router, url]);

  return useCallback(() => {
    void router.push(url);
  }, [router, url]);
};

export default usePageRedirect;
