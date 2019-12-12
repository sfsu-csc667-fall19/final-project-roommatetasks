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
      noteText: req.body.noteData.text,
      noteKey: req.body.noteData.key,
      tag: req.body.noteData.tag
    });

    res.send({ valid: true });
  });

  app.get("/listnewnote", (req, res) => {
    console.log("in list notes service");
    db.collection("notes")
      .find({ tag: "newNote" })
      .toArray()
      .then(document => {
        res.send({ document });
      });
  });

  app.post("/updatenote", (req, res) => {
    console.log("in update note service", req.body.note);
    // maybe change to _id
    let noteName = req.body.note;
    let noteid = req.body._id;
    console.log("in update note service, note name is", noteName);

    db.collection("notes").updateOne(
      //maybe update by id
      { "noteText": `${noteName}` },
      { $set: { "tag": "done" } }
    )
    .then(() => {
      
      res.send({ updated: true });
    })
    .catch((e) => {
      console.log(e);
    })  
  });

  app.get("/listdonenote", (req, res) => {
    console.log("in done list notes service");
    db.collection("notes")
      .find({ tag: "done" })
      .toArray()
      .then(document => {
        res.send({ document });
      });
  });

  // app.post("/updatenote"),
  //   (req, res) => {
  //     console.log("in update note service");
  // let noteName = req.body.newNoteData.note;
  // console.log("in update note service, note name is", noteName);

  // db.collection("notes").update(
  //   { noteText: { noteName } },
  //   { $set: { tag: "done" } }
  // );

  //     res.send({
  //       updated: true
  //     });
  //   };

  // db.getCollection('notes').update({"tag":"done"}, {$set: {"tag":"newNote"}})

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
