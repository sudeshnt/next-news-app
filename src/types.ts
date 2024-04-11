export enum NewsCategory {
  All = 'all',
  Business = 'business',
  Entertainment = 'entertainment',
  General = 'general',
  Health = 'health',
  Science = 'science',
  Sports = 'sports',
  Technology = 'technology',
}

export type NextSearchParams = Record<string, string | undefined>;

export type NextPageProps = {
  searchParams: NextSearchParams;
};
