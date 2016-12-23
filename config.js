const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

module.exports = config;
