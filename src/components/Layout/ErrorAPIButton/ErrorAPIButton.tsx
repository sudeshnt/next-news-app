"use client";

import { errorAPI } from "@/services/news-service";
import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { useTransition } from "react";
import { IoMdWarning } from "react-icons/io";

export default function ErrorAPIButton() {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handleOnClickErrorAPIButton = () => {
    startTransition(() => {
      errorAPI()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          toast({
            title: (error as unknown as Error).message,
            status: "error",
            isClosable: true,
          });
        });
    });
  };

  return (
    <Tooltip label="Error API" cursor="pointer">
      <IconButton
        className="text-white/80 hover:text-white transition-all"
        isLoading={isPending}
        icon={<IoMdWarning />}
        aria-label="warning-icon"
        onClick={handleOnClickErrorAPIButton}
      />
    </Tooltip>
  );
}
