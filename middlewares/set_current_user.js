const db = require('../db')

function setCurrentUser(req , res, next) {
    
    res.locals.currentUser = {}
    res.locals.isLoggedIn = false

    if (!req.session.userID) {
        return next()
    }

    const sql = `
    SELECT * FROM users WHERE id = $1;
    `

    db.query(sql, [req.session.userID], (err,result) => {
        if (err) console.log(err);

        let user = result.rows[0]
        res.locals.currentUser = user
        res.locals.isLoggedIn = true

        next()
    })

}

module.exports = setCurrentUser