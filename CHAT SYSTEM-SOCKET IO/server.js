const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('index');
});

const onlineCount = {};

io.on('connection', (socket) => {

 

  socket.on('join', (room, name, myname) => {
    socket.join(room);
    socket.name = name;
    socket.room = room;
    socket.myname = myname;
    socket.broadcast.to(room).emit('message', `${name} has joined the room.`);
    socket.emit('message', `You have joined the room(${room}) as ${name}.`);

     
     onlineCount[room] = onlineCount[room] ? onlineCount[room] + 1 : 1;

    
     io.to(room).emit('onlineCount', onlineCount[room]);


  });
  

  socket.on('message', (message) => {
    io.to(socket.room).emit('message', `${socket.name}: ${message}`);
  });

  socket.on('disconnect', () => {
    if (onlineCount[socket.room]) {
      
      onlineCount[socket.room]--;

      io.to(socket.room).emit('onlineCount', onlineCount[socket.room]);
    }

    socket.broadcast.to(socket.room).emit('message', `${socket.name} has left the room.`);
    socket.leave(socket.room);
  });
});
http.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
