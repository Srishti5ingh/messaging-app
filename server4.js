var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const { timeStamp } = require("console");
var mongoose = require('mongoose');
var Schema = mongoose.schema

var sockets = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index4.html');
});



//declare schema
const chatMsgSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String
});
// create new doc 
const chatMsgModel = mongoose.model('chatMsgModel', chatMsgSchema);

//Set up mongoose connection
var DBURI = 'mongodb://localhost:27017/chatTest';
async function test() {
  await mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  //const chatMsgDoc = await chatMsgModel.create({senderId:'00'});
  //console.log(chatMsgDoc);
}

test();




io.on("connection", (socket) => {
  socket.on("init", (userId) => {
    sockets[userId] = socket;
  });
  socket.on("message", async (data) => {
    if (sockets[data.receiverId]) {
      console.log("msg received........");
      sockets[data.receiverId].emit("message", data);
    }
  //save it in the database
  //const chatMsgModel = mongoose.model('chatMsgModel', chatMsgSchema);
  const newchat = await chatMsgModel.create({senderId:data.senderId, receiverId: data.receiverId, message:data.text});

    });

  

  socket.on("disconnect", (userId) => {
    delete sockets[userId.senderId];
  });

});





http.listen(3000, () => {
    console.log('listening on: 3000');
});