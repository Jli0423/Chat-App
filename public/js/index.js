var socket = io();
//check for connection
socket.on('connect', function(){
  console.log('connected to server');

});
//check for disconnect
socket.on('disconnect', function(){
  console.log('disconnected from server');
});

//using jquery to display messages on UI instead of console
socket.on('newMessage', function(message){
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name = message]').val()
  }, function(){

  });
});
