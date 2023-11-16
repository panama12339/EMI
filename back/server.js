const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app =express();

app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "analisis2"
});


app.post('/login',(req, res)=>{
    const sql = "SELECT * FROM clientes WHERE email = ? AND psw = ?";
    db.query(sql,[req.body.email, req.body.password] , (err,data) => {
        if(err) return res.json("noo :(");
        if(data.length > 0){
            return res.json("logeado");
        }else{
            return res.json("no logeado");
        }
    })
})
app.listen(8081,()=>{
    console.log("siii..")
})