var express = require('express');
var router = express.Router();
var token = require('../authenticated/token');

var User = require('../models/userModel');

router.post(
    '/login' ,
    (req , res , next) => {
        User.findOne({
            $and: [
                {
                    username: req.body.username
                },
                {
                    password: req.body.password
                }
            ]
        })
        .exec((err , data) => {
            if (err) return res.status(400).send(err);
            const jsonWebToken = token.createWebToken(JSON.stringify(data));
                                
            res.status(200).send({
                jsonWebToken
            });
        })
    }
)

router.post(
    '/register' ,
    (req , res , next) => {
        var obj = new User({...req.body , role: 'user'});
        obj.save((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
        });
    }
)

module.exports = router;