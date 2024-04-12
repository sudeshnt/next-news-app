import { News } from '@/services/types';
import localforage from 'localforage';
import { create } from 'zustand';
import { NewsState } from './types';

const useNewsStore = create<NewsState>((set, get) => ({
  watchList: [],
  populateWatchList: async () => {
    try {
      const watchList = (await localforage.getItem<News[]>('watch-list')) ?? [];
      set({ watchList });
    } catch (err) {
      console.error(err);
    }
  },
  addToWatchList: async (news: News) => {
    try {
      const { watchList } = get();
      const isNewsAlreadyInWatchList = watchList.some(
        (newsItem) => newsItem.title === news.title,
      );
      if (!isNewsAlreadyInWatchList) {
        const updatedWatchList = [...watchList, news];
        set({ watchList: updatedWatchList });
        await localforage.setItem('watch-list', updatedWatchList);
      }
    } catch (err) {
      console.error(err);
    }
  },
  removeFromWatchList: async (title: string) => {
    try {
      const { watchList } = get();
      const updatedWatchList = watchList.filter((news) => news.title !== title);
      set({ watchList: updatedWatchList });
      await localforage.setItem('watch-list', updatedWatchList);
    } catch (err) {
      console.error(err);
    }
  },
  editNewsTitle: (title: string, updatedTitle: string) => {
    console.log(title, updatedTitle);
    // const newsList = get().news;
    // const updatedNewsList = newsList.map((news) =>
    //   news.title === title ? { ...news, title: updatedTitle } : news,
    // );
    // set({
    //   news: updatedNewsList,
    // });
  },
}));

export default useNewsStore;
