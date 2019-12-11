const express = require("express");
const httpProxy = require("http-proxy");
const app = express();
const port = process.env.PORT || 2307;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on("error", (err, req, res) => {
  console.log(err);
  res.status(500).send("Proxy Error");
});

app.all("/registeruser", (req, res) => {
  console.log("in register user path in gateway", req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:2305"
  });
});

app.all("/login", (req, res) => {
  console.log("in login path in gateway", req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:2305"
  });
});

app.all("/redis", (req, res) => {
    console.log("in redis path in gateway", req.path);
    apiProxy.web(req, res, {
      target: "http://localhost:2306"
    });
  });

app.all("/addnote", (req, res) => {
  console.log("in add note path in gateway", req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:2308"
  })
})

app.all("/listnewnote", (req, res) => {
  console.log("in list note path in gateway", req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:2308"
  })
})

app.all("/updatenote", (req, res) => {
  console.log("in update note path in gateway", req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:2308"
  })
})

app.all("/listdonenote", (req, res) => {
  console.log("in list done note path in gateway", req.path);
  apiProxy.web(req, res, {
    target: "http://localhost:2308"
  })
})

app.listen(port, () => console.log(`Gateway on port ${port}!`));
