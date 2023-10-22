"use client";

import { News } from "@/services/types";
import { Button } from "@chakra-ui/react";
import localforage from "localforage";
import Link from "next/link";

type ReadMoreButtonProps = {
  news: News;
};

export default function ReadMoreButton({ news }: ReadMoreButtonProps) {
  const onClickReadMore = async () => {
    try {
      let watchList: News[] = (await localforage.getItem("watch-list")) ?? [];
      const isNewsAlreadyInWatchList = watchList.some(
        (newsItem) => newsItem.title === news.title
      );
      if (!isNewsAlreadyInWatchList) {
        watchList.push(news);
      }
      await localforage.setItem("watch-list", watchList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      href={{
        pathname: "/news",
        query: { data: JSON.stringify(news) },
      }}
    >
      <Button
        borderWidth={2}
        className="rounded-full capitalize border-width-2 text-white hover:text-secondary"
        onClick={onClickReadMore}
      >
        Read More
      </Button>
    </Link>
  );
}
