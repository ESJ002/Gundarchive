const express = require('express')
const db = require('../db')
const router = express.Router()
const bcrypt = require('bcrypt')
const createNewUser = require('../middlewares/create_new_user')

router.get('/login', (req,res) => {
    res.render('login')
})

router.post('/login', (req,res) => {
    // 1. Get email and password from request
    const username = req.body.username
    const plainTextPassword = req.body.password

    const sql = `
    SELECT * 
    FROM users
    WHERE username = $1;
    `

    db.query(sql, [username], (err, result) => {
        const user = result.rows[0];

        if (err) {
            console.log(err);
        }

        if (result.rows.length === 0) {
            console.log('User not found');
            return res.render('login')
        }

        const hashedPassword = user.password_digest
        bcrypt.compare(plainTextPassword, hashedPassword, (err, isCorrect) => {
            if (err) console.log(err);

            if (!isCorrect) {
                console.log(`Password is incorrect`);
                return res.render('login')
            }
            
            req.session.userID = user.id
            res.redirect(`/profile/${user.username}`)

        })
        
    })
    
})


router.get('/newuser', (req,res) => {

    res.render(`newuser`)
})

router.post('/newuser', (req,res) => {

    const username = req.body.username
    const password = req.body.password

    createNewUser(username, password)
    res.redirect('/login')
        
    })
    


router.delete('/logout', (req,res) => {
    req.session.userID = null
    res.redirect('/login')
})

module.exports = router