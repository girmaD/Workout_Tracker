//require modules
const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

//html routes
app.use(require('./routes/htmlRoutes'))

app.listen(PORT, ()=>{
    console.log('this app is listening to port', PORT)
})