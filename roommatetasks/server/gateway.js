const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/cookie/*", (req, res) => {
  // cookie service
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});

app.all("/auth*", (req, res) => {
  // auth for login user
  apiProxy.web(req, res, {
    target: 'http://localhost:3002',
  });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3000',
  });
});

app.all("/authservice/*", (req, res) => {
    // mongo
    console.log(req.path)
    apiProxy.web(req, res, {
      target: 'http://localhost:2305',
    });
  });

app.listen(port, () => console.log(`Gateway on port ${port}!`))