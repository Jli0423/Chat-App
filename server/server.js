const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
//load into public folder
const publicPath = path.join(__dirname, '../public');

//heroku port config
const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//using html file
app.use(express.static(publicPath));

//event listener (check for a new connection)
io.on('connection', (socket)=>{
  console.log('new user connected');

  socket.on('join', (params, callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //send to joined user when connected
    socket.emit('newMessage', generateMessage("Admin", "Welcome to chat app"));
    //send to everyone else when user connects
    socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} joined the room`));
    callback();
  });

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    //verifies to client message was receieved
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
