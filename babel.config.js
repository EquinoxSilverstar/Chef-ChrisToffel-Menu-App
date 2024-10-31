module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Include Expo preset
    plugins: [
      // Enable class properties and ensure 'loose' mode is the same across plugins
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ],
  };
};
