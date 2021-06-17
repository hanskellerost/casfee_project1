import express from 'express';
import bodyParser from 'body-parser';
import {noteRoutes} from './routes/noteRoutes.js';

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(noteRoutes);

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`);
});

/*
Fragen an Michael Gfeller

- Es gibt ja im Frontend und im Backend je ein Model z.B. für Note kann dort auch dasselbe verwendet werden?




*/