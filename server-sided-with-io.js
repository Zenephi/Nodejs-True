// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);


// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//     res.render('views/app.ejs');
// });



// const server = http.listen(3000, function() {
//     console.log('listening on *:8080');
// });

var express = require('express');
var app = express();

//iosokets
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');



app.get('/', function(req, res) {
  res.render('index');
});


app.listen(8080);
console.log('Server is listening on port 8080');
