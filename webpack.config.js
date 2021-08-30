const createExpoWebpackConfigAsync = require("@expo/webpack-config"); // npm package had to be added...

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@ui-kitten/components"], // ...for this
      },
    },
    argv
  );
  return config;
};
