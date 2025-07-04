// postcss.config.js
export default {
  plugins: {
    // REMOVED: '@tailwindcss/postcss': {}, // This is no longer needed with @import "tailwindcss"
    autoprefixer: {}, // Autoprefixer is still useful for vendor prefixes
  },
};
