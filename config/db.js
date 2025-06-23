const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

    // host:localhost,
    // user: root,
    // password: admin,
    // database: student_db
})

connection.connect((err)=>{
    if(err) throw err;
    console.log("MySQL connected..");
})

module.exports = connection;