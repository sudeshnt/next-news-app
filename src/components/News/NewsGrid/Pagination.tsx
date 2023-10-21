"use client";

import { Box } from "@chakra-ui/react";
import range from "lodash/range";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  pages: number;
};

export default function Pagination(props: PaginationProps) {
  const { pages } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formattedSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );
  const selectedPage = formattedSearchParams.get("page") ?? 1;

  const handleOnChangePage = (page: number) => {
    formattedSearchParams.set("page", page.toString());
    const search = formattedSearchParams.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
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
