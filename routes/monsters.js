const express = require("express")
const mysql = require("../config/db")

const router = express.Router()

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM monsters'
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('You watch but dont see monsters here')
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM monsters WHERE id = ?'
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
    const sql = 'INSERT INTO monsters (monsterName, Type) VALUES (?, ?)'
    console.log(req.body)
	const values = [req.body.monsterName, req.body.Type ]
    mysql.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error retrinving from db')
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const monsterToUpdate = req.body;
    const sql = 'UPDATE monsters SET ? WHERE id = ?'
    console.log(req.body)
    mysql.query(sql, [monsterToUpdate, id],  (err, result) => {
        if (err) {
            res.status(500).send('Error retrinving from db')
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

module.exports = router