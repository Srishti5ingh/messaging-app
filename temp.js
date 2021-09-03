var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var sockets = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/temp.html');
});

io.on("connection", (socket) => {
  socket.on("init", (userId) => {
    sockets[userId] = socket;
  });
  socket.on("message", function (data) {
    if (sockets[data.receiverId]) {
      console.log("logging........");
      sockets[data.receiverId].emit("message", data);
    }
  });
  socket.on("disconnect", (userId) => {
    delete sockets[userId.senderId];
  });
});

http.listen(3000, () => {
    console.log('listening on: 3000');
});