const express = require('express');
const next = require('next');
const winston = require('winston');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app
  .prepare()
  .then(() => {
    const server = express();

    server.disable('x-powered-by');

    server.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'sameorigin');
      res.setHeader('Referrer-Policy', 'origin');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      res.setHeader('x-xss-protection', '1; mode=block');
      next();
    });

    server.get('/marvel', (req, res) => {
      // `/marvel` is the filename of `/pages/marvel.js
      // * must pass in req.params for back button to work:
      // https://github.com/zeit/next.js/issues/3065#issuecomment-423035872
      app.render(req, res, '/marvel', req.params);
    });

    server.get('/dc', (req, res) => {
      // `/dc` is the filename of `/pages/dc.js
      // * must pass in req.params for back button to work:
      // https://github.com/zeit/next.js/issues/3065#issuecomment-423035872
      app.render(req, res, '/dc', req.params);
    });

    server.get('/trending', (req, res) => {
      // `/trending` is the filename of `/pages/marvel.js
      // * must pass in req.params for back button to work:
      // https://github.com/zeit/next.js/issues/3065#issuecomment-423035872
      app.render(req, res, '/trending', req.params);
    });

    server.get('/characters/:slug', (req, res) => {
      // `/character` is the filename of `/pages/character.js
      // * must pass in req.params for back button to work:
      // https://github.com/zeit/next.js/issues/3065#issuecomment-423035872
      app.render(req, res, '/character', req.params);
    });

    server.get('/', (req, res) => {
      // `/index` is the filename of `/pages/index.js
      // * must pass in req.params for back button to work:
      // https://github.com/zeit/next.js/issues/3065#issuecomment-423035872
      app.render(req, res, '/index', req.params);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      logger.info('winston logger ready!');
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    logger.error(ex);
    // console.error(ex.stack);
    process.exit(1);
  });
