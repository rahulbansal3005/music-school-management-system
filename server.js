const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/default');
const flash=require('connect-flash');
const session=require('express-session');
const app=express();
const passport =require('passport');

// passport config


app.use(express.json());
const db = config.mongoURI;

mongoose.connect(db)
    .then(()=>console.log('connected to Database!'))
    .catch((e)=>console.log('Oh No! '+e));



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));




//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes/index'));
require('./config/passport')(passport);
app.listen(5000);