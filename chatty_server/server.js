// server.js

const express = require('express');
const SocketServer = require('ws').Server;

const querystring = require('querystring');
const fetch = require('node-fetch');

const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Variable to keep track of current users
let numUsers;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');
  console.log("Current users online ", wss.clients.size);

  numUsers = {
    type: "userUpdate",
    numUsers: wss.clients.size
  };

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(numUsers));
  });


  ws.on("message", function incoming(message) {

    let data = JSON.parse(message);
    // console.log(data);

    switch (data.type) {

      case "postMessage":

        const newMessage = {
          type: "incomingMessage",
          id: uuidv4(),
          username: data.username,
          content: data.content
        }

        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(newMessage));
        });



        // Query params for Dialogflow
        let qs = querystring.stringify({
          v: '20150910',
          lang: 'en',
          sessionId: '123456789',
          timezone: 'America/New_York',
          query: data.content
        });

        // Options and header auth key
        let options = {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ae92ca0e4549496cb27e77e193b0116d'
          }

        }

        // Fetch request to Dialogflow api
        fetch(`https://api.dialogflow.com/v1/query?${qs}`, options)
          .then(resp => { return resp.json() })
          .then(json  => {

            // If response is successful
            if (json.result.score == 1) {

              // Creates new message from Df reply
              let botMsg = {
                type: "incomingMessage",
                username: "Botty",
                id: uuidv4(),
                content: json.result.fulfillment.speech
              };

              // Sends out bot reply to clients
              setTimeout(() => {
                wss.clients.forEach(function each(client) {
                  client.send(JSON.stringify(botMsg));
                });

              }, 500);

            }

          });


        break;

      case "postNotification":

        const newNotification = {
          type: "incomingNotification",
          id: uuidv4(),
          content: data.content
        }

        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(newNotification));
        });

        break;

    }


  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')


    numUsers = {
      type: "userUpdate",
      numUsers: wss.clients.size
    };

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(numUsers));
    });

  });

});

