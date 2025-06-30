import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import ghPages from "vite-plugin-gh-pages"; // ✅ Add this

export default defineConfig({
  base: '/Work-Calendar/', // ✅ Must match your repo name

  plugins: [
    react(),
    componentTagger(),
    ghPages(), // ✅ Add this here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
