import { fetchNews } from "@/services/news-service";
import { News, PAGE_SIZE, SearchData } from "@/services/types";
import localforage from "localforage";
import { create } from "zustand";

type NewsDetails = News & {
  article: string;
};

type NewsState = {
  totalPages: number;
  news: News[];
  newsDetails: NewsDetails | null;
  watchList: News[];
  isFetchingNews: boolean;
  fetch: (searchData: SearchData) => Promise<void>;
  populateWatchList: () => Promise<void>;
  addToWatchList: (news: News) => Promise<void>;
  removeFromWatchList: (title: string) => Promise<void>;
};

export const useNewsStore = create<NewsState>((set, get) => ({
  totalPages: 0,
  news: [],
  newsDetails: null,
  watchList: [],
  isFetchingNews: false,
  fetch: async (searchData: SearchData) => {
    try {
      set({ isFetchingNews: true });
      const response = await fetchNews(searchData);
      set({ news: response.articles });
      set({ totalPages: Math.ceil(response.totalResults / PAGE_SIZE) });
      set({ isFetchingNews: false });
    } catch (err) {
      console.log(err);
    }
  },
  populateWatchList: async () => {
    try {
      const watchList = (await localforage.getItem<News[]>("watch-list")) ?? [];
      set({ watchList });
    } catch (err) {
      console.log(err);
    }
    localforage
      .getItem<News[]>("watch-list")
      .then((data) => {
        set({ watchList: data ?? [] });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addToWatchList: async (news: News) => {
    try {
      const watchList = get().watchList;
      const isNewsAlreadyInWatchList = watchList.some(
        (newsItem) => newsItem.title === news.title
      );
      if (!isNewsAlreadyInWatchList) {
        set({ watchList: [...get().watchList, news] });
      }
      await localforage.setItem("watch-list", watchList);
    } catch (err) {
      console.log(err);
    }
  },
  removeFromWatchList: async (title: string) => {
    try {
      const watchList = get().watchList;
      const updatedWatchList = watchList.filter((news) => news.title !== title);
      set({ watchList: updatedWatchList });
      console.log({ updatedWatchList });
      await localforage.setItem("watch-list", updatedWatchList);
    } catch (err) {
      console.log(err);
    }
  },
}));
