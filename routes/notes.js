import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile, appendFile } from 'fs/promises';

const notes = Router();

notes.get('/', async (req, res) => {
    try {
        const data = await readFile('./db/db.json') || [];
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(`Error: couldn't read file - ${err}`);
    }
});

notes.get('/:id', async (req, res) => {

    const noteId = req.params.id;

    try {
        const data = await readFile('./db/db.json') || [];
        const notes = JSON.parse(data);
        const requestedNote = notes.filter(note => note.id === noteId);
        
        if (requestedNote.length > 0) {
            return res.json(requestedNote);
        }

        return res.json('No note with that ID');

    } catch (err) {
        console.error(`Error: couldn't read file - ${err}`);
    }
});

notes.post('/', async (req, res) => {

    try {
        const { title, text } = req.body;

        if (req.body) {
            const newNote = {
                title,
                text,
                id: uuidv4()
            }

            const data = await readFile('./db/db.json') || [];
            const notesDb = JSON.parse(data);
            notesDb.push(newNote);
            await writeFile('./db/db.json', JSON.stringify(notesDb));
            res.json(`Note added - ${newNote}`);

        } else {
            res.error(`Note incomplete - ${req.body}`);
        }
    } catch (err) {
        console.error(`Error: couldn't write file - ${err}`);
    }
});

notes.delete('/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const data = await readFile('./db/db.json') || [];
        const noteDb = JSON.parse(data);
        const noteRemoved = noteDb.filter(note => note.id !== noteId);
        await writeFile('./db/db.json', JSON.stringify(noteRemoved));
        res.json(`Note ${noteId} deleted`);
    } catch (err) {
        console.error(`Error: unable to delete note - ${err}`);
    }
});

export { notes };