'use client';

import { fetchNewsSources } from '@/services/news-service';
import { NewsSource, SearchData } from '@/services/types';
import { HStack, Input, Spinner } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Select, { StylesConfig } from 'react-select';

type OptionType = {
  label: string;
  value: NewsSource;
};

type NewsSearchInputProps = {
  searchData: SearchData;
  onChangeSearchData: (data: Partial<SearchData>) => void;
};

const selectStyles: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'none',
    borderRadius: 0,
    border: state.isFocused ? '1px solid white' : '1px solid #cccccc',
    boxShadow: state.isFocused ? '0px 0px 6px #white' : 'none',
    '&:hover': {
      border: '1px solid #white',
      boxShadow: '0px 0px 6px #white',
    },
    height: 40,
    minWidth: 160,
  }),
  singleValue: (styles) => ({ ...styles, color: 'white' }),
  input: (styles) => ({ ...styles, color: 'white' }),
};

export default function NewsSearchInput(props: NewsSearchInputProps) {
  const { searchData, onChangeSearchData } = props;

  const inputRef = useRef(null);
  const selectInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [newsSources, setNewsSources] = useState<NewsSource[]>([]);

  const selectedSource = searchData.source;

  const newsSourcesOptions: OptionType[] = useMemo(
    () =>
      newsSources.map((newsSource) => ({
        label: newsSource.name,
        value: newsSource,
      })),
    [newsSources],
  );

  const handleOnChangeSearchSource = (option: OptionType) => {
    if (option?.value?.id !== selectedSource) {
      onChangeSearchData({
        source: option?.value?.id ?? '',
        category: option?.value?.category ?? searchData.category,
        page: '1',
      });
    }
  };

  const handleOnChangeSearchText: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setIsLoading(false);
    const q = event.target.value;
    onChangeSearchData({
      q,
      page: '1',
    });
  };

  const debounceFn = useCallback(debounce(handleOnChangeSearchText, 1000), [
    debounce,
    searchData,
  ]);

  useEffect(() => {
    const sourceCategory =
      searchData.category === 'general' ? '' : searchData.category;
    fetchNewsSources(sourceCategory).then((sources) => {
      setNewsSources(sources);
    });
  }, [searchData.category]);

  useEffect(() => {
    if (!searchData.source) (selectInputRef.current as any).clearValue();
    if (!searchData.q) (inputRef.current as any).value = '';
  }, [searchData.source, searchData.q]);

  return (
    <HStack gap={0} mr={isLoading ? '-16px' : 0}>
      <Select
        ref={selectInputRef}
        styles={selectStyles}
        className='text-secondary'
        placeholder='All Sources'
        isClearable
        defaultValue={searchData.source ?? ''}
        options={newsSourcesOptions}
        onChange={(value) => handleOnChangeSearchSource(value as OptionType)}
      />
      <Input
        ref={inputRef}
        w={200}
        borderRadius={0}
        ml='-1px'
        placeholder='Search News'
        _focus={{
          boxShadow: 'none',
          borderColor: 'initial',
        }}
        onChange={(e) => {
          setIsLoading(true);
          debounceFn(e);
        }}
      />
      {isLoading && (
        <Spinner color='red.500' size='sm' position='relative' right={30} />
      )}
    </HStack>
  );
}
