module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
        useBuiltIns: 'usage',
        hot: false,
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@antmjs/vantui',
        libraryDirectory: 'es',
        style: (name) => `${name}/style/less`,
      },
      '@antmjs/vantui',
    ],
  ],
}
