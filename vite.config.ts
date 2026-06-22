import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import matter from "gray-matter";
import fs from "fs";

function postsPlugin() {
  const virtualModuleId = "virtual:posts";
  const resolvedId = "\0" + virtualModuleId;

  return {
    name: "posts-plugin",
    resolveId(id) {
      if (id === virtualModuleId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      const postsDir = path.resolve(process.cwd(), "src/posts");
      const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
      const posts = files.map((file) => {
        const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
        const { data, content } = matter(raw);
        const slug = (data.title || file)
          .toLowerCase()
          .replace(/[éèê]/g, "e")
          .replace(/[àâ]/g, "a")
          .replace(/[ùûü]/g, "u")
          .replace(/[ôö]/g, "o")
          .replace(/[îï]/g, "i")
          .replace(/[^a-z0-9\s_-]/g, "")
          .trim()
          .replace(/\s+/g, "_")
          .replace(/_+/g, "_");
        return {
          title: data.title || "",
          summary: data.summary || "",
          categories: data.categories || [],
          date: data.date || "",
          author: data.author || "",
          sponsored: data.sponsored === true || data.sponsored === "true",
          featured: data.featured === true || data.featured === "true",
          content: content.trim(),
          slug,
          filepath: file,
        };
      });
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      return "export const posts = " + JSON.stringify(posts) + ";";
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), postsPlugin()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
