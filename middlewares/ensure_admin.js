function ensureAdmin (req, res, next) {
    if (res.locals.isAdmin) {
        next()
    } else {
        res.render('restricted')
    }
}
    
module.exports = ensureAdmin