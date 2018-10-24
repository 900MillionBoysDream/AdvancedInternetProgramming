// swap mongoDB configuration for development and product
// will be used in deployment
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./keys_test");
} else {
  module.exports = require("./keys_dev");
}
