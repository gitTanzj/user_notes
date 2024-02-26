const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(user => {
            req.session.user = {
                username: user.username,
                user_id: user.id
            };
            console.log(req.session)
            res.json({
                message: 'New user is registered',
                user: user,
                user_session: req.session.user
            })
        })
    });
}

module.exports = {register}