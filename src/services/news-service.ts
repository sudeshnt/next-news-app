"use server";

import identity from "lodash/identity";
import pickBy from "lodash/pickBy";
import {
  FetchNewsResult,
  PAGE_SIZE,
  type NewsSource,
  type SearchData,
} from "./types";

import { removeDuplicateSpaces } from "@/utils";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import pick from "lodash/pick";

const NEWS_HOST = "https://newsapi.org/v2";

export async function fetchNews(
  searchData: Partial<SearchData> = {}
): Promise<FetchNewsResult> {
  try {
    const formattedSearchData = pickBy(searchData, identity);
    const queryString = new URLSearchParams({
      page: "1",
      ...formattedSearchData,
      ...(!formattedSearchData.sources ? { country: "us" } : {}),
      pageSize: PAGE_SIZE.toString(),
      apiKey: process.env.API_KEY ?? "",
    }).toString();
    console.log(`${NEWS_HOST}/top-headlines?${queryString}`);
    const res = await fetch(`${NEWS_HOST}/top-headlines?${queryString}`, {
      cache: "no-store",
    });
    const result = await res.json();
    if (result.status === "ok") {
      return pick(result, "totalResults", "articles");
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchNewsSources(): Promise<NewsSource[]> {
  try {
    console.log(`${NEWS_HOST}/sources?apiKey=${process.env.API_KEY}`);
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

export async function readNewsDetailsFromUrl(url: string): Promise<string> {
  try {
    if (!url) return "";
    const res = await fetch(url, {
      cache: "no-cache",
    });
    const result = await res.text();
    const dom = new JSDOM(result, {
      url,
    });
    let article = new Readability(dom.window.document).parse();
    return removeDuplicateSpaces(article?.textContent ?? "");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function errorAPI(): Promise<unknown> {
  try {
    const res = await fetch(`${NEWS_HOST}/sources?apiKey`);
    const result = await res.json();
    if (result.status === "ok") {
      return result.sources;
    } else {
      throw result;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
