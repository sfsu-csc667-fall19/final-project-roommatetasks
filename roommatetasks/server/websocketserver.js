const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4000 });
let notes = [];

const axios = require("axios");

const broadcastMessage = message => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message)); // sends data from server to client
    }
  });
};

const broadcastAllMessages = newNote => {
  axios.get("http://localhost:2308/listnewnote").then(function(response) {
    console.log("list all the notes now");
    console.log(response.data.document);
    notes = response.data.document;

    notes.unshift(newNote);
    console.log("in broadcastallmessage, notes are", notes);
    broadcastMessage({
      type: "UPDATE_MESSAGE",
      notes
    });
  });

  // notes.unshift(newNote);
  // console.log("in broadcastallmessage, notes are", notes)
  // broadcastMessage({
  //   type: 'UPDATE_MESSAGE',
  //   notes,
  // })
};

const updateUserCount = () => {
  console.log("in update user count");
  broadcastMessage({
    type: "UPDATE_USER_COUNT",
    count: wss.clients.size
  });
};

wss.on("connection", ws => {
  console.log("Someone has connected");
  broadcastMessage("someone has connected!");
  updateUserCount();

  ws.on("message", message => {
    const messageObject = JSON.parse(message);

    switch (messageObject.type) {
      case "SEND_MESSAGE":
        broadcastAllMessages(messageObject);
        break;
    }
    console.log(message);
  });

  ws.on("error", e => {
    console.log(e);
  });

  ws.on("close", () => {
    broadcastMessage("someone has disconnected!");
    console.log("someone has disconnected!");
    updateUserCount();
  });
});
