"use client";

import { NewsSource, SearchData } from "@/services/types";
import { HStack, Input } from "@chakra-ui/react";
import { ChangeEventHandler, useMemo } from "react";
import Select, { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type NewsSearchInputProps = {
  newsSources: NewsSource[];
  onChangeSearchData: (data: Partial<SearchData>) => void;
};

const styles: StylesConfig<any> = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "none",
    borderRadius: 0,
    border: state.isFocused ? "1px solid white" : "1px solid #cccccc",
    boxShadow: state.isFocused ? "0px 0px 6px #white" : "none",
    "&:hover": {
      border: "1px solid #white",
      boxShadow: "0px 0px 6px #white",
    },
    height: 40,
    minWidth: 160,
  }),
  singleValue: (styles, { data }) => ({ ...styles, color: "white" }),
};

export default function NewsSearchInput(props: NewsSearchInputProps) {
  const { newsSources, onChangeSearchData } = props;

  const newsSourcesOptions: OptionType[] = useMemo(
    () =>
      newsSources.map((newsSource) => ({
        label: newsSource.name,
        value: newsSource.id,
      })),
    [newsSources]
  );

  const handleOnChangeSearchSource = (option: OptionType) => {
    onChangeSearchData({
      sources: option?.value ?? "",
      category: "",
    });
  };

  const handleOnChangeSearchText: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const q = event.target.value;
    if (q.length === 0 || q.length > 2) {
      onChangeSearchData({
        q,
      });
    }
  };

  return (
    <HStack gap={0}>
      <Select
        styles={styles}
        className="text-secondary"
        placeholder="All Sources"
        isClearable
        options={newsSourcesOptions}
        onChange={handleOnChangeSearchSource}
      />
      <Input
        w={200}
        borderRadius={0}
        ml="-1px"
        placeholder="Search News"
        _focus={{
          boxShadow: "none",
          borderColor: "initial",
        }}
        onChange={handleOnChangeSearchText}
      />
    </HStack>
  );
}
