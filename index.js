import express from 'express';
import {noteRoutes} from './routes/noteRoutes.js';

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(noteRoutes);

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`);
});

/* Fragen Michael Gfeller
- ES Lint no_param_reassign bei arrow function?
*/
