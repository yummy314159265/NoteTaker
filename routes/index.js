import express from 'express';
import { notes } from './notes.js';

const api = express();

api.use('/notes', notes);

export { api };