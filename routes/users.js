var express = require('express');
const adminAuthenticated = require('../authenticated/adminAuthenticated');
const userAuthenticated = require('../authenticated/userAuthenticated');
const userOrWriterAuthenticated = require('../authenticated/userOrWriterAuthenticated');
var router = express.Router();
var User = require('../models/userModel');

/* GET all. */
router.get(
  '/', 
  adminAuthenticated ,
  (req, res, next) => {
  User.find().exec((err, data)=>{
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

router.get(
  "/by/:_id", 
  adminAuthenticated ,
  (req, res) => {
  User.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET me
router.get(
  "/me", 
  userOrWriterAuthenticated ,
  (req, res) => {
  User.findById(req.user._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// POST (create new data)
router.post(
  "/", 
  adminAuthenticated,
  (req, res) => {
  var obj = new User(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});

// PUT (update current data)
router.put(
  "/me", 
  userOrWriterAuthenticated ,
  (req, res) => {
  const { role , ...otherBody } = req.body;
  User.findByIdAndUpdate(req.user._id, otherBody , (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
  });
});

// DELETE (delete 1 data)
router.delete(
  "/:_id", 
  adminAuthenticated,
  (req, res) => {
  User.findById(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    if(data.role === 'admin') {
      return res.status(400).send('ไม่สามารถลบ admin ได้');
    }
    data.deleteOne();
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

module.exports = router;
