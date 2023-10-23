"use client";

import { fetchNewsSources } from "@/services/news-service";
import { NewsSource, SearchData } from "@/services/types";
import { HStack, Input, Spinner } from "@chakra-ui/react";
import debounce from "lodash/debounce";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Select, { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type NewsSearchInputProps = {
  searchData: SearchData;
  onChangeSearchData: (data: Partial<SearchData>) => void;
};

const styles: StylesConfig = {
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
  const { searchData, onChangeSearchData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [newsSources, setNewsSources] = useState<NewsSource[]>([]);

  const selectedSource = searchData.sources;

  const newsSourcesOptions: OptionType[] = useMemo(
    () =>
      newsSources.map((newsSource) => ({
        label: newsSource.name,
        value: newsSource.id,
      })),
    [newsSources]
  );

  const handleOnChangeSearchSource = (option: OptionType) => {
    if (option?.value !== selectedSource) {
      onChangeSearchData({
        sources: option?.value ?? "",
        category: "",
        page: "1",
      });
    }
  };

  const handleOnChangeSearchText: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setIsLoading(false);
    const q = event.target.value;
    onChangeSearchData({
      q,
      page: "1",
    });
  };

  const debounceFn = useCallback(debounce(handleOnChangeSearchText, 1000), [
    debounce,
  ]);

  useEffect(() => {
    fetchNewsSources().then((newsSources) => {
      setNewsSources(newsSources);
    });
  }, [setNewsSources]);

  return (
    <HStack gap={0} mr={isLoading ? "-16px" : 0}>
      <Select
        styles={styles}
        className="text-secondary"
        placeholder="All Sources"
        isClearable
        options={newsSourcesOptions}
        onChange={(value) => handleOnChangeSearchSource(value as OptionType)}
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
        onChange={(e) => {
          setIsLoading(true);
          debounceFn(e);
        }}
      />
      {isLoading && (
        <Spinner color="red.500" size="sm" position="relative" right={30} />
      )}
    </HStack>
  );
}
