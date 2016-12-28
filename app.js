const express = require('express');
const app = express();
const config = require('./config');
const auth = require('basic-auth');
const Raven = require('raven');
const hbs = require('hbs');
const serveStatic = require('serve-static');


// sentry setup
Raven.config(config.sentry.nodeDsn, {
  environment: config.env,
  extra: {info: 'NodeJS Sentry test error'}
}).install();
app.use(Raven.requestHandler());

// static files
app.use(serveStatic(__dirname + '/public'));

// handlebars templates
app.set('view engine', 'html');
app.engine('html', hbs.__express);

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
  res.render('index', {sentryDsn: config.sentry.jsDsn});
});

app.get('/error', (req, res) => {
  const names = ['john', 'jane', 'bob', 'alice'];
  const name = names[Math.floor(Math.random() * names.length)];

  Raven.setUserContext({
    email: `${name}@example.com`
  });

  throw new Error();
});

app.use(Raven.errorHandler());

app.listen(config.port);
