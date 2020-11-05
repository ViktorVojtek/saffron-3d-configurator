const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const port = 3212;

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', () => {
  res.render('index.html');
});

app.listen(port, () => {
  console.log(`> Saffron webgl viewer app is listening on port: ${port}`);
});
