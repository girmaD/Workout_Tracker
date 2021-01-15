//require modules
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


app.use(logger('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));



//html routes
app.use(require('./routes/htmlRoutes'));
app.use(require('./routes/apiRoutes'));

app.listen(PORT, ()=>{
    console.log('this app is listening to port', PORT)
})