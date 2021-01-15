//require modules
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

//set port variable for remote and local
const PORT = process.env.PORT || 3000;

// declate app to be express invoked as a function
const app = express();

// mongoose connet either to remote env variable for deployment or to local db called workout
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// app use logger(morgan) to log data
app.use(logger('dev'));

// parsing req.body coming from the frontend
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// use startic filed in the public folder
app.use(express.static('public'));



//html routes adn apiRoutes
app.use(require('./routes/htmlRoutes'));
app.use(require('./routes/apiRoutes'));

// listening to port
app.listen(PORT, ()=>{
    console.log('this app is listening to port', PORT)
})