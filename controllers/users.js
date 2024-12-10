const conn = require('mysql2'); 
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

const conexion = conn.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

module.exports = {

    login(req, res) {
        var data = req.body;
        var username = data.username;
        var password = data.password;
        conexion.query('SELECT * FROM users WHERE username = "' + username + '"', function (error, results, fields) {
            if (!error) {
                if (results.length == 1) {
                    bcrypt.compare(password, results[0].password, function (error, check) {
                        if (check) {
                            var token = jwt.createToken(results[0]);
                            console.log("Datos correctos");
                            res.status(200).send({ 
                                message: "Login exitoso", 
                                token: token, user: {
                                    idusers: results[0].idusers,
                                    username: results[0].username
                                } });
                        } else {
                            res.status(200).send({ message: "Verifica tu información" });
                        }
                    });
                } else {
                    console.log("Datos incorrectos");
                    res.status(200).send({ message: "Verifica tu información" });
                }
            } else {
                console.log(error);
                console.log("Datos incorrectos");
                res.status(200).send({ message: "Verifica tu información" });
            }
        });
    },

    save(req, res) {
        data = req.body;
        name = data.name;
        username = data.username;
        password = data.password;
        email = data.email;
        role = "Usuario";
        bcrypt.hash(password, null, null, function (error, hash) {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Intenta más tarde' });
            } else {
                password = hash;
                var sql = 'INSERT INTO users(name, username, password, email, role) VALUES ("' + name + '", "' + username + '", "' + password + '", "' + email + '", "' + role + '")';
                conexion.query(sql, function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Intenta más tarde')
                    } else {
                        console.log(results);
                        res.status(201).send({ message: 'Usuario creado' })
                    }
                });
            }
        });
    },

    update(req, res) {
        data = req.body;
        name = data.name;
        username = data.username;
        email = data.email;
        id = data.iduser
        var sql = 'UPDATE users SET name = "' + name + '", username = "' + username + '", email = "' + email +  '" WHERE idusers = ' + id+ '';
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else {
                console.log(results);
                res.status(200).send({ message: 'Usuario modificado' })
            }
        });
    },
    getById(req, res) {
        const id = req.params.id || req.query.iduser; 
        const sql = 'SELECT name, username, email FROM users WHERE idusers = ?';
        
        conexion.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error al obtener el usuario:', err);
                res.status(500).send({ message: 'Error al obtener el usuario' });
            } else if (results.length > 0) {
                res.status(200).send({ users: results[0] }); 
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        });
    }
    ,
    
    

    delete(req, res) {
        data = req.body;
        id = data.iduser;
        if (req.user.role = 'Usuario') {
            var sql = 'DELETE FROM users WHERE idusers = ' + id + '';
            conexion.query(sql, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Intenta más tarde');
                } else {
                    console.log(results)
                    res.status(200).send({ message: 'Usuario eliminado' })
                }
            })

        } else {
            res.status(403).send({ message: 'no tienes permisos para realizar esta operacion' })
        }

    },

    getAll(req, res) {
        user = req.user
        console.log(user)
        if (user.role == 'admin') {
            var sql = 'SELECT * FROM users';
        } else {
            var sql = 'SELECT * FROM users WHERE idusers=' + user.sub;
        }
        conexion.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else {
                console.log(results);
                res.status(201).send({ data: results });
            }
        });
    }
}