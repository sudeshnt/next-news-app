"use server";

import type { News } from "./types";

const NEWS_HOST = "https://newsapi.org/v2";

export async function fetchNews(): Promise<News[]> {
  try {
    const res = await fetch(
      `${NEWS_HOST}/top-headlines?country=us&apiKey=${process.env.API_KEY}`,
      {
        next: {
          tags: ["news"],
        },
      }
    );
    const result = await res.json();
    if (result.status === "ok") {
      return result.articles;
    } else {
      throw new Error("Fetch news failed!");
    }
  } catch (error) {
    throw new Error("Fetch news failed!");
  }
}

export async function fetchNewsSources() {
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
    }
  } catch (error) {
    throw new Error("Fetch news sources failed!");
  }
}
