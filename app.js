const config = require('./config');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Sentry node test');
});

app.listen(config.port, () => console.log(`App started, env: ${config.env}`));
