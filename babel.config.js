module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
<<<<<<< HEAD
    ],
  };
};
=======
      "react-native-reanimated/plugin",
    ],
  };
};
>>>>>>> edd76d43422cf2833160d11b1f435603bfcbeac1
