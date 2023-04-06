import axios from 'axios';
import { PageResponse } from '@/types/global';

export interface SonarrTitle {
  id: number;
  tvdbId: number;
  sno: number;
  mainTitle: string;
  title: string;
  cleanTitle: string;
  seasonNumber: number;
  monitored: number;
  validStatus: number;
}

export interface SonarrTitleQueryRequest {
  title?: string;
  tvdbId?: number;
  current: number;
  pageSize: number;
}

export interface SonarrRule {
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

export interface SonarrRuleQueryRequest {
  token?: string;
  remark?: string;
  current: number;
  pageSize: number;
}

export interface SonarrExample {
  hash: string;
  originalText: string;
  formatText: number;
  validStatus: number;
}

export interface SonarrExampleQueryRequest {
  originalText?: string;
  current: number;
  pageSize: number;
}

export function syncSonarrTitle() {
  return axios.post('/sonarr/title/sync');
}

export function querySonarrTitle(params: SonarrTitleQueryRequest) {
  return axios.get<PageResponse<SonarrTitle>>('/sonarr/title/query', {
    params,
  });
}

export function removeSonarrTitle(params: number[]) {
  return axios.post('/sonarr/title/remove', params);
}

export function querySonarrRule(params: SonarrRuleQueryRequest) {
  return axios.get<PageResponse<SonarrRule>>('/sonarr/rule/query', {
    params,
  });
}

export function saveSonarrRule(params: SonarrRule) {
  return axios.post('/sonarr/rule/save', params);
}

export function removeSonarrRule(params: string[]) {
  return axios.post('/sonarr/rule/remove', params);
}

export function syncSonarrRule() {
  return axios.post('/sonarr/rule/sync');
}

export function enableSonarrRule(params: string[]) {
  return axios.post('/sonarr/rule/enable', params);
}

export function disableSonarrRule(params: string[]) {
  return axios.post('/sonarr/rule/disable', params);
}

export function exportSonarrRule(params: string[]) {
  return axios.post('/sonarr/rule/export', params, { responseType: 'blob' });
}

export function importSonarrRule(file: File) {
  const params = new FormData();
  params.append('file', file);
  return axios.post('/sonarr/rule/import', params);
}

export function listSonarrRuleToken() {
  return axios.get<string[]>('/sonarr/rule/token/list');
}

export function querySonarrExample(params: SonarrExampleQueryRequest) {
  return axios.get<PageResponse<SonarrExample>>('/sonarr/example/query', {
    params,
  });
}

export function saveSonarrExample(params: string) {
  return axios.post('/sonarr/example/save', params);
}

export function removeSonarrExample(params: string[]) {
  return axios.post('/sonarr/example/remove', params);
}
