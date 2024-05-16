const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/profile/:username', (req,res) => {

    db.query(`SELECT * FROM completed WHERE comp_user_id = $1` ,[res.locals.currentUser.id], (err, result) => {
        if (err) console.log(err)

        const completedLength = result.rows.length

        db.query(`SELECT * FROM backlog WHERE back_user_id = $1`,[res.locals.currentUser.id], (err, result) => {
            if (err) console.log(err)

            const backlogLength = result.rows.length

            db.query(`SELECT * FROM favourites WHERE fav_user_id = $1`,[res.locals.currentUser.id], (err, result) => {
                if (err) console.log(err)

                const favouritesLength = result.rows.length

                res.render('user', { 
                completedLength: completedLength, 
                backlogLength: backlogLength, 
                favouritesLength: favouritesLength
                })

            })

        })

    }) 

})

router.post('/favourites', (req,res) => {

    const currentuserID = res.locals.currentUser.id
    const kitID = req.body.kitID

    db.query(`INSERT INTO favourites (fav_user_id, fav_kit_id) VALUES ($1, $2);`, [currentuserID, kitID], (err, result) => {
        if (err) console.log(err)

        console.log(`${req.body.sku} added to favourites`);
        res.redirect(`/kit/${req.body.sku}`)
    })   
    
})  

router.delete('/favourites',(req,res) => {

    db.query(`DELETE FROM favourites WHERE id = $1;`,[req.body.favID], (err, result) => {
        if (err) console.log(err)

        console.log(`Kit removed from favourites`);
        res.redirect(`/kit/${req.body.sku}`)

    })
})


router.get('/profile/:username/favourites', (req,res) => {

    const sql = `
    SELECT 
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
    JOIN 
        kits
    ON 
        (favourites.fav_kit_id = kits.id)
    JOIN
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)

    WHERE 
        favourites.fav_user_id = $1

    ORDER BY 
        favourites.id desc
    ;`
    
    db.query(sql, [res.locals.currentUser.id], (err, result) => {
        if (err) console.log(err)

        const kits = result.rows

        res.render('favourites',{kits: kits})

    }) 

})

router.post('/backlog', (req,res) => {

    const kitID = req.body.kitID

    db.query(`INSERT INTO backlog (back_user_id, back_kit_id) VALUES ($1, $2);`, [res.locals.currentUser.id, kitID], (err, result) => {
        if (err) console.log(err)

        console.log(`${req.body.sku} added to backlog`);
        res.redirect(`/profile/${res.locals.currentUser.username}/backlog`)

    })   
    
})  

router.delete('/backlog',(req,res) => {

    db.query(`DELETE FROM backlog WHERE id = $1`,[req.body.backID], (err, result) => {
        if (err) console.log(err)

        res.redirect(`/profile/${res.locals.currentUser.username}/backlog`)

    })
})


router.get('/profile/:username/backlog', (req,res) => {

    const sql = `
    SELECT 
        backlog.back_kit_id,
        backlog.id backlog_id,
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
    JOIN 
        kits
    ON 
        (backlog.back_kit_id = kits.id)
    JOIN
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)
    WHERE 
        backlog.back_user_id = $1
    ORDER BY 
        backlog.id desc
    ;`

    db.query(sql, [res.locals.currentUser.id], (err, result) => {
        if (err) console.log(err)

        const kits = result.rows

        res.render('backlog',{kits: kits})

    }) 

})

router.post('/completed', (req,res) => {

    const kitID = req.body.kitID

    db.query(`INSERT INTO completed (comp_user_id, comp_kit_id) VALUES ($1, $2);`, [res.locals.currentUser.id, kitID], (err, result) => {
        if (err) console.log(err)

        console.log(`${req.body.sku} added to completed`);

        if (req.body.fromBacklog === 'true') {

            db.query(`DELETE FROM backlog WHERE id = $1`,[req.body.backID], (err, result) => {
                if (err) console.log(err)

                res.redirect(`/profile/${res.locals.currentUser.username}/completed`)

            })

        } else {

            res.redirect(`/profile/${res.locals.currentUser.username}/completed`)
        }

    })   
    
})  

router.delete('/completed',(req,res) => {

    db.query(`DELETE FROM completed WHERE id = $1`,[req.body.compID], (err, result) => {
        if (err) console.log(err)

        res.redirect(`/profile/${res.locals.currentUser.username}/completed`)

    })

})


router.get('/profile/:username/completed', (req,res) => {

    const sql = `
    SELECT 
        completed.comp_kit_id,
        completed.id comp_id,
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
    JOIN 
        kits
    ON 
        (completed.comp_kit_id = kits.id)
    JOIN
        series 
    ON 
        (kits.series_id = series.id)
    JOIN 
        grades
    ON 
        (kits.grade_id = grades.id)
    WHERE 
        completed.comp_user_id = $1
    ORDER BY 
        completed.id desc
    ;`

    db.query(sql, [res.locals.currentUser.id], (err, result) => {
        if (err) console.log(err)

        const kits = result.rows
      
        res.render('completed',{kits: kits})

    }) 

})

module.exports = router

