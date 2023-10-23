"use client";

import { useNewsStore } from "@/store/News";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiEditBoxLine } from "react-icons/ri";
import * as z from "zod";

const newsTitleFormValidationSchema = z.object({
  title: z
    .string()
    .min(1, "News title is required")
    .max(255, "News title must be less than 256 characters"),
});

type TitleFormData = {
  title: string;
};

export default function EditTitleButton(props: TitleFormData) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const editNewsTitle = useNewsStore((state) => state.editNewsTitle);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<TitleFormData>({
    mode: "onChange",
    resolver: zodResolver(newsTitleFormValidationSchema),
  });

  const onSubmit: SubmitHandler<TitleFormData> = (data) => {
    editNewsTitle(props.title, data.title);
    onCloseModal();
  };

  const onCloseModal = () => {
    onClose();
    reset({});
  };

  useEffect(() => {
    reset({ title: props.title });
  }, [props.title, reset]);

  return (
    <>
      <Icon
        display="inline"
        as={RiEditBoxLine}
        ml={2}
        w={5}
        h={5}
        className="text-primary"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent className="bg-primaryBackground my-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody pb={6}>
              <FormControl isRequired isInvalid={!!errors.title}>
                <FormLabel>News Title</FormLabel>
                <Input placeholder="Title" {...register("title")} />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                borderRadius="full"
                variant="outline"
                mr={3}
                isDisabled={!isValid}
                className="text-primary hover:text-secondary"
              >
                Save
              </Button>
              <Button
                borderRadius="full"
                variant="outline"
                onClick={onCloseModal}
                className="text-primary hover:text-secondary"
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
