import axios from 'axios';

export interface SystemConfig {
  id: number;
  key: string;
  value: any;
  validStatus: number;
}

export interface SystemUser {
  id: number;
  username: string;
  role: string;
  validStatus: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export function login(params: LoginRequest) {
  return axios.post<string>('/system/user/login', params);
}

export function logout() {
  return axios.post('/system/user/logout');
}

export function systemUserInfo() {
  return axios.get<SystemUser>('/system/user/info');
}

export function updateSystemUser(params: SystemUser) {
  return axios.post<SystemUser>('/system/user/update', params);
}

export function systemConfigVersion() {
  return axios.get<string>('/system/config/version');
}

export function querySystemConfig() {
  return axios.get<SystemConfig[]>('/system/config/query');
}

export function updateSystemConfig(params: SystemConfig[]) {
  return axios.post('/system/config/update', params);
}

export function clearSystemCache(cacheName: string) {
  return axios.post('/system/cache/clear', { cacheName });
}

export function clearAllSystemCache() {
  return axios.post('/system/cache/clearAll');
}

export function listAuthor() {
  return axios.get<string[]>('/system/config/author/list');
}
