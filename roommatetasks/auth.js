const express = require('express');
const app = express();
const { MongoClient, ObjectID } = require('mongodb');

app.use(express.json());

const port = 3002;

let counter = 0;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test101';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Connected successfully to server");
    const db = client.db(dbName);

    app.post('/auth', (req, res) => {
        counter++;
        console.log('count', counter);
        console.log(req.body);
        let valid = false;
        // this should be a mongo find
        /* 
        if (req.body.email === 'abc'
            && req.body.password === '202cb962ac59075b964b07152d234b70') {
            valid = true;
        }
        */
       const {email, password} = req.body;
       if(!email || !password) {
        return res.status(400).json({
            msg: 'Enter All Fields'
        })
    }
    db.collection('users').findOne({email: req.body.email}, function(err, user) {
        if(err) {
            res.json({msg: 'error'})
          }
          //if user was not found
          if (!user) {
            return res.status(400).json({
                     msg: "User does not register yet"})
          } else if ( user.password !== password ){
              return res.status(400).json({
                  msg: "Invalid credentials"})
          } else { 
              res.json({
                  email: user.email,
                  password: user.password,
                  valid: true
                })
          }    
        });
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

})
