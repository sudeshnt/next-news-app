"use client";

import { NewsSource, SearchData } from "@/services/types";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewsCategories from "../NewsCategories/NewsCategories";
import NewsSearchInput from "../NewsSearchInput/NewsSearchInput";

const DEFAULT_SEARCH_DATA = {
  q: "",
  sources: "",
  category: "",
};

type NewsListHeaderProps = {
  newsSources: NewsSource[];
};

export default function NewsListHeader(props: NewsListHeaderProps) {
  const { newsSources } = props;

  const router = useRouter();

  const [searchData, setSearchData] = useState(DEFAULT_SEARCH_DATA);

  const handleChangeSearchData = (data: Partial<SearchData>) => {
    setSearchData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    const queryString = new URLSearchParams(searchData).toString();
    router.push(`?${queryString}`);
  }, [searchData]);

  return (
    <>
      <Box className="flex flex-col md:flex-row md:justify-between">
        <Heading className="mb-4" variant="2xl">
          Latest News
        </Heading>
        <NewsSearchInput
          newsSources={newsSources}
          onChangeSearchData={handleChangeSearchData}
        />
      </Box>
      <NewsCategories
        searchData={searchData}
        onChangeSearchData={handleChangeSearchData}
      />
    </>
  );
}
