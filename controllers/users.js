const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = (req, res) => {
    console.log(req.body);
    
    if(User.findOne({where: {email: req.body.email}})){
        return res.json({message: 'Email already exists'})
    }
    if(User.findOne({where: {username: req.body.username}})){
        return res.json({message: 'Username already exists'})
    }
    if(req.body.password < 8){
        return res.json({message: 'Password must be at least 8 characters'})
    }
    
    
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