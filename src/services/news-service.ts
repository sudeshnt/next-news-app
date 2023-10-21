"use server";

import identity from "lodash/identity";
import pickBy from "lodash/pickBy";
import type { News, NewsSource, SearchData } from "./types";

import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

const NEWS_HOST = "https://newsapi.org/v2";

export async function fetchNews(
  searchData: Partial<SearchData>
): Promise<News[]> {
  try {
    const formattedSearchData = pickBy(searchData, identity);
    const queryString = new URLSearchParams({
      ...formattedSearchData,
      ...(!formattedSearchData.sources ? { country: "us" } : {}),
      page: "1",
      pageSize: "24",
      apiKey: process.env.API_KEY ?? "",
    }).toString();

    const res = await fetch(`${NEWS_HOST}/top-headlines?${queryString}`, {
      cache: "no-cache",
      next: {
        tags: ["news"],
      },
    });
    const result = await res.json();
    if (result.status === "ok") {
      return result.articles;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchNewsSources(): Promise<NewsSource[]> {
  try {
    const res = await fetch(
      `${NEWS_HOST}/sources?apiKey=${process.env.API_KEY}`,
      {
        next: {
          tags: ["news-sources"],
        },
      }
    );
    const result = await res.json();
    if (result.status === "ok") {
      return result.sources;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function readNewsDetailsFromUrl(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });
    const result = await res.text();
    const dom = new JSDOM(result, {
      url,
    });
    let article = new Readability(dom.window.document).parse();
    return article?.textContent;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
