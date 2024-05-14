function ensureLoggedIn (req, res, next) {
    if (res.locals.isLoggedIn) {
        next()
    } else {
        res.send('Please Log In First')
    }
}
    
module.exports = ensureLoggedIn