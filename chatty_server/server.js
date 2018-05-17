// server.js

const express = require('express');
const SocketServer = require('ws').Server;

const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');

  ws.on("message", function incoming(message) {

    let data = JSON.parse(message);
    // console.log(data);

    switch (data.type) {

      case "postMessage":

        const newMessage = {
          type: "incomingMessage",
          id: uuidv1(),
          username: data.username,
          content: data.content
        }

        // data.id = uuidv1();
        // data.type = "incomingMessage";

        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(newMessage));
        });
        break;

      case "postNotification":

        const newNotification = {
          type: "incomingNotification",
          id: uuidv1(),
          content: data.content
        }

        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(newNotification));
        });

        break;


    }











  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));


});

