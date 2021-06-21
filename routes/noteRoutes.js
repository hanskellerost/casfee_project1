import express from 'express';
import {noteController} from '../controller/noteController.js';

const noteRoutes = express.Router();

noteRoutes.get('/notes', noteController.readNotes);
noteRoutes.post('/notes', noteController.createNote);
noteRoutes.get('/notes/:id/', noteController.readNote);
noteRoutes.put('/notes/:id/', noteController.updateNote);
noteRoutes.delete('/notes/:id/', noteController.deleteNote);

export default noteRoutes;
