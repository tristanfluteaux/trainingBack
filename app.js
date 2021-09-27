
const express = require('express')
const app = express()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.status(200).send('je suis dans le /')
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});