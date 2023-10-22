export const PAGE_SIZE = 12;

export type News = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type NewsSource = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type SearchData = {
  q: string;
  sources: string;
  category: string;
  page: string;
};

export type FetchNewsResult = {
  totalResults: number;
  articles: News[];
};
