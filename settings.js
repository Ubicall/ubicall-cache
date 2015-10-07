var loader = require("node-remote-config-loader");
var log = require("./log");

process.env.node_env = process.env.node_env || "development";
process.env.config_version = process.env.config_version || 20150920;

var DEVENV = (process.env.node_env === "development" || process.env.node_env === "test");
if (DEVENV) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

if (!process.env.config_version) {
  log.help("You should specify configuration version to use, see README for detail");
  throw new Error("Missed config_version environment variable");
}

var config = loader.load({
  configHost: process.env.node_env === "production" ? "http://developer.ubicall.com/conf/" : "http://developer.dev.ubicall.com/conf/",
  configVersion: process.env.config_version,
  configEnv: process.env.node_env
});


module.exports = {

  host: "127.0.0.1",
  port: "8000",

  cache: {
    enabled: false,
    //should has element with same name contain configuration used with same file name under
    // caching directory(./caching) and implement methods in ./caching/index.js
    cacheModule: "redis",
    redis: config.cache.redis
  }
};
