// foodmodel.js

var mongoose = require("mongoose");

var newsSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String ,
        required: true
    },
    // ระบุเพื่อกำหนดให้แสดงในกลุ่ม user ที่แตกต่างกัน
    project: {
        type: String ,
        required: true
    },
    // เผยแพร่
    published : {
        type : Boolean ,
        required: true
    },
    read: {
        type : [String] ,
        required: true
    }
  },
  {
    collection: "NEWS"
  }
);

var News = mongoose.model("news", newsSchema);
module.exports = News;