const express = require('express');
const app = express();
const config = require('./config');
const error = require('./error');
const auth = require('basic-auth');
const Raven = require('raven');
const hbs = require('hbs');
const serveStatic = require('serve-static');

// sentry setup
Raven.config(config.sentry.nodeDsn, {
  environment: config.env,
  autoBreadcrumbs: {
    'console': true,
    'http': true,
    'postgres': false,
  },
  extra: {info: 'NodeJS Sentry test error'}
}).install();

app.use(Raven.requestHandler());

// static files
app.use(serveStatic(__dirname + '/../public'));

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

// Set user information for Sentry
app.use(function(req, res, next) {
  const names = ['john', 'jane', 'bob', 'alice'];
  const name = names[Math.floor(Math.random() * names.length)];
  const user = {
    username: name,
    email: `${name}@example.com`
  };

  // Sentry reads user info form req.user
  req.user = user;

  // Or then just put user info into Raven context

  // Raven.setContext({
  //   user: {
  //     username: name,
  //     email: `${name}@example.com`
  //   }
  // });
  //
  next();
});

app.get('/', (req, res) => {
  res.render('index', {sentryDsn: config.sentry.jsDsn});
});

app.get('/error', (req, res) => {
  error.causeError();
});

app.use(Raven.errorHandler());

app.listen(config.port);
