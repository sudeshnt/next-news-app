import { fetchNews } from "@/services/news-service";
import { News, PAGE_SIZE, SearchData } from "@/services/types";
import localforage from "localforage";
import { create } from "zustand";
import { NewsState } from "./types";

export const useNewsStore = create<NewsState>((set, get) => ({
  totalPages: 0,
  news: [],
  watchList: [],
  isFetchingNews: false,
  populateNews: async (searchData: SearchData) => {
    try {
      set({ isFetchingNews: true });
      const response = await fetchNews(searchData);
      set({ news: response.articles });
      set({ totalPages: Math.ceil(response.totalResults / PAGE_SIZE) });
      set({ isFetchingNews: false });
    } catch (err) {
      console.error(err);
    }
  },
  populateWatchList: async () => {
    try {
      const watchList = (await localforage.getItem<News[]>("watch-list")) ?? [];
      set({ watchList });
    } catch (err) {
      console.error(err);
    }
    localforage
      .getItem<News[]>("watch-list")
      .then((data) => {
        set({ watchList: data ?? [] });
      })
      .catch((err) => {
        console.error(err);
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
      console.error(err);
    }
  },
  removeFromWatchList: async (title: string) => {
    try {
      const watchList = get().watchList;
      const updatedWatchList = watchList.filter((news) => news.title !== title);
      set({ watchList: updatedWatchList });
      await localforage.setItem("watch-list", updatedWatchList);
    } catch (err) {
      console.error(err);
    }
  },
  editNewsTitle: (title: string, updatedTitle: string) => {
    const newsList = get().news;
    const updatedNewsList = newsList.map((news) =>
      news.title === title ? { ...news, title: updatedTitle } : news
    );
    set({
      news: updatedNewsList,
    });
  },
}));
