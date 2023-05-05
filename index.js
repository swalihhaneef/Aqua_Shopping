const express = require('express');
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/userModel')
const session=require('express-session')
const config=require("./config/config");
const nocache = require('nocache')
const path = require('path')
app.use(nocache())
// const logger=require('morgan')
// app.use(logger('dev'))
const bodyParser=require('body-parser')


require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs');


const userRouter = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const errorRoute = require('./routes/errorRoute')
 //app.use(express.static(path.join(__dirname,('../public'))))
 app.use(session({
    secret:process.env.sessionSecret,
    resave: true,
    cookie:({maxAge:6000000}),
    saveUninitialized: true
}))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongo, (err) => {
    if (err) {
        console.log('DataBase not connected')
    } else {
        console.log('DataBase connected successfully');
    }
})
app.use('/', userRouter);

app.use('/admin', adminRoute);

app.use('/',errorRoute)


app.listen(5000, () => {
    console.log("Server is running on port :5000");
})



