const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=>{
    var from = "justin";
    var text = "hi";
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});


describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    var from = "Justin";
    var lat = 1;
    var lng = 1;
    var locationMessage = generateLocationMessage(from, lat, lng);
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(`https://www.google.com/maps?q=1,1`);
  });
});
