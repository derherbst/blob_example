import { config } from 'dotenv';
config();
import express from 'express';

const app = express();

app.get('/api/file', (req, res) => {
    res.sendFile('189838.pdf', {root : __dirname})
});

app.listen(5000, () => `Server running on 3007`);