import { config } from 'dotenv';
config();
import express from 'express';

const app = express();

let pingCount = 0;

app.get('/api/file', (req, res) => {
    pingCount++;
    if (pingCount%2 === 0) {
        setTimeout(() => {
            res.sendFile('189838.pdf', {root : __dirname})
        }, 2000);
    } else {
        setTimeout(() => {
            res.status(503).send('Service Unavailable');
        }, 2000);
    }
    
});

app.listen(5000, () => `Server running on 3007`);