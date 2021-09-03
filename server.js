var app = require('express')();
var http = require("http").createServer(app);
var io = require('socket.io')(http);
//const io = require('socket.io')();
//const chat = io.of('/chat');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index1.html');
});

/*
app.get('/user1', (req, res) => {
    res.sendFile(__dirname + '/user1.html');
});
app.get('/user2', (req, res) => {
    res.sendFile(__dirname + '/user2.html');
});
app.get('/user3', (req, res) => {
    res.sendFile(__dirname + '/user3.html');
});
*/

var sid = ['roxy', 'sandy'];

io.on('connection', socket => {
  socket.on('message', (data) => {
    console.log("data: " + JSON.stringify(data));
    //socket.broadcast.emit(data.toid + " message", data)     // 
    if(data.toid === sid[0] && data.fromid == sid[1] || data.toid === sid[1] && data.fromid === sid[0]){
    socket.broadcast.emit("message", data) }
  })
})











/* 
// Follwing code is an attempt to use customID for private messaging

var user_count = 0;

io.on('connection', socket => {

  
  user_count = user_count + 1;
  console.log("User connected: ", user_count)   // display user count on server
  
  socket.on('disconnect', () => {
    user_count = user_count - 1;  
  })

  socket.emit('display text', user_count);  // send user count to client

  socket.on('username', (msg1) => {         // receive username from client
    console.log('Username:' + msg1);
    var userName = msg1;
    socket.emit('display user', userName);    // send user name to client to display to user
    //console.log('uuu:' + userName);
  })

  socket.on('chat message', (msg) => {
    console.log('message:' + msg); // prints the client msg on the server
    socket.broadcast.emit('chat message', msg);
    
  })

})
 */









/* Following code displays socketId and is a failed attempt to use socketid for private messaging

var users = {};
var sockets = {};

io.on('connection', (socket) => {
    //socket.broadcast.emit('chat message', 'message to receiver from sender');
    sockets[socket.id] = socket; 
        users = socket.id;
        console.log(users)
    socket.on('chat message', (msg) => {
        //console.log('message:' + msg); // prints the client msg on the server
        //io.emit('chat message', msg);  // prints chat msgs from all user to all user
        //socket.broadcast.emit('chat message', msg);
        //socketId = "WHGUAP2FEiZf9C_kAAAA"  // doesnt work
        //io.to(socketId).emit('chat message', 'heya' ) 
    });
    
});


*/








/*

*********** Testing socketIO commands *************


/// NONE OF THESE ARE WORKING
io.of('/chat').clients((error, clients) => {
  if (error) throw error;
  console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
});

io.of('/chat').in('general').clients((error, clients) => {
    if (error) throw error;
    console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
});

io.clients((error, clients) => {
   if (error) throw error;
   console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
});



//io.sockets.emit('hi', 'everyone');
// is equivalent to
//io.of('/').emit('hi', 'everyone');

//const io = require('socket.io')();
//io.emit('an event sent to all connected clients'); 



// *** nothing happens with the following :(
//io.of('/').clients((error, clients) => {
  //if (error) throw error;
  //console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
//});

//io.clients((error, clients) => {
    //if (error) throw error;
    //console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  //});




/// It works, gives socketid and...
var users = {};
var sockets = {};
  io.on('connection', (socket) => {
    socket.join('some room', () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms); // [ <socket.id>, 'room 237' ]
   
      sockets[socket.id] = socket; 
        users = socket.id;
        console.log(users)

        //io.to(users).emit('hey', 'user');
        //io.emit('aaaaaa')

    });

    //socket.on('text someone', (users, msg) => {
        // send a private message to the socket with the given id
         //socket.to(users).emit('my message');


  });

/*
  // Doesnt work
  //io.on('connection', (socket) => {
    //socket.on('say to someone', (id, msg) => {
      // send a private message to the socket with the given id
      //socket.to(id).emit('my message', msg);
    //});
  //});


*/

http.listen(3000, () => {
    console.log('listening on: 3000');

});
