import axios from 'axios';
import { PageResponse } from '@/types/global';

export interface TmdbTitle {
  id: number;
  tvdbId: number;
  tmdbId: number;
  language: string;
  title: string;
  validStatus: number;
}

export interface TmdbTitleQueryRequest {
  title?: string;
  tvdbId?: number;
  current: number;
  pageSize: number;
}

export function syncTmdbTitle() {
  return axios.post('/tmdb/title/sync');
}

export function queryTmdbTitle(params: TmdbTitleQueryRequest) {
  return axios.get<PageResponse<TmdbTitle>>('/tmdb/title/query', {
    params,
  });
}

export function removeTmdbTitle(params: number[]) {
  return axios.post('/tmdb/title/remove', params);
}

export function saveTmdbTitle(params: TmdbTitle) {
  return axios.post('/tmdb/title/save', params);
}
