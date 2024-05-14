const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/newkit', (req,res) => {
    
    res.render('newkit')
})  

router.post('/newkit', (req,res) => {
    let name = req.body.name
    let gradeID = req.body.gradeID
    let seriesID = req.body.seriesID
    let date = req.body.date
    let sku = req.body.sku
    let imageURL = req.body.imageURL

    let values = [name, gradeID, seriesID, date, sku, imageURL]

    const sql = `
    INSERT INTO kits 
        (name, grade_id, series_id, date, sku, image_url)
    VALUES
        ($1, $2, $3, $4, $5, $6);
    `   
    db.query(sql, values, (err, result) => {
        console.log(`${values} added to Kits Database`);
        res.redirect('/newkit')
    })
})

module.exports = router