import { News } from "@/services/types";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import ReadMoreButton from "./ReadMoreButton";

type NewsCardProps = {
  news: News;
};

export default function NewsCard(props: NewsCardProps) {
  const { news } = props;

  return (
    <Box className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <Box className="h-96 ">
        <Image
          className={`h-full ${
            news.urlToImage ? "object-cover" : "object-contain"
          } transition-transform duration-600 group-hover:rotate-3 group-hover:scale-125`}
          src={news.urlToImage ?? "/images/fallback_image.png"}
          alt=""
        />
      </Box>
      <Box className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></Box>
      <Box className="absolute inset-0 flex translate-y-[160px] flex-col items-center justify-center px-8  transition-all duration-500 group-hover:translate-y-0">
        <Heading mb={1} size="md">
          {news.title}
        </Heading>
        <Box
          w="full"
          className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <Text className="italic text-white/75">
            by {news.author}, {news.source.name},{"\n"}
          </Text>
          <Box mt={6} className="flex justify-center">
            <ReadMoreButton news={news} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
