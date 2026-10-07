import { defineConfig } from "vite";

export default defineConfig({
    base: "/ong-terceiro-setor/",
    publicDir: "public",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        cssMinify: "lightningcss",  // minificador moderno (mais rápido que esbuild)
        sourcemap: false,
        target: "es2022"
    },
    server: {
        port: 5173,
        open: true
    }
});