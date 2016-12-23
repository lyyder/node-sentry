const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  username: process.env.USERNAME || 'user',
  password: process.env.PASSWORD || 'pass',
  sentry: {
    nodeDsn: process.env.SENTRY_NODE_DSN,
    jsDsn: process.env.SENTRY_JS_DSN
  }

};

module.exports = config;
