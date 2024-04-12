import { SearchData } from '@/services/types';
import { NewsCategory } from '@/types';
import { Box } from '@chakra-ui/react';

type CategoryOption = {
  label: string;
  value?: string;
};

type NewsCategoriesProps = {
  searchData: SearchData;
  onChangeSearchData: (data: Partial<SearchData>) => void;
};

export default function NewsCategories(props: NewsCategoriesProps) {
  const { searchData, onChangeSearchData } = props;

  const selectedCategory = searchData.category;
  const selectedSource = searchData.source;

  const categories: CategoryOption[] = selectedSource
    ? [{ label: selectedCategory }]
    : [
        { label: NewsCategory.General, value: '' },
        { label: NewsCategory.Business },
        { label: NewsCategory.Entertainment },
        { label: NewsCategory.Health },
        { label: NewsCategory.Science },
        { label: NewsCategory.Sports },
        { label: NewsCategory.Technology },
      ];

  const handleOnChangeCategory = (category: string) => {
    if (category !== selectedCategory) {
      onChangeSearchData({ category, page: '1' });
    }
  };

  return (
    <section className='flex flex-col'>
      <Box className='flex flex-row flex-wrap gap-4 py-4'>
        {categories.map((tab) => (
          <button
            type='button'
            key={tab.label}
            onClick={() => handleOnChangeCategory(tab.value ?? tab.label)}
            className={`px-4 py-1 rounded-full border-2 cursor-pointer transition-all capitalize text-sm md:text-base ${
              selectedCategory === tab.label || selectedCategory === tab.value
                ? 'text-secondary border-secondary/50 bg-slate-100'
                : 'text-primary/60 border-primary/60 hover:border-white/70 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </Box>
    </section>
  );
}
