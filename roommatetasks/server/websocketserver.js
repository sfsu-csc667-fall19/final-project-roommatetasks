const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

const notes = [];

const broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message)); // sends data from server to client
    }
  });
};

const broadcastAllMessages = (newNote) => {
  notes.unshift(newNote);
  broadcastMessage({
    type: 'UPDATE_MESSAGE',
    notes,
  })
};

const updateUserCount = () => {
  console.log("in update user count")
  broadcastMessage({
    type: 'UPDATE_USER_COUNT',
    count: wss.clients.size,
  })
};

wss.on('connection', (ws) => {
  console.log('Someone has connected');
  broadcastMessage('someone has connected!');
  updateUserCount();


  ws.on('message', (message) => {
    const messageObject = JSON.parse(message);
    switch(messageObject.type){
      case 'SEND_MESSAGE':
          broadcastAllMessages(messageObject.newNote);
        break;
    }
    console.log(message);
  });

  ws.on('error', (e) => {
    console.log(e);
  });

  ws.on('close', () => {
    broadcastMessage('someone has disconnected!');
    console.log('someone has disconnected!');
    updateUserCount();
  }); 
});