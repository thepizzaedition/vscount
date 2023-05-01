const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let count = 0;

io.on('connection', function(socket) {
  count++;
  io.emit('userCount', count);
  socket.on('disconnect', function() {
    count--;
  })
})

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(1337, function() {
  console.log("Your app is listening on port");
})
