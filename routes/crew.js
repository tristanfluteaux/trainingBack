const express = require('express')
const connection = require('../config/db')
const mysql = require('../config/db')

const router = express.Router()

router.get("/", (req, res) => {
    const sql = "SELECT * FROM crew"
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving crew from the db")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    const sql = "SELECT * FROM crew WHERE id = ?"
    const values = [id]
    mysql.query(sql, values,  (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving this pirate from the db")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.post("/", (req, res) => {
    const sql = "INSERT INTO crew (firstname, lastname) VALUES (?, ?)"
    console.log(req.body)
    const {firstname, lastname} = req.body
    mysql.query(sql, [firstname,lastname],  (err, result) => {
        if (err) {
            res.status(500).send("Error to post this pirate to the db")
        } else {
            const id = result.insertId;
        const createdCrew = { id, firstname, lastname};
            console.table(result)
            res.status(200).json(createdCrew)
        }
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const crewToUpdate = req.body;
    const sql = "UPDATE crew SET ? WHERE id = ?"
    mysql.query(sql, [crewToUpdate, id],  (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving this pirate from the db")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params
    const values = [id];
    const sql = "DELETE FROM crew WHERE id = ?"
    mysql.query(sql, values,  (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving this pirate from the db")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

module.exports = router