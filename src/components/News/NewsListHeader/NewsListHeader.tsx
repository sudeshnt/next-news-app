"use client";

import Loading from "@/app/loading";
import { SearchData } from "@/services/types";
import { useNewsStore } from "@/store/News";
import { Box, Heading } from "@chakra-ui/react";
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

export default function NewsListHeader() {
  const fetch = useNewsStore((state) => state.fetch);
  const totalPages = useNewsStore((state) => state.totalPages);
  const isFetchingNews = useNewsStore((state) => state.isFetchingNews);

  const [searchData, setSearchData] = useState(DEFAULT_SEARCH_DATA);

  const handleChangeSearchData = (data: Partial<SearchData>) => {
    setSearchData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    fetch(searchData);
  }, [searchData, fetch]);

  return (
    <>
      {isFetchingNews && <Loading />}
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
        pages={totalPages}
        searchData={searchData}
        onChangeSearchData={handleChangeSearchData}
      />
    </>
  );
}
