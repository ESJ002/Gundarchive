require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('./index.js')

const username = 'luigi'
const myPlaintextPassword = 'luigi';
const saltRounds = 10;

const sql = `
INSERT INTO 
    users 
    (username, password_digest, is_admin) 
VALUES 
    ($1, $2, $3)
RETURNING
    *;
`

bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
        
        db.query(sql, [username, hash, 'false'], (err, result) => {
            if (err) {
            console.log(err)
            }

            console.log(result.rows[0]);
        })
    })
})