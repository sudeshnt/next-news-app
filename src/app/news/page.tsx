import { readNewsDetailsFromUrl } from "@/services/news-service";
import { News } from "@/services/types";
import { NextPageProps } from "@/types";
import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

const parseJsonSafely = (str: string | undefined): News | null => {
  if (str) {
    try {
      let jsonObject = JSON.parse(str);
      return jsonObject;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

export default async function NewsDetailsPage({ searchParams }: NextPageProps) {
  const news = parseJsonSafely(searchParams?.data);
  const article = news?.url ? await readNewsDetailsFromUrl(news.url) : "";

  if (!news) return null;

  return (
    <div className="page max-h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar pt-8">
      <Link href={"/"}>
        <HStack className="text-base font-medium mb-5 text-primary hover:text-white">
          <IoMdArrowBack />
          <Text>back to Latest News</Text>
        </HStack>
      </Link>
      <Heading variant="2xl">{news.title}</Heading>
      <Box
        mb={6}
        className="flex flex-col text-primary md:flex-row md:justify-between"
      >
        <Text mb={2}>
          by {news.author}, {news.source?.name}
        </Text>
        <Text>{new Date(news.publishedAt).toLocaleString()}</Text>
      </Box>
      <Image
        w="full"
        mb={6}
        src={news.urlToImage}
        className="float-right h-300"
        alt="news-image"
      />
      <Text mb={20} whiteSpace="pre-wrap">
        {article?.replace(/\n{2,}/g, "")}
      </Text>
    </div>
  );
}
