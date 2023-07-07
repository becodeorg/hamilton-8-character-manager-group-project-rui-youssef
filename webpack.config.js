const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    singlePage: "./src/othersPagesJs/scriptSinglePage.js",
    createChar: "./src/othersPagesJs/createChar.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js"),
  },
};
