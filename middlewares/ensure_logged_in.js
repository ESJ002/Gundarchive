function ensureLoggedIn (req, res, next) {

    if (res.locals.isLoggedIn) {
        next()

    } else {
        res.render('restricted')
    }
    
}
    
module.exports = ensureLoggedIn