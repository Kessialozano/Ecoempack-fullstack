// ============================================================
// routes/auth.js — Rutas de autenticacion
// POST /api/auth/register  → Crear cuenta nueva
// POST /api/auth/login     → Iniciar sesion
// GET  /api/auth/perfil    → Ver mi perfil (requiere JWT)
// ============================================================

const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { protegerRuta } = require('../middleware/auth');

const router = express.Router();

// ===== FUNCION AUXILIAR: Generar token JWT =====
function generarToken(userId) {
    return jwt.sign(
        { id: userId },                         // Payload (datos del token)
        process.env.JWT_SECRET,                  // Clave secreta
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }  // Expira en 7 dias
    );
}

// ========================================
// POST /api/auth/register — CREAR USUARIO
// ========================================
router.post('/register', async (req, res, next) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        // Verificar si el email ya existe
        const existente = await User.findOne({ email });
        if (existente) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una cuenta con ese correo electronico.'
            });
        }

        // Crear nuevo usuario (la contrasena se encripta automaticamente en el model)
        const nuevoUsuario = await User.create({ nombre, apellido, email, password });

        // Generar token JWT
        const token = generarToken(nuevoUsuario._id);

        res.status(201).json({
            success: true,
            message: 'Cuenta creada exitosamente.',
            token,
            user: {
                id:       nuevoUsuario._id,
                nombre:   nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                email:    nuevoUsuario.email,
                rol:      nuevoUsuario.rol
            }
        });

    } catch (error) {
        next(error);    // Pasar el error al errorHandler global
    }
});

// ========================================
// POST /api/auth/login — INICIAR SESION
// ========================================
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor proporciona email y contrasena.'
            });
        }

        // Buscar usuario (select('+password') porque lo excluimos por defecto)
        const usuario = await User.findOne({ email }).select('+password');

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas.'
            });
        }

        // Comparar la contrasena ingresada con la encriptada en BD
        const passwordCorrecta = await usuario.compararPassword(password);

        if (!passwordCorrecta) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas.'
            });
        }

        // Generar token
        const token = generarToken(usuario._id);

        res.status(200).json({
            success: true,
            message: 'Inicio de sesion exitoso.',
            token,
            user: {
                id:       usuario._id,
                nombre:   usuario.nombre,
                apellido: usuario.apellido,
                email:    usuario.email,
                rol:      usuario.rol
            }
        });

    } catch (error) {
        next(error);
    }
});

// ========================================
// GET /api/auth/perfil — VER MI PERFIL
// Esta ruta esta PROTEGIDA: requiere token JWT
// ========================================
router.get('/perfil', protegerRuta, async (req, res) => {
    // req.usuario viene del middleware protegerRuta
    res.status(200).json({
        success: true,
        user: req.usuario
    });
});

module.exports = router;
