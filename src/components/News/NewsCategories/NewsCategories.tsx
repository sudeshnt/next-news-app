import { SearchData } from "@/services/types";
import { NewsCategory } from "@/types";
import { Box } from "@chakra-ui/react";

type NewsCategoriesProps = {
  searchData: SearchData;
  onChangeSearchData: (data: Partial<SearchData>) => void;
};

export default function NewsCategories(props: NewsCategoriesProps) {
  const { searchData, onChangeSearchData } = props;

  const selectedCategory = searchData.category;
  const selectedSource = searchData.sources;

  const categories = [
    { label: NewsCategory.General, value: "" },
    ...(selectedSource
      ? []
      : [
          { label: NewsCategory.Business },
          { label: NewsCategory.Entertainment },
          { label: NewsCategory.Health },
          { label: NewsCategory.Science },
          { label: NewsCategory.Sports },
          { label: NewsCategory.Technology },
        ]),
  ];

  const handleOnChangeCategory = (category: string) => {
    onChangeSearchData({ category, page: "1" });
  };

  return (
    <section className="flex flex-col">
      <Box className="flex flex-row flex-wrap gap-4 py-4">
        {categories.map((tab) => (
          <span
            key={tab.label}
            onClick={() => handleOnChangeCategory(tab.value ?? tab.label)}
            className={`px-4 py-1 rounded-full border-2 cursor-pointer transition-all capitalize ${
              selectedCategory === tab.label || selectedCategory === tab.value
                ? "text-secondary border-secondary/50 bg-slate-100"
                : "text-primary/60 border-primary/60 hover:border-white/70 hover:text-white/60"
            }`}
          >
            {tab.label}
          </span>
        ))}
      </Box>
    </section>
  );
}
