import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // If you want to define a custom fallback, configure the root route in the router.
  },
});
