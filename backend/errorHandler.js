// ============================================================
// middleware/errorHandler.js — Manejador global de errores
// Captura cualquier error que ocurra en las rutas y
// devuelve una respuesta JSON limpia al cliente
// ============================================================

const errorHandler = (err, req, res, next) => {
    // Mostrar el error en consola (para depuracion)
    console.error('❌ Error:', err.message);

    let statusCode = err.statusCode || 500;
    let message    = err.message    || 'Error interno del servidor';

    // Error de validacion de Mongoose (datos incorrectos)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message    = Object.values(err.errors).map(e => e.message).join('. ');
    }

    // Error de campo unico duplicado (ej: email ya existe)
    if (err.code === 11000) {
        statusCode = 400;
        const campo = Object.keys(err.keyValue)[0];
        message = `Ya existe un registro con ese ${campo}. Usa uno diferente.`;
    }

    // Token JWT malformado
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message    = 'Token invalido.';
    }

    // Token JWT expirado
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message    = 'Tu sesion ha expirado. Inicia sesion nuevamente.';
    }

    res.status(statusCode).json({
        success: false,
        message,
        // Solo mostrar el stack trace en desarrollo
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
