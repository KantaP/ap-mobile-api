// foodmodel.js

var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    firstName: {
      type: String ,
      required: true
    },
    lastName: {
      type: String ,
      required: true
    },
    // กำหนดข่าวที่สามารถเห็นได้
    project: {
      type: String ,
      required: true
    },
    // กำหนดโรลในการทำงานต่างๆ เช่น เพิ่มข่าว เผยแพร่ข่าว ลบข่าว อัพเดทข่าว
    // (admin , writer , user)
    role: {
      type: String ,
      required: true
    },
    username: {
      type: String ,
      select: false ,
      required: true
    },
    password: {
      type: String ,
      select: false ,
      required: true
    }
  },
  { 
    collection: "USERS" , 
  }
);

var User = mongoose.model("users", userSchema);
module.exports = User;