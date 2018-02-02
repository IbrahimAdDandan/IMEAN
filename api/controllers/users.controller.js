var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.login = function (req, res) {
    console.log('logging in user');
    var username = req.body.username;
    var password = req.body.password;
    User
        .findOne({
            username: username
        })
        .exec(function (err, user) {
            if (err) {
                console.log('error: ' + err);
                res
                    .status(400)
                    .json(err);
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    console.log('user found ' + user);
                    var token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: 3600 });
                    res
                        .status(200)
                        .json({
                            success: true,
                            token: token
                        });
                } else {
                    console.log('unauthorized!');
                    res
                        .status(401)
                        .json('Unauthorized!');
                }
                
            }
        });
};

module.exports.register = function (req, res) {
    console.log('registering user!');
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;
    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function (err, user) {
        if(err) {
            console.log('error: ' + err);
            res
                .status(400)
                .json(err);
        } else {
            console.log('user created!');
            res
                .status(201)
                .json(user);
        }
    });
};

module.exports.authenticate = function (req, res, next) {
    var headerExist = req.headers.authorization;
    if (headerExist) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secretKey', function (error, decoded) {
            if (error) {
                console.log('no header authorized!');
                res
                    .status(401)
                    .json('Unauthorized!');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        console.log('No token provided!');
        res
            .status(403)
            .json('No token provided!!');
    }
};