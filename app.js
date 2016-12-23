const config = require('./config');
const auth = require('basic-auth');
const Raven = require('raven');
const express = require('express');
const app = express();

Raven.config(config.sentry.nodeDsn, {
  environment: config.env,
  extra: {info: 'NodeJS Sentry test error'}
}).install();
app.use(Raven.requestHandler());

// basic auth
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

app.get('/', (req, res) => {
  res.send('Sentry node test');
});

app.get('/error', (req, res) => {
  throw new Error();
});

app.use(Raven.errorHandler());

app.listen(config.port);
