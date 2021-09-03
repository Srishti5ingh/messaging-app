var mongoose = require("mongoose");

var chatMsgSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String
});

module.exports = mongoose.model("chatMsgs", chatMsgSchema);