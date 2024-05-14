const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/kit/:id', (req,res) => {
    
    res.render('kit')
})  

router.get('/viewkits', (req,res) => {
    db.query(`SELECT 
    kits.id, 
    kits.name, 
    grade_id, 
    series_id,
    date,
    kits.image_url, 
    series.logo_url series_logo,
    grades.logo_url grades_logo,
    grades.abbreviation
    FROM 
    kits
    JOIN series 
    ON (kits.series_id = series.id)
    JOIN grades
    ON (kits.grade_id = grades.id)
    ORDER BY date;`
    
    , (err, result) => {
        const kits = result.rows
        res.render('viewkits',{kits: kits})
    }) 
})




module.exports = router