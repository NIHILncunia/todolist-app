import { ISiteData } from '@/types/site.types';

export const siteData: ISiteData = {
  title: 'TodoList',
  url: process.env.NODE_ENV !== 'production'
    ? 'https://localhost:3000'
    : '',
  image: '',
  author: 'NIHILncunia',
  description: '그냥 TodoList',
  keywords: 'TodoList',
  type: 'website',
  version: 'v0.0.0',
};
