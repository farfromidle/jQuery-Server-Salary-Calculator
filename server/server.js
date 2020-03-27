const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

// GET & POST Routes go here

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
