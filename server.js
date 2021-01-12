//require modules
const { urlencoded } = require('express');
const e = require('express');
const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

require('./routes/htmlRoutes')(app);

app.listen(PORT, ()=>{
    console.log('this app is listening to port', PORT)
})