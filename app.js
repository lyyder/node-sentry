const config = require('./config');
const auth = require('basic-auth');
const express = require('express');
const app = express();

// basic auth
if (config.env === 'production') {
  app.use((req, res, next) => {
    var user = auth(req);

    if (!user || user.name !== config.username || user.pass !== config.password) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="node-sentry"');
      res.end('Unauthorized');
    } else {
      next();
    }
  });
}

app.get('/', (req, res) => {
  res.send('Sentry node test');
});

app.listen(config.port, () => console.log(`App started`));
