import { News, SearchData } from '@/services/types';

export type NewsDetails = News & {
  article: string;
};

export type NewsState = {
  totalPages: number;
  news: News[];
  watchList: News[];
  isFetchingNews: boolean;
  populateNews: (searchData: SearchData) => Promise<void>;
  populateWatchList: () => Promise<void>;
  addToWatchList: (news: News) => Promise<void>;
  removeFromWatchList: (title: string) => Promise<void>;
  editNewsTitle: (title: string, updatedTitle: string) => void;
};
