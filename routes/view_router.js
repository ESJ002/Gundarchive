const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/kit/:sku', (req, res) => {

    const sku = req.params.sku
    const sql = `
    SELECT 
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
    JOIN 
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)
    WHERE 
        sku = $1
    ;`
    
    db.query(sql, [sku], (err,result) => {
        if (err) console.log(err)
        
        let kit = result.rows[0];
        const currentUserID = res.locals.currentUser.id

        db.query('SELECT * FROM favourites where fav_user_id = $1;', [currentUserID], (err,result) => {
            if (err) console.log(err)

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

    const sql = `
    SELECT 
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
    JOIN 
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)
    ORDER BY 
        date desc
    ;`

    db.query(sql, (err, result) => {
        if (err) console.log(err)

        const kits = result.rows
        const pageNum = Number(req.params.page)

        const page = {
            current: pageNum,
            next: pageNum + 1,
            previous: pageNum - 1
        }

        res.render('viewkits', {allKits: kits, page: page})
    }) 

})

router.get('/series', (req,res) => {

    db.query(`SELECT * from series;`, (err, result) => {
        if (err) console.log(err)

        const series = result.rows

        res.render('series',{series:series})

    })
})

router.get('/series/:series/:page', (req,res) => {

    const seriesID = req.params.series
    const sql = `
    SELECT 
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
    JOIN 
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)
    WHERE 
        series_id = $1
    ORDER BY 
        date desc
    ;`

    db.query(sql, [seriesID], (err, result) => {
        if (err) console.log(err)
        
        const kits = result.rows
        const pageNum = Number(req.params.page)

        const page = {
            current: pageNum,
            next: pageNum + 1,
            previous: pageNum - 1
        }

        res.render('viewseries',{allKits: kits, page: page, seriesID: seriesID})

    }) 

})

router.get('/grades', (req,res) => {

    db.query(`SELECT * from grades;`, (err, result) => {
        if (err) console.log(err)

        const grades = result.rows

        res.render('grades',{grades:grades})

    })

})

router.get('/grades/:grade/:page', (req,res) => {

    const gradeID = req.params.grade
    const sql = `
    SELECT 
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
    JOIN 
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)
    WHERE 
        grade_id = $1
    ORDER BY 
        date desc
    ;`

    db.query(sql, [gradeID], (err, result) => {
        if (err) console.log(err)
        
        const kits = result.rows
        const pageNum = Number(req.params.page)

        const page = {
            current: pageNum,
            next: pageNum + 1,
            previous: pageNum - 1
        }

        res.render('viewgrades',{allKits: kits, page: page, gradeID: gradeID})

    })

})

module.exports = router