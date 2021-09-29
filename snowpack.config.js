module.exports = {
  mount: {
    public: { url: '/' },
  },
  plugins: [
    '@snowpack/plugin-babel',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-webpack',
    [
      '@snowpack/plugin-build-script',
      {
        cmd: 'postcss',
        input: ['.css'],
        output: ['.css'],
      },
    ],
  ],
  optimize: {
    /* Use built-in esbuild bundling for build */
    bundle: true,
    minify: true,
    target: "es2020",
    treeshake: true,
    splitting: true,
    // Additional opts:
    // https://www.snowpack.dev/guides/optimize-and-bundle#option-1%3A-built-in-optimizations
  }
};
