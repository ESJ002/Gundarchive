const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/profile/:username', (req,res) => {
        db.query(`SELECT * FROM completed WHERE comp_user_id = $1` ,[res.locals.currentUser.id], (err, result) => {
            const completedLength = result.rows.length

            db.query(`SELECT * FROM backlog WHERE back_user_id = $1`,[res.locals.currentUser.id], (err, result) => {
                const backlogLength = result.rows.length
                db.query(`SELECT * FROM favourites WHERE fav_user_id = $1`,[res.locals.currentUser.id], (err, result) => {
                    const favouritesLength = result.rows.length
                    res.render('user', {completedLength: completedLength, backlogLength: backlogLength, favouritesLength: favouritesLength})
                })
            })
        }) 
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

router.post('/backlog', (req,res) => {
    const kitID = req.body.kitID

    db.query(`INSERT INTO backlog (back_user_id, back_kit_id) VALUES ($1, $2)
    ;`
    
    , [res.locals.currentUser.id, kitID], (err, result) => {
        console.log(`${req.body.sku} added to backlog`);
        res.redirect(`/kit/${req.body.sku}`)
    })   
    
})  


router.get('/profile/:username/backlog', (req,res) => {
    db.query(`SELECT 
    backlog.back_kit_id,
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
    backlog
    JOIN kits
    ON (backlog.back_kit_id = kits.id)
    JOIN
    series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)

    WHERE backlog.back_user_id = $1

    ORDER BY backlog.id desc;`
    
    ,[res.locals.currentUser.id], (err, result) => {
        const kits = result.rows
        res.render('viewkits',{kits: kits})
    }) 
})

router.post('/completed', (req,res) => {
    const kitID = req.body.kitID

    db.query(`INSERT INTO completed (comp_user_id, comp_kit_id) VALUES ($1, $2)
    ;`
    
    , [res.locals.currentUser.id, kitID], (err, result) => {
        console.log(`${req.body.sku} added to completed`);
        res.redirect(`/kit/${req.body.sku}`)
    })   
    
})  


router.get('/profile/:username/completed', (req,res) => {
    db.query(`SELECT 
    completed.comp_kit_id,
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
    completed
    JOIN kits
    ON (completed.comp_kit_id = kits.id)
    JOIN
    series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)

    WHERE completed.comp_user_id = $1

    ORDER BY completed.id desc;`
    
    ,[res.locals.currentUser.id], (err, result) => {
        const kits = result.rows
        res.render('viewkits',{kits: kits})
    }) 
})

module.exports = router

