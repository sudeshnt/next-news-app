import { readNewsDetailsFromUrl } from "@/services/news-service";
import { NextPageProps } from "@/types";
import { parseJsonSafely } from "@/utils";
import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export default async function NewsDetailsPage({ searchParams }: NextPageProps) {
  const newsDetails = parseJsonSafely(searchParams?.data);

  if (!newsDetails) return null;

  const article = newsDetails?.url
    ? await readNewsDetailsFromUrl(newsDetails.url)
    : "";

  return (
    <div className="page max-h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar pt-8">
      <Link href={"/"}>
        <HStack className="text-base font-medium mb-5 text-primary hover:text-white">
          <IoMdArrowBack />
          <Text>back to Latest News</Text>
        </HStack>
      </Link>
      <Heading variant="2xl">{newsDetails.title}</Heading>
      <Box
        mb={6}
        className="flex flex-col text-primary md:flex-row md:justify-between"
      >
        <Text mb={2}>
          by {newsDetails.author}, {newsDetails.source?.name}
        </Text>
        <Text>{new Date(newsDetails.publishedAt).toLocaleString()}</Text>
      </Box>
      <Image
        w="full"
        mb={6}
        src={newsDetails.urlToImage}
        className="float-right h-300"
        alt="news-image"
      />
      <Text mb={20} whiteSpace="pre-wrap">
        {article?.replace(/\n{2,}/g, "")}
      </Text>
    </div>
  );
}
