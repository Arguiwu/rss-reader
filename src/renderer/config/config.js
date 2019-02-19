export default {
  outputPath: `../../dist/renderer`,
  publicPath: "./",
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: "阅读器",
        dll: true,
        hardSource: false,
      },
    ],
  ],
};
