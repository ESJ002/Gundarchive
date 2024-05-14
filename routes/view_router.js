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
    WHERE sku = $1;`
    
    db.query(sql, [req.params.sku], (err,result) => {
        
        let kit = result.rows[0];
        res.render('kit', {kit: kit})
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
        res.render('viewkits',{kits: kits})
    }) 
})




module.exports = router