import { News } from '@/services/types';

export type NewsDetails = News & {
  article: string;
};

export type NewsState = {
  watchList: News[];
  populateWatchList: () => Promise<void>;
  addToWatchList: (news: News) => Promise<void>;
  removeFromWatchList: (title: string) => Promise<void>;
  editNewsTitle: (title: string, updatedTitle: string) => void;
};
