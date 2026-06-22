import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';

// Build posts index at build time
function postsPlugin() {
  const virtualModuleId = 'virtual:posts';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'posts-plugin',
    resolveId(id: string) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const postsDir = path.resolve(__dirname, 'src/posts');
        const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
        const posts = files.map(file => {
          const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
          const { data, content } = matter(raw);
          const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '_')
            .replace(/-+/g, '-');
          return { ...data, content, slug, filepath: file };
        });
        posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return `export const posts = ${JSON.stringify(posts)};`;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), postsPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
