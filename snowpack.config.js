// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    'src': '/'
  },
  routes: [
    { "match": "routes", "src": ".*", "dest": "/index.html" }
  ],
  plugins: [
    '@snowpack/plugin-postcss',
    '@jadex/snowpack-plugin-tailwindcss-jit'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    /* ... */
  },
};