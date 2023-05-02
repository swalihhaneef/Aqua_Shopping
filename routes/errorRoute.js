const express = require('express')
const app =express()

app.set('view engine','ejs');
app.set('views','./views/users')

app.get('*',(req,res)=>res.render('404'))

module.exports = app