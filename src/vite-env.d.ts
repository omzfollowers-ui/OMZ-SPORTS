/// <reference types="vite/client" />

declare module 'virtual:posts' {
  export const posts: Array<{
    title: string;
    summary: string;
    categories: string[];
    date: string;
    author: string;
    sponsored: boolean;
    featured: boolean;
    content: string;
    slug: string;
    filepath: string;
  }>;
}
