import { News } from "@/services/types";
import { Box } from "@chakra-ui/react";
import NewsCard from "../NewsCard/NewsCard";

type NewsGridProps = {
  newsList: News[];
};

export default function NewsGrid(props: NewsGridProps) {
  const { newsList } = props;

  return (
    <section className="overflow-y-scroll hide-scrollbar pb-10">
      <Box className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full ">
        {newsList.map((news) => (
          <NewsCard key={news.url} news={news} />
        ))}
      </Box>
    </section>
  );
}
