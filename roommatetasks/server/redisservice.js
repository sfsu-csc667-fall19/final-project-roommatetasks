const express = require("express");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const client = redis.createClient();

const app = express();
app.use(cookieParser());
const port = 2306;

app.use((req, res, next) => {
  console.log(req.cookies);

  const body = {
    email: req.cookies.username,
    password: req.cookies.password
  };

  const key = req.cookies.username + "_" + req.cookies.password;

  console.log("test");
  client.get(key, (err, cachedValue) => {
    console.log(err);
    console.log(cachedValue);
    if (cachedValue != null) {
      console.log("cache hit");
      if (cachedValue === 'true') {
        return next();
      } else {
        res.status(403);
        return res.send("Not permitted");
      }
    } else {
      axios
        .post("http://localhost:3002/service2/", body)
        .then(res => {
          if (res.data.valid) {
            client.set(key, true);
            return next();
            // document.cookie = `username=${username}`; //set cookies with key/value pairs
            // document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
          } else {
            client.set(key, false);
            res.status(403);
            return res.send("You need access to this endpoint!");
          }
          // console.log(res);
        })
        .catch(console.log);
      console.log("cache miss");
    }
  });
});

app.get("/service1/*", (req, res) => {
  console.log(req.cookies);
  res.send("ads");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
