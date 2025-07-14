const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/log');
const shorturlRoutes = require('./routes/shorturl');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(logger); // custom middleware

app.use('/', shorturlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
