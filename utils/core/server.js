import express from 'express';
import folderName from './folderName.js';

const app = express();
app.use('/files', express.static(folderName));

export default app;

