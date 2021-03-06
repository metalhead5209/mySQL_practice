const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dbinstance = require('./dbConnect');



// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// POST
app.post('/public/add', (req, res) => {
    let { name } = req.body;
    const db = dbinstance.getDbInstance();
    const result = db.insertNewEmp(name);
    result
    .then(data => res.json({ data: data }))
    .catch(err => console.log(err));
    
})



// RENDER
app.get('/public/all', (req, res) => {
    const db = dbinstance.getDbInstance();
    const result = db.getData()
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})




// DELETE
app.delete('/public/delete/:ID', (req, res) => {
    const { ID } = req.params;
    const db = dbinstance.getDbInstance();
    const result = db.deleteEmpById(ID);
    result
    .then(data => res.json({success: data}))
    .catch(err => console.log(err));
})


// PORT
app.listen(process.env.PORT,
    () => {
        console.log('Running on Port 5252')
});