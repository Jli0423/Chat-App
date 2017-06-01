const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
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
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to chat',
    createdAt: new Date().getTime()
  });
  //send to everyone else when user connects
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) =>{
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()=>{
    console.log('user was disconnected');
  });
});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
