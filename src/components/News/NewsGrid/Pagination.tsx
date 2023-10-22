"use client";

import { SearchData } from "@/services/types";
import { Box } from "@chakra-ui/react";
import range from "lodash/range";

type PaginationProps = {
  pages: number;
  searchData: SearchData;
  onChangeSearchData: (data: Partial<SearchData>) => void;
};

export default function Pagination(props: PaginationProps) {
  const { pages, searchData, onChangeSearchData } = props;

  const selectedPage = searchData.page;

  const handleOnChangePage = (page: number) => {
    onChangeSearchData({ page: page.toString() });
  };

  return (
    <Box className="flex justify-end gap-3 pb-4">
      {range(1, pages + 1).map((page) => (
        <span
          key={page}
          onClick={() => handleOnChangePage(page)}
          className={`px-3 py-1 border cursor-pointer transition-all hover:border-white/80   ${
            Number(selectedPage) === page
              ? "text-secondary border-secondary/50 bg-slate-100"
              : "text-primary/60 border-primary/60 hover:text-white/80"
          }`}
        >
          {page}
        </span>
      ))}
    </Box>
  );
}
