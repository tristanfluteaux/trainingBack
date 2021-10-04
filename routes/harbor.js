const express = require('express')
const mysql = require('../config/db')

const router = express.Router()

router.get('/', (req, res) => {
    const sql = "SELECT * FROM harbor"
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving harbor from the db")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM harbor WHERE id = ?'
    const values = [id]
    mysql.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error retrinving from db')
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.post('/', (req, res) => {
    const sql = 'INSERT INTO harbor (harborName) VALUES (?)'
    console.log(req.body)
    const values = [req.body.harborName]
    mysql.query(sql, values, (err, result) => {
        if(err) {
            res.status(500).send('Error retriving from db')
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})



module.exports = router