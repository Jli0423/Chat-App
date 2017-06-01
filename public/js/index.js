var socket = io();
//check for connection
socket.on('connect', function(){
  console.log('connected to server');

});
//check for disconnect
socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
