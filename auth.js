// ============================================================
// middleware/auth.js — Middleware de autenticacion JWT
// Verifica que el usuario tenga un token valido antes
// de acceder a rutas protegidas
// ============================================================

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// "middleware" = funcion que se ejecuta ENTRE la peticion y la respuesta
// Firma: (req, res, next) — next() = "continua al siguiente paso"

const protegerRuta = async (req, res, next) => {
    let token;

    // Los tokens JWT se envian en el header "Authorization: Bearer <token>"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Debes iniciar sesion primero.'
        });
    }

    try {
        // jwt.verify verifica que el token no fue manipulado y no expiro
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar el usuario en BD para confirmar que aun existe y esta activo
        const usuario = await User.findById(decoded.id).select('-password');

        if (!usuario || !usuario.activo) {
            return res.status(401).json({
                success: false,
                message: 'Token invalido. El usuario no existe o fue desactivado.'
            });
        }

        // Adjuntar el usuario al objeto req para que las rutas puedan usarlo
        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token expirado o invalido. Inicia sesion nuevamente.'
        });
    }
};

// Middleware para verificar que el usuario sea admin
const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Se requieren permisos de administrador.'
        });
    }
    next();
};

module.exports = { protegerRuta, soloAdmin };
