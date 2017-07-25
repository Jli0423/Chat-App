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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text : message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  // console.log('newMessage', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url : message.url,
    from : message.from,
    createdAt : formattedTime
  });
  jQuery('#messages').append(html);
  // //puts on list
  // var li = jQuery('<li></li>');
  // //create link text and open in new tab (_blank)
  // var a = jQuery('<a target = "_blank">My current Location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // //adding reference link
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

//using jquery to display messages on UI instead of console
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox= jQuery('[name = message]');

  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser');
  }
  // disables button after click to prevent spam
  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    location.Buttn.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  })
});
