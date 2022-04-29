import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile, appendFile } from 'fs/promises';
import { networkInterfaces } from 'os';

const notes = Router();

notes.get('/', async (req, res) => {
    try {
        const data = await readFile('./db/db.json');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(`Error: couldn't read file - ${err}`);
    }
});

notes.get('/:note_id', async (req, res) => {

    const noteId = req.params.note_id;

    try {
        const data = await readFile('./db/db.json');
        const notes = JSON.parse(data);
        const requestedNote = notes.filter(note => note.note_id === noteId);
        
        if (requestedNote.length > 0) {
            return res.json(requestedNote);
        }

        return res.json('No note with that ID');

    } catch (err) {
        console.error(`Error: couldn't read file - ${err}`);
    }
});

export { notes }