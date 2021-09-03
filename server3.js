var app = require('express')();
var http = require("http").createServer(app);
var io = require('socket.io')(http);
var sockets = {};
//var userId = {};
var count = 0;
var people = {};
var user1 = "roxy";

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index3.html');
});




io.on('connection', socket => {
  socket.on('init', (userId) => {
    sockets[userId.senderId] = socket;
  
    //console.log("printing socket?", sockets[userId.senderId]);
  });
  socket.on('message', function(data) {
    
    
    

    if (sockets[data.receiverId]) {
      console.log("logging........");
      sockets[data.receiverId].emit('message', data);
    }   // from the blog -- doesn't work

  
    //msg to itself (bcoz its sending to its own room?) ---

    //io.to(socket.id).emit('message', data);
    //io.to(sockets[data.receiverId]).emit('message', data);      
    //people[data.senderId] = socket.id;
    //io.to(people[data.senderId]).emit('message', data);

    /*people[data.receiverId] = socket.id;
    console.log(people[data.receiverId])
    if(sockets[sockets.socket === data.senderId]){
      io.to(people[data.receiverId]).emit('message', data);
    } */ 
    
    
      
  });

  socket.on('disconnect', (userId) => {
    delete sockets[userId.senderId];
  });
});














http.listen(3000, () => {
    console.log('listening on: 3000');

});
