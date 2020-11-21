var express = require('express');
const adminAuthenticated = require('../authenticated/adminAuthenticated');
const userAuthenticated = require('../authenticated/userAuthenticated');
const writerAuthenticated = require('../authenticated/writerAuthenticated');
var router = express.Router();
var News = require('../models/newsModel');

/* GET all. */
router.get(
    '/', 
    adminAuthenticated ,
    (req, res, next) => {
    News.find().exec((err, data)=>{
        if (err) return res.status(400).send(err);
        return res.status(200).send(data);
    });
});

/* GET by user id. */
router.get(
    '/by/:_id', 
    adminAuthenticated ,
    (req, res, next) => {
    News.findById(req.params._id).exec((err, data)=>{
        if (err) return res.status(400).send(err);
        return res.status(200).send(data);
    });
});

// GET by own project
router.get(
    "/me", 
    userAuthenticated ,
    (req, res) => {
    News.find({
        $and: [
            {
                project: req.user.project
            } ,
            {
                published: true
            }
        ]
        
    }).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
});

// POST (create new data)
router.post(
    "/", 
    writerAuthenticated ,
    (req, res) => {
    var obj = new News({...req.body , published: false , read: [] , createdBy: req.user._id});
    obj.save((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
    });
});

// PUT (update current data)
router.put(
    "/:_id", 
    writerAuthenticated ,
    (req, res) => {
        const { published , read , createdBy , ...otherBody } = req.body; 
        if(createdBy !== req.user._id) {
            return res.status(400).send('ไม่สามารถแก้ไขงานเขียนนักเขียนอื่นได้'); 
        }
        News.findByIdAndUpdate(req.params._id, otherBody , (err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
        });
});

router.put(
    "/read/:_id" ,
    userAuthenticated ,
    (req, res) => {
        
        News.findById(req.params._id, (err, data) => {
            if (err) return res.status(400).send(err);
            if(!data.project.includes(req.user.project)) {
                return res.status(400).send("ผู้ใช้ไม่ได้อยู่ใน project ของ news");
            }
            if(data.read.includes(req.user._id)) {
                return res.status(400).send("ผู้ใช้เคยอ่านแล้ว");
            }
            data.read = [...data.read , req.user._id];
            data.save();
            res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
        });
});

router.put(
    "/published/:_id" ,
    adminAuthenticated ,
    (req, res) => {
        News.findByIdAndUpdate(req.params._id, {published: req.body.published}, (err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
    });
});

// DELETE (delete 1 data)
router.delete(
    "/:_id", 
    adminAuthenticated ,
    (req, res) => {
    News.findByIdAndDelete(req.params._id, (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("ลบข้อมูลเรียบร้อย");
    });
});

module.exports = router;
