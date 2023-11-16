const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "analisis2"
});

// Ruta para el registro de nuevos usuarios
app.post('/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Verifica si el usuario ya existe en la base de datos
    const checkUserQuery = "SELECT * FROM clientes WHERE email = ?";
    db.query(checkUserQuery, [email], (checkErr, checkData) => {
        if (checkErr) {
            return res.json({ error: true, message: "Error al verificar el usuario" });
        }

        if (checkData.length > 0) {
            return res.json({ error: true, message: "El usuario ya existe" });
        }

        // Inserta un nuevo usuario con nombre y apellido
        const insertUserQuery = "INSERT INTO clientes (email, psw, nombre, apellido) VALUES (?, ?, ?, ?)";
        db.query(insertUserQuery, [email, password, firstName, lastName], (insertErr) => {
            if (insertErr) {
                return res.json({ error: true, message: "Error al registrar el usuario" });
            }

            return res.json("Registrado exitosamente");
        });
    });
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM clientes WHERE email = ? AND psw = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({ error: true, message: "Error en la consulta" });
        }

        if (data.length > 0) {
            return res.json("logeado");
        } else {
            return res.json({ error: true, message: "Credenciales incorrectas" });
        }
    });
});

app.listen(8081, () => {
    console.log("Servidor iniciado en el puerto 8081");
});
