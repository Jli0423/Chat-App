const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
//load into public folder
const publicPath = path.join(__dirname, '../public');

//heroku port config
const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


//using html file
app.use(express.static(publicPath));

//event listener (check for a new connection)
io.on('connection', (socket)=>{
  console.log('new user connected');

  //send to joined user when connected
  socket.emit('newMessage', generateMessage("Admin", "Welcome to chat app"));
  //send to everyone else when user connects
  socket.broadcast.emit('newMessage', generateMessage("Admin", "A new user joined the room"));

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    //verifies to client message was receieved
    callback('This is from the server');
  });

  socket.on('disconnect', ()=>{
    console.log('user was disconnected');
  });
});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
