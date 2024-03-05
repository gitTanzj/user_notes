const Notes = require('../models/note')

const getNotes = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    Notes.findAll({
        where: {
            userId: req.session.user.user_id
        }
    })
    .then(notes => {
        res.json(notes)
    })
    .catch(err => {
        console.log(err)
    })
}

const addNote = (req, res) => {
    Notes.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.user_id
    })
    .then(note => {
        res.json({
            message: 'New note is added',
            note: note
        })
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    getNotes,
    addNote
}