import axios from 'axios';
import { PageResponse } from '@/types/global';

export interface RadarrTitle {
  id: number;
  tmdbId: number;
  sno: number;
  mainTitle: string;
  title: string;
  cleanTitle: string;
  seasonNumber: number;
  monitored: number;
  validStatus: number;
}

export interface RadarrTitleQueryRequest {
  title?: string;
  tmdbId?: number;
  current: number;
  pageSize: number;
}

export interface RadarrRule {
  id: string;
  token: string;
  priority: number;
  regex: string;
  replacement: string;
  offset: number;
  example: string;
  remark: string;
  author: string;
  validStatus: number;
}

export interface RadarrRuleQueryRequest {
  token?: string;
  remark?: string;
  current: number;
  pageSize: number;
}

export interface RadarrExample {
  hash: string;
  originalText: string;
  formatText: number;
  validStatus: number;
}

export interface RadarrExampleQueryRequest {
  originalText?: string;
  current: number;
  pageSize: number;
}

export function syncRadarrTitle() {
  return axios.post('/radarr/title/sync');
}

export function queryRadarrTitle(params: RadarrTitleQueryRequest) {
  return axios.get<PageResponse<RadarrTitle>>('/radarr/title/query', {
    params,
  });
}

export function removeRadarrTitle(params: number[]) {
  return axios.post('/radarr/title/remove', params);
}

export function queryRadarrRule(params: RadarrRuleQueryRequest) {
  return axios.get<PageResponse<RadarrRule>>('/radarr/rule/query', {
    params,
  });
}

export function saveRadarrRule(params: RadarrRule) {
  return axios.post('/radarr/rule/save', params);
}

export function removeRadarrRule(params: string[]) {
  return axios.post('/radarr/rule/remove', params);
}

export function syncRadarrRule() {
  return axios.post('/radarr/rule/sync');
}

export function enableRadarrRule(params: string[]) {
  return axios.post('/radarr/rule/enable', params);
}

export function disableRadarrRule(params: string[]) {
  return axios.post('/radarr/rule/disable', params);
}

export function exportRadarrRule(params: string[]) {
  return axios.post('/radarr/rule/export', params, { responseType: 'blob' });
}

export function importRadarrRule(file: File) {
  const params = new FormData();
  params.append('file', file);
  return axios.post('/radarr/rule/import', params);
}

export function listRadarrRuleToken() {
  return axios.get<string[]>('/radarr/rule/token/list');
}

export function queryRadarrExample(params: RadarrExampleQueryRequest) {
  return axios.get<PageResponse<RadarrExample>>('/radarr/example/query', {
    params,
  });
}

export function saveRadarrExample(params: string) {
  return axios.post('/radarr/example/save', params);
}

export function removeRadarrExample(params: string[]) {
  return axios.post('/radarr/example/remove', params);
}
