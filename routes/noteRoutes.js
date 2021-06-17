import express from 'express';
import {noteController} from '../controller/noteController.js';

const router = express.Router();

router.get('/notes', noteController.readNotes);
router.post('/notes', noteController.createNote);
router.get('/notes/:id/', noteController.readNote);
router.delete('/notes/:id/', noteController.deleteNote);

export const noteRoutes = router;
