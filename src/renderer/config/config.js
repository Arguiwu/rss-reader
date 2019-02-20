export default {
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        title: 'RSS阅读器',
        dll: true,
        hardSource: false,
      },
    ],
  ],
};
