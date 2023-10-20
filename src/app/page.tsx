import NewsCategories from "@/components/News/NewsCategories/NewsCategories";
import NewsGrid from "@/components/News/NewsGrid/NewsGrid";
import { fetchNews, fetchNewsSources } from "@/services/news-service";
import { Box, Heading } from "@chakra-ui/react";

export default async function Home() {
  const newsSources = await fetchNewsSources();
  const news = await fetchNews();

  return (
    <Box className="page max-h-[calc(100vh-80px)]">
      <Heading variant="2xl">Latest News</Heading>
      <NewsCategories />
      <NewsGrid newsList={news} />
    </Box>
  );
}
