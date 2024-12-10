var jwt = require("jwt-simple");
var moment = require('moment');
var secret = 'sweet';

exports.Auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send ({mesagge: "falta la llave"});

    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({mesagge: 'tu sesion ha sido expirada'});

        }

    } catch (error) {
        return res.status(401).send({mesagge: 'llave no valida'});

    }

    req.user = payload;
    next();
};