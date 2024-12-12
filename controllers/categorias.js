const conn = require('mysql2');

const conexion = conn.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

module.exports = {

    save(req, res) {
        data = req.body;
        nombre = data.nombre;
        descripcion = data.descripcion;
        id_user = data.id_user; 

        var sql = 'INSERT INTO categorias (nombre, descripcion, id_user) VALUES ("' + nombre + '", "' + descripcion + '", ' + id_user + ')';
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else {
                console.log(results);
                res.status(201).send({ message: 'Categoría agregada' });
            }
        });
    },

    update(req, res) {
        data = req.body;
        nombre = data.nombre;
        descripcion = data.descripcion;
        id_categoria = data.id_categoria;
        id_user = req.user.id; 

        var sql = 'UPDATE categorias SET nombre="' + nombre + '", descripcion="' + descripcion + '" WHERE idcategoria=' + id_categoria + ' AND id_user=' + id_user;
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else {
                console.log(results);
                res.status(201).send({ message: 'Categoría actualizada' });
            }
        });
    },

    delete(req, res) {
        data = req.body;
        id_categoria = data.id_categoria;
        id_user = req.user.id; 

        var sql = 'DELETE FROM categorias WHERE idcategoria=' + id_categoria + ' AND id_user=' + id_user;
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else {
                console.log(results);
                res.status(201).send({ message: 'Categoría eliminada' });
            }
        });
    },

    getAll(req, res) {
        id_user = req.query.id_user; 

        var sql = 'SELECT * FROM categorias WHERE id_user=' + id_user;
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else {
                console.log(results);
                res.status(200).send({ data: results });
            }
        });
    },
    getNames(req, res) {
        id_user = req.query.id_user;

        var sql = 'SELECT nombre FROM categorias WHERE id_user=' + id_user;
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else {
                console.log(results);
                res.status(200).send({ categorias: results });
            }
        });
    }
};
