var jwt = require("jwt-simple");
var moment = require('moment');
var secret = 'sweet';

exports.Auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: "Falta la llave"});
    }

    // Elimina el prefijo 'Bearer ' si está presente
    var token = req.headers.authorization.replace('Bearer ', '').replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({message: 'Tu sesión ha sido expirada'});
        }

    } catch (error) {
        return res.status(401).send({message: 'Llave no válida'});
    }

    req.user = payload;
    next();
};
