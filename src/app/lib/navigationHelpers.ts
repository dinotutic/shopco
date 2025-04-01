"use client";

import { useRouter } from "next/navigation";

const useHandleNavigation = () => {
  const router = useRouter();

  const handlePrevious = (link: string | undefined) => {
    if (link) {
      router.push(link);
    }
  };

  const handleNext = (link: string | undefined) => {
    if (link) {
      router.push(link);
    }
  };

  const handlePageClick = (pageNum: number) => {
    router.push(`?page=${pageNum}`);
  };

  return { handlePrevious, handleNext, handlePageClick };
};

export default useHandleNavigation;
