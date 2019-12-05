const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();

/*
  apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'null');
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));

});
*/

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/cookie/*", (req, res) => {
  // service1
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});

app.all("/auth/", (req, res) => {
  
  apiProxy.web(req, res, {
    target: 'http://localhost:3002/auth',
  });
});

/*app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3000',
  });
});*/

app.all("/list/*", (req, res) => {
    // service1
    console.log(req.path)
    apiProxy.web(req, res, {
      target: 'http://localhost:4000',
    }
    );
  });

  app.all("/users*", (req, res) => {
    // service1
    console.log(req.path)
    apiProxy.web(req, res, {
      target: 'http://localhost:4000/',
    }
    );
  });

app.listen(port, () => console.log(`Gateway on port ${port}!`))