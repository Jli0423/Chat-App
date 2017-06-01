const path = require('path');
const express = require('express');
//load into public folder
const publicPath = path.join(__dirname, '../public');

//heroku port config
const port = process.env.PORT||3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
