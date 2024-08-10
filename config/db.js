// const mysql = require('mysql');
// require('dotenv').config();

// // const connection = mysql.createPool({
// //     host: process.env.DB_HOST,
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DB_NAME,
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0
// // });
// let connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
    
// })
// connection.connect((err,result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("databases connected")
//     }

// })

// module.exports = connection;


// const mysql = require('mysql');
// require('dotenv').config(); // Load environment variables from .env file

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection error:', err);
//         process.exit(1);
//     }
//     console.log('Database connected');
// });

// module.exports = db;


const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

module.exports = db;
