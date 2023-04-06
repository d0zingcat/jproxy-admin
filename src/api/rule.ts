import axios from 'axios';

export interface RuleTestRequest {
  regex: string;
  replacement: string;
  example: string;
  offset: number;
}

export function testRule(params: RuleTestRequest) {
  return axios.get('/rule/test', { params });
}
