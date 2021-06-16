const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
// const { Console } = require("console");
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});

const app =express();
// console.log(process.env.DATABASE_HOST)

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error){
        console.log(eroor)
    } else {
        console.log("MYSQL Connected...")
    }
})

// app.get("/",(req,res) => {
//     res.send("<h1>home page</h1>")
//     res.render("index");
// });

// app.get("/register",(req,res) => {
//     res.render("register");
// });

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000,()=>{
    console.log("server started on port 5000");
})