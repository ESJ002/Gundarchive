

const bcrypt = require('bcrypt')
const db = require('../db');
const setCurrentUser = require('./set_current_user');


function createNewUser (newUsername, newPassword) {
    

const username = newUsername
const myPlainTextPassword = newPassword
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
    bcrypt.hash(myPlainTextPassword, salt, (err, hash) => {
        
        db.query(sql, [username, hash, 'false'], (err, result) => {
            if (err) {
            console.log(err)
            }
            console.log(result.rows[0]);
        })
    })
})

}

module.exports = createNewUser