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
        res.redirect(`/kit/${sku}`)
    })
})

module.exports = router


router.get('/update/:id', (req,res) => {
    const sql = `
    SELECT * FROM kits WHERE id = $1;
    `   
    db.query(sql, [req.params.id], (err,result) => {
        
        let kit = result.rows[0];
        console.log(kit);
    
    res.render('updatekit', {kit: kit})
    })
})

router.put('/update/:id', (req,res) => {
    let name = req.body.name
    let gradeID = req.body.gradeID
    let seriesID = req.body.seriesID
    let date = req.body.date
    let sku = req.body.sku
    let imageURL = req.body.imageURL
    let id = req.params.id

    let values = [name, gradeID, seriesID, date, sku, imageURL, id]
    const sql = `
    UPDATE kits set
        name = $1,
        grade_id = $2,
        series_id = $3,
        date = $4, 
        sku = $5, 
        image_url = $6
    WHERE
        id = $7;
    `   
    db.query(sql, values, (err, result) => {
        console.log(`${name} updated in Kits Database`);
        res.redirect(`/kit/${sku}`)
    })
})