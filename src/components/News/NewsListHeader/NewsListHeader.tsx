"use client";

import Loading from "@/app/loading";
import { SearchData } from "@/services/types";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewsCategories from "../NewsCategories/NewsCategories";
import Pagination from "../NewsGrid/Pagination";
import NewsSearchInput from "../NewsSearchInput/NewsSearchInput";

const DEFAULT_SEARCH_DATA: SearchData = {
  q: "",
  sources: "",
  category: "",
  page: "1",
};

type NewsListHeaderProps = {
  pages: number;
};

export default function NewsListHeader(props: NewsListHeaderProps) {
  const { pages } = props;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState(DEFAULT_SEARCH_DATA);

  const handleChangeSearchData = (data: Partial<SearchData>) => {
    setSearchData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const queryString = new URLSearchParams(searchData).toString();
    router.push(`?${queryString}`);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [searchData]);

  return (
    <>
      {isLoading && <Loading />}
      <Box className="flex flex-col md:flex-row md:justify-between">
        <Heading className="mb-4" variant="2xl">
          Latest News
        </Heading>
        <NewsSearchInput onChangeSearchData={handleChangeSearchData} />
      </Box>
      <NewsCategories
        searchData={searchData}
        onChangeSearchData={handleChangeSearchData}
      />
      <Pagination
        pages={pages}
        searchData={searchData}
        onChangeSearchData={handleChangeSearchData}
      />
    </>
  );
}
