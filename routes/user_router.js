const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/profile/:username', (req,res) => {
    
    res.render('user')
})  

router.post('/favourites', (req,res) => {
    const kitID = req.body.kitID

    db.query(`INSERT INTO favourites (fav_user_id, fav_kit_id) VALUES ($1, $2)
    ;`
    
    , [res.locals.currentUser.id, kitID], (err, result) => {
        console.log(`${req.body.sku} added to favourites`);
        res.redirect(`/kit/${req.body.sku}`)
    })   
    
})  


router.get('/profile/:username/favourites', (req,res) => {
    db.query(`SELECT 
    favourites.fav_kit_id,
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
    favourites
    JOIN kits
    ON (favourites.fav_kit_id = kits.id)
    JOIN
    series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)

    WHERE favourites.fav_user_id = $1

    ORDER BY favourites.id desc;`
    
    ,[res.locals.currentUser.id], (err, result) => {
        const kits = result.rows
        res.render('viewkits',{kits: kits})
    }) 
})

module.exports = router

