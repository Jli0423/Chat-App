var socket = io();
//check for connection
socket.on('connect', function(){
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'justin',
    text: 'this is meeee'
  });
});
//check for disconnect
socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
