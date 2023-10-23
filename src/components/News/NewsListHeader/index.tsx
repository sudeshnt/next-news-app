"use client";

import Loading from "@/app/loading";
import { SearchData } from "@/services/types";
import { useNewsStore } from "@/store/News";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NewsCategories from "./NewsCategories";
import NewsSearchInput from "./NewsSearchInput";
import Pagination from "./Pagination";

const DEFAULT_SEARCH_DATA: SearchData = {
  q: "",
  sources: "",
  category: "",
  page: "1",
};

export default function NewsListHeader() {
  const [searchData, setSearchData] = useState(DEFAULT_SEARCH_DATA);

  const fetchNews = useNewsStore((state) => state.populateNews);

  const totalPages = useNewsStore((state) => state.totalPages);
  const isFetchingNews = useNewsStore((state) => state.isFetchingNews);

  const handleChangeSearchData = (data: Partial<SearchData>) => {
    setSearchData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    fetchNews(searchData);
  }, [searchData, fetchNews]);

  return (
    <>
      {isFetchingNews && <Loading />}
      <Box className="flex flex-col md:flex-row md:justify-between">
        <Heading className="mb-4" variant="2xl">
          Latest News
        </Heading>
        <NewsSearchInput
          searchData={searchData}
          onChangeSearchData={handleChangeSearchData}
        />
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
