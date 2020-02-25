import { config } from 'dotenv';
config();
import express from 'express';

const app = express();

let pingCount = 0;

app.get('/api/file', (req, res) => {
    pingCount++;
    if (pingCount%2 === 0) {
        res.sendFile('189838.pdf', {root : __dirname})
    } else {
        res.status(500).send('Internal error');
    }
    
});

app.listen(5000, () => `Server running on 3007`);