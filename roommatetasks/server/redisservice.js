const express = require("express");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const cors = require("cors");

const client = redis.createClient();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
const port = 2306;

app.post("/redis", (req, res, next) => {
  console.log("in redis service");
  console.log("loginData in redis", req.body.loginData);
  console.log("cookies in redis server", req.cookies);

  const loginData = {
    email: req.body.loginData.email,
    password: req.body.loginData.password
  };

  //   const key = req.body.loginData.email + "_" + req.body.loginData.password;
  //   console.log("key is", key);

  //   client.get(key, (err, cachedValue) => {
  //     console.log("error is",err);
  //     console.log("cachedvalue is", cachedValue);
  //     if (cachedValue != null) {
  //       console.log("cache hit");
  //       if (cachedValue === 'true') {
  //         return next();
  //       } else {
  //         res.status(403);
  //         return res.send("Not permitted");
  //       }
  //     } else {
  //       axios
  //         .post("http://localhost:2305/login/", loginData)
  //         .then(res => {
  //             console.log("in then of axios post");
  //           if (res.data.valid) {
  //             client.set(key, true);
  //             return next();
  //           } else {
  //             client.set(key, false);
  //             res.status(403);
  //             return res.send("You need access to this endpoint!");
  //           }
  //         })
  //         .catch(console.log);
  //       console.log("cache miss");
  //     }
  //   });

  console.log(req.cookies);
  const key = req.body.loginData.email + "_" + req.body.loginData.password;
  console.log("key is", key);

  client.get(key, (err, cachedValue) => {
    console.log(err);
    console.log("cached value is", cachedValue);
    if (cachedValue !== null) {
      console.log("cache hit");
      if (cachedValue === "true") {
        return next();
      } else {
        res.status(403);
        return res.send("You need access to this endpoint!");
      }
    } else {
      console.log("cache miss");
      // move rest of code in here
      axios
        .post("http://localhost:2305/login", {loginData})
        .then(res => {
          if (res.data.valid) {
            client.set(key, true);
            console.log("cookie here");
            return next();
          } else {
            client.set(key, false);
            res.status(403);
            return res.send("You need access to this endpoint!");
          }
        })
        .catch(console.log);
    }
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
