const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passportSetup = require('./config/passport');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(encodeURI(process.env.DB), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected succesfully`))
  .catch(err => console.log(err));

// Mongoose promise depricated, override with node
mongoose.Promise = global.Promise;

// Helps with CORS when accessing the API from different domains
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());

app.use('/api/events', require('./routes/api'));
app.use('/api/login', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
