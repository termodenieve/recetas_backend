const conn = require('mysql2')
const fs = require('fs');
var path = require('path');

const conexion = conn.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

module.exports = {

    save(req, res) {
        console.log(req.body)
        data = req.body;
        titulo = data.titulo;
        descripcion = data.descripcion;
        instrucciones = data.instrucciones;
        ingredientes = data.ingredientes;
        tiempo_coccion = data.tiempo_coccion;
        id_categoria = data.id_categoria;
        id_user = data.id_user;
        var file = 'sin imagen';
        imagen = file;
        
      
        if (tiempo_coccion === undefined) {
            tiempo_coccion = '0';  
        }

  
        if (req.files) {
            var file_path = req.files.imagen.path;
            var file_split = file_path.split('\/');
            var file_name = file_split[2];
            var ext = file_name.split('\.');
            var file_ext = ext[1];
            if (file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg' || file_ext == 'png') {
                imagen = file_name
            }
        }


        var sql = 'INSERT INTO recetas (titulo, descripcion, instrucciones, ingredientes, tiempo_coccion, imagen, id_user, id_categoria)  VALUES ("'
            + titulo + '", "'
            + descripcion + '", "'
            + instrucciones + '", "'
            + ingredientes + '", ' 
            + tiempo_coccion + ', "'
            + imagen + '",'
            + id_user + ', '
            + id_categoria + ') '
            
           

        
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send('Intenta mas tarde');
            } else {
                console.log(results)
                res.status(201).send({ message: 'receta agregada' })
            }
        })
    },
    update(req, res) {
        data = req.body;
        titulo = data.titulo;
        descripcion = data.descripcion;
        instrucciones = data.instrucciones;
        ingredientes = data.ingredientes;
        tiempo_coccion = data.tiempo_coccion;
        id_categoria = data.id_categoria;
        id_user = data.id_user;
        var file = 'sin imagen';
        imagen = file;

        if (req.files) {
            var file_path = req.files.imagen.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext = file_name.split('\.');
            var file_ext = ext[1];
            if (file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg' || file_ext == 'png') {
                imagen = file_name
            }
        }
        var sql = 'UPDATE recetas SET titulo="' + titulo + '", descripcion= "' + descripcion + '",  instrucciones= "' + instrucciones + '", ingredientes="' + ingredientes + '", id_user="' + id_user + '", id_categoria="' + id_categoria + '",  imagen="' + imagen + '" WHERE idrecetas=' + idrecetas + '';
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send('Intenta mas tarde');
            } else {
                console.log(results)
                res.status(200).send({ message: 'Tarea actualizada' })
            }
        })
    },
    delete(req, res) {
        data = req.body;
        idrecetas = data.idrecetas;
        if (req.user.role == 'Usuario') {
            var sql = 'DELETE FROM recetas WHERE idrecetas=' + idrecetas;
            conexion.query(sql, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Intenta mas tarde');
                } else {
                    console.log(results)
                    res.status(200).send({ message: 'receta eliminada' })
                }
            })
        } else {
            res.status(403).send({ message: 'No tienes permisos' });
        }

    },
    getAll(req, res) {
        console.log(req.user)
        data = req.body;
        id_user = req.query.id_user;
        console.log(data)
        var sql = 'SELECT * FROM recetas WHERE id_user = ' + id_user + '';
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send('Intenta mas tarde');
            } else {
                console.log(results)
                res.status(200).send({ data: results })
            }
        })
    },

}