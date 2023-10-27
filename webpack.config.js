

module.exports = {
  // ... other webpack configurations ...

  resolve: {
    fallback: { "https": require.resolve("https-browserify") },
  },
};
