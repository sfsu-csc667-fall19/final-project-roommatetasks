const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 4000;

app.use(express.json());

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

  app.get('/list', (req, res) => {
    db.collection('notes')
      .find({})
      .toArray()
      .then((docs) => {
        res.send(docs);
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  app.get('/updateall', (req, res) => {
    const updater = {
      $set: {
        tag: req.query.tag || 'demo tag',
      }
    };
    db.collection('notes')
      .updateMany({}, updater)
      .then((docs) => {
        res.send('Update ok');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  app.get('/update', (req, res) => {
    // /update?hello=brian&value=batman
    const updater = {
      $set: {
        notes: req.query.notes || '',
      }
    };
    db.collection('notes')
      // update vs findOneAndUpdate
      .findOneAndUpdate({
        _id: ObjectID.createFromHexString(req.query._id),
      }, updater)
      .then(() => {
        res.send('Update Ok');
      })
      .catch((e) => {
        res.send('Error');
      });
  });

  //POST REQUEST
  //Public
  //Creating new note for list route
  //need: app.use(express.json())
  app.post('/list', (req, res) => {
      const newNote = {
          notes: req.query.notes || '',
          //notes is the key in db
          //req.body.notes is the values from react front-end
      }
      db.collection('notes')
        .insertOne(newNote);
      res.json(newNote);
      //response back will have this format:
      //{
    //"notes": "Now",
    //"_id": "5dd0fd5a76c0968594100bf1"
//} we can access to private _id provided by mongodb
    });

  //POST REQUEST
  //Public
  //Delete current note from database
  
  app.delete('/list', (req, res) => {
    db.collection('notes')
        .remove({_id: ObjectID.createFromHexString(req.query.noteID)})
        .then(() => res.json({ success: true }))
  })

  //POST REQUEST
    //Public
    //Creating new user
    app.post('/users/', (req, res) => {
      //incase of json post request
      //const {email, password} = req.body;
      //if there is no data in the database or data no match
      //need to add callback function inside findOne or it will failed
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
    //if user was found
    if (user) {
      return res.status(400).json({
               msg: "User already registers"})
    } else {
      //add new user
      const newUser = {
        email: req.body.email,
        password: req.body.password
      }
      db.collection('users')
              .insertOne(newUser)
              
      res.json(newUser);            
    }
  })});

  //get request show all users that register success
  app.get('/users', (req, res) => {
    db.collection('users')
      .find({})
      .toArray()
      .then((docs) => {
        res.send(docs);
      })
      .catch((e) => {
        res.send('Error');
      });
  });
  
  //Check whereas user from front-end is registered and ready to login
  //require query email and password for get request
  //for login check
  app.post('/checkauth', (req, res) => {
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
          //if user was mot found
          if (!user) {
            return res.status(400).json({
                     msg: "User does not register yet"})
          } else if ( user.password !== password ){
              return res.status(400).json({
                  msg: "Invalid credentials"})
          } else { 
              res.json({
                  email: user.email,
                  password: user.password})
          }    
  });
});

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}) 