/** @type {import('postcss-load-config').Config} */
// CORRECT postcss.config.mjs
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
// Example postcss.config.js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};