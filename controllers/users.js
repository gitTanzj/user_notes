const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = async (req, res) => {
    console.log(req.body);
    
    const emails = await User.findAll({where: {email: req.body.email}})
    if(emails.length > 0){
        return res.json({message: 'Email already exists'})
    }

    const users = await User.findAll({where: {username: req.body.username}})
    if(users.length > 0){
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

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const emails = await User.findAll({ where: {email: email} })
    if(emails.length > 0){
        bcrypt.compare(password, emails[0].password, (err, result) => {
            if(result){
                req.session.user = {
                    username: User.username,
                    user_id: User.id
                }
                res.json({
                    message: 'User is logged in',
                    user: User,
                    user_session: req.session.user
                })
            } else {
                res.json({message: 'Password is incorrect'})
            }
        })
    } else {
        res.json({message: 'Email is incorrect'})
    }
    
    

}

module.exports = {
    register,
    login
}