"use client";

import { News } from "@/services/types";
import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import localforage from "localforage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { SlEye } from "react-icons/sl";

export default function WatchedHistory() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useBoolean();
  const [watchList, setWatchList] = useState<News[]>([]);

  const handleClickCloseButton = (title: string) => {
    localforage
      .getItem<News[]>("watch-list")
      .then((data) => {
        const filteredWatchList = data?.filter((news) => news.title !== title);
        setWatchList(filteredWatchList ?? []);
        localforage.setItem("watch-list", filteredWatchList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    localforage
      .getItem<News[]>("watch-list")
      .then((data) => {
        setWatchList(data ?? []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pathName]);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={setIsOpen.on}
      onClose={setIsOpen.off}
      isLazy
      lazyBehavior="keepMounted"
    >
      <HStack>
        <PopoverTrigger>
          <HStack>
            <SlEye />
            <Text>Watch List</Text>
          </HStack>
        </PopoverTrigger>
      </HStack>

      <PopoverContent
        borderRadius={10}
        bgColor="white"
        p={10}
        w="full"
        maxW={400}
        maxH={500}
        overflow="scroll"
        className="mr-[10vw] hide-scrollbar"
      >
        <PopoverBody className="text-secondary/80 text-sm">
          {watchList.length ? (
            watchList.map((news) => (
              <Link
                href={{
                  pathname: "/news",
                  query: { data: JSON.stringify(news) },
                }}
                onClick={setIsOpen.off}
              >
                <Card
                  p={5}
                  mb={5}
                  className="cursor-pointe  shadow rounded-lg"
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    width={80}
                    height={80}
                    className="rounded-lg"
                    objectFit="cover"
                    src={news.urlToImage ?? "/images/fallback_image.png"}
                    alt="Caffe Latte"
                  />
                  <CardBody display="flex" alignItems="center" pl={10}>
                    <Text>{news.title}</Text>
                  </CardBody>
                  <IconButton
                    size="sm"
                    aria-label="Remove"
                    icon={<IoMdClose />}
                    className="absolute top-2 right-2 text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickCloseButton(news.title);
                    }}
                  />
                </Card>
              </Link>
            ))
          ) : (
            <Text minW={200} align="center">
              No Items on Watch List
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
