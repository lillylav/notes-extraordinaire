const router = require('express').Router();
const fs = require('fs');
let { notes } = require('../../db/db.json');
const { createNewNote, validateNote } = require('../../lib/notes');


// display notes if any in array
router.get('/notes', (req, res) => {
    notes = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'));

    if(notes.length >= 0) {
        res.json(notes);
    } else {
        return;
    }
});

// post newly created note to the db.json file
router.post('/notes', (req, res) => {
    let noteModel = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 100000)
    };

    notes.push(noteModel);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    res.json(notes);
});

// 
router.delete('/notes/:id', (req, res) => {
    let keeperNotes = [];

    for(var i = 0; i < notes.length; i++) {
        if(notes[i].id != req.params.id) {
            keeperNotes.push(notes[i]);
        }
    };

    notes = keeperNotes;

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    res.json(notes);
});

module.exports = router;