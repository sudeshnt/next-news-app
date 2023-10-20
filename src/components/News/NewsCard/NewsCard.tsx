import { News } from "@/services/types";
import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";

type NewsCardProps = {
  news: News;
};

export default function NewsCard(props: NewsCardProps) {
  const { news } = props;

  return (
    <Box className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <Box className="h-96">
        <Image
          className="h-full object-cover transition-transform duration-600 group-hover:rotate-3 group-hover:scale-125"
          src={news.urlToImage}
          alt=""
        />
      </Box>
      <Box className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></Box>
      <Box className="absolute inset-0 flex translate-y-[160px] flex-col items-center justify-center px-8  transition-all duration-500 group-hover:translate-y-0">
        <Heading mb={2} size="md">
          {news.title}
        </Heading>
        <VStack>
          <Text className="italic opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {news.source.name}
            {"\n"}
          </Text>
          <Text className="mb-3 italic opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {news.author}
          </Text>
          <Button
            borderWidth={2}
            className="rounded-full py-2 px-3.5 capitalize border-width-2 shadow text-white hover:text-secondary"
          >
            See More
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
