'use server';

import { removeDuplicateSpaces } from '@/utils';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import pick from 'lodash/pick';
import { FetchNewsResult, type NewsSource, type SearchData } from './types';

const NEWS_HOST = 'https://newsapi.org/v2';

export async function fetchNews(
  searchData: Partial<SearchData> = {},
): Promise<FetchNewsResult> {
  try {
    const queryString = new URLSearchParams(searchData).toString();
    console.log(`${NEWS_HOST}/top-headlines?${queryString}`);
    const res = await fetch(`${NEWS_HOST}/top-headlines?${queryString}`, {
      cache: 'no-store',
    });
    const result = await res.json();
    if (result.status === 'ok') {
      return pick(result, 'totalResults', 'articles');
    }
    throw new Error(result.message);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchNewsSources(
  category: string = '',
): Promise<NewsSource[]> {
  try {
    console.log(
      `${NEWS_HOST}/sources?category=${category}&apiKey=${process.env.API_KEY}`,
    );
    const res = await fetch(
      `${NEWS_HOST}/sources?category=${category}&apiKey=${process.env.API_KEY}`,
      {
        next: {
          tags: ['news-sources'],
        },
      },
    );
    const result = await res.json();
    if (result.status === 'ok') {
      return result.sources;
    }
    throw new Error(result.message);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function readNewsDetailsFromUrl(url: string): Promise<string> {
  try {
    if (!url) return '';
    const res = await fetch(url, {
      cache: 'no-cache',
    });
    const result = await res.text();
    const dom = new JSDOM(result, {
      url,
    });
    const article = new Readability(dom.window.document).parse();
    return removeDuplicateSpaces(article?.textContent ?? '');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function errorAPI(): Promise<unknown> {
  try {
    const res = await fetch(`${NEWS_HOST}/sources?apiKey`);
    const result = await res.json();
    if (result.status === 'ok') {
      return result.sources;
    }
    throw result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
