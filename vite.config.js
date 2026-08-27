import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: ha de coincidir amb el nom del repositori de GitHub Pages.
// El repositori és "Menester-DICC", així que la URL és
// https://adhoc-cultura.github.io/Menester-DICC/
// Si algun dia canvies el nom del repositori, actualitza aquesta línia.
export default defineConfig({
  plugins: [react()],
  base: "/Menester-DICC/",
});
