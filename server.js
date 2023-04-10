const { createServer } = require('http');
const next = require('next');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);
const PORT = 3000;

app.prepare().then(() => {
  createServer(handler).listen(PORT, (e) => {
    if (e) throw e;
    console.log(`Listening on localhost:${PORT}`);
  });
});
