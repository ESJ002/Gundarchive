const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/kit/:sku', (req, res) => {

    const sql = `SELECT 
    kits.id, 
    kits.name, 
    grade_id, 
    series_id,
    date,
    sku,
    image_url, 
    series.logo_url series_logo,
    series.full_name series_fullname,
    grades.logo_url grades_logo,
    grades.abbreviation grades_abbreviation,
    grades.full_name grades_fullname
    FROM 
    kits
    JOIN series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)
    WHERE sku = $1;`
    
    db.query(sql, [req.params.sku], (err,result) => {
        
        let kit = result.rows[0];

        db.query('SELECT * FROM favourites where fav_user_id = $1;', [res.locals.currentUser.id], (err,result) => {
            let favourites = result.rows
            let favouriteID = null
            let inFavourites = false
            for (let favourite of favourites) {
                console.log(favourite.fav_kit_id);
                console.log(kit.id)
                if (favourite.fav_kit_id === kit.id) {
                    console.log('match found!');
                    inFavourites = true
                    favouriteID = favourite.id
                }
            }
            console.log(inFavourites);
            console.log(favouriteID);
            res.render('kit', {kit: kit, inFavourites: inFavourites, favouriteID: favouriteID})
        })
        
    })
})

router.get('/viewkits', (req,res) => {
    db.query(`SELECT 
    kits.id, 
    kits.name, 
    grade_id, 
    series_id,
    date,
    sku,
    kits.image_url, 
    series.logo_url series_logo,
    grades.logo_url grades_logo,
    grades.abbreviation grades_abbreviation
    FROM 
    kits
    JOIN series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)
    ORDER BY date desc;`
    
    , (err, result) => {
        const kits = result.rows
        db.query

        res.render('viewkits',{kits: kits})
    }) 
})




module.exports = router