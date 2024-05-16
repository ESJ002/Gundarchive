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
                if (favourite.fav_kit_id === kit.id) {
                    inFavourites = true
                    favouriteID = favourite.id
                }
            }
            res.render('kit', {kit: kit, inFavourites: inFavourites, favouriteID: favouriteID})
        })
        
    })
})

router.get('/viewkits/:page', (req,res) => {
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
        const pageNum = Number(req.params.page)

        const page = {
            current: pageNum,
            next: pageNum + 1,
            previous: pageNum - 1
        }
        res.render('viewkits',{allKits: kits, page: page, gradeID: null, seriesID: null ,fromGrades: false, fromSeries: true})
    }) 
})

router.get('/series', (req,res) => {
    db.query(`SELECT * from series;`, (err, result) => {
        const series = result.rows
        res.render('series',{series:series})
       })
})

router.get('/series/:series/:page', (req,res) => {
    const seriesID = req.params.series
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
    WHERE series_id = $1
    ORDER BY date desc;`
    
    , [seriesID], (err, result) => {
        
        const kits = result.rows
        console.log(kits);
        const pageNum = Number(req.params.page)

        const page = {
            current: pageNum,
            next: pageNum + 1,
            previous: pageNum - 1
        }
        res.render('viewkits',{allKits: kits, page: page, gradeID: null, seriesID: seriesID ,fromGrades: false, fromSeries: true})
    }) 
})

router.get('/grades', (req,res) => {
    db.query(`SELECT * from grades;`, (err, result) => {
        const grades = result.rows
        res.render('grades',{grades:grades})
       })
})

router.get('/grades/:grade/:page', (req,res) => {
    const gradeID = req.params.grade
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
    WHERE grade_id = $1
    ORDER BY date desc;`
    
    , [gradeID], (err, result) => {
        
        const kits = result.rows
        console.log(kits);
        const pageNum = Number(req.params.page)

        const page = {
            current: pageNum,
            next: pageNum + 1,
            previous: pageNum - 1
        }
        res.render('viewkits',{allKits: kits, page: page, gradeID: gradeID, seriesID: null, fromGrades: true, fromSeries: false})
    }) 
})

module.exports = router