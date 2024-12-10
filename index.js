const express = require('express');
const app = express();
const logger = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT;
const conn = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
var md_auth = require('./middlewares/auth');
var multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: 'uploads/image' });

var userController = require('./controllers/users');
var categoriasController = require('./controllers/categorias');
var recetasController = require('./controllers/recetas');

const conexion = conn.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//usuarios
app.post('/users', userController.save);
app.post('/login', userController.login);
app.delete('/users', userController.delete);
app.get('/users', [md_auth.Auth], userController.getAll); // Obtener todos
app.get('/users', userController.getById); // Obtener un usuario por ID
app.put('/users/:id', userController.update);

app.get('/users', userController.getAll); // Obtener todos los usuarios
app.get('/users/:id', userController.getById); // Obtener un usuario por ID específico


//categorias
app.post('/categorias', [md_auth.Auth], categoriasController.save);
app.put('/categorias', categoriasController.update);
app.delete('/categorias', categoriasController.delete);
app.get('/categorias', [md_auth.Auth], categoriasController.getAll);

//recetas postrecitos
app.post('/recetas', [md_auth.Auth, md_upload], recetasController.save);
app.get('/recetas', [md_auth.Auth], recetasController.getAll);
app.delete('/recetas', recetasController.delete);
app.put('/recetas', [md_auth.Auth, md_upload], recetasController.update);

app.get('*', (req, res) => {
    res.send({ message: 'Ruta no válida' });
});

conexion.getConnection((error) => {
    if (error) {
        console.log("No se puede conectar a la base de datos");
    } else {
        console.log("Conectado a la base de datos");
        app.listen(PORT, () => {
            console.log("Servidor de tu API funcionando al 100");
        });
    }
});
