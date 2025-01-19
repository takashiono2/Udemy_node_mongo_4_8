const express = require('express');
const app = express();
const tasksRoute = require('./routes/tasks');
const POAT = 3000;

app.use('/api/vi/tasks', tasksRoute);

app.listen(POAT, console.log(`Server is running on port ${POAT}`));