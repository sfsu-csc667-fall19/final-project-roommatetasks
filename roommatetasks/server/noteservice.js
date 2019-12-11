const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const cors = require("cors");
const port = 2308;

app.use(cors());
app.use(express.json());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "roommate-tasks";

// Create a new MongoClient
const client = new MongoClient(url);



// Use connect method to connect to the Server
client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  app.post("/addnote", (req, res) => {
    console.log("in add notes service", req.body.noteData);
    db.collection("notes").insertOne({
      noteText: req.body.noteData.text ,
      noteKey: req.body.noteData.key
    });

    res.send({valid: true});
  });

  app.get("/listnote", (req, res) => {
      console.log("in list notes service");
      db.collection("notes").find().toArray()
      .then(document => {
          res.send({document});
      })
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
