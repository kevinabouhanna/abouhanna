module.exports = {
  mount: {
    public: { url: '/', static: true },
  },
  plugins: [
    '@snowpack/plugin-babel',
    '@snowpack/plugin-postcss',
  ]
};
