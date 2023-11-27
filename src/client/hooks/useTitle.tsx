import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = title;
    return () => {
      document.title = oldTitle;
    };
  }, [title]);
};
export default useTitle;
