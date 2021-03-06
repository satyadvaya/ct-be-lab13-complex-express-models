const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');

const app = express();

app.use(express.json());

app.use('/api/species', require('./controllers/species.js'));

app.use('/api/animals', require('./controllers/animals.js'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
