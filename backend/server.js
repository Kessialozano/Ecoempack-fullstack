// ============================================================
// server.js — Punto de entrada principal del backend
// Configura Express, conecta MongoDB, registra rutas
// ============================================================

const express    = require('express');
const cors       = require('cors');
const dotenv     = require('dotenv');
const mongoose   = require('mongoose');

// Cargar variables de entorno desde .env
dotenv.config();

// Importar rutas
const authRoutes    = require('./routes/auth');
const productRoutes = require('./routes/products');

// Importar middleware de errores
const errorHandler = require('./middleware/errorHandler');

// Crear aplicacion Express
const app = express();

// ===== MIDDLEWARE GLOBAL =====

// CORS: permite que el frontend en otro puerto pueda comunicarse con este backend
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsear JSON: permite recibir datos en formato JSON en el body de las peticiones
app.use(express.json());

// Parsear datos de formularios HTML
app.use(express.urlencoded({ extended: true }));

// ===== RUTAS =====

// Ruta base para verificar que el servidor esta corriendo
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de EcoEmpack',
        version: '1.0.0',
        endpoints: {
            auth:     '/api/auth',
            products: '/api/products'
        }
    });
});

// Rutas de autenticacion (login, registro, perfil)
app.use('/api/auth', authRoutes);

// Rutas de productos (CRUD completo)
app.use('/api/products', productRoutes);

// ===== MANEJADOR DE ERRORES GLOBAL =====
// Debe ir DESPUES de las rutas para capturar sus errores
app.use(errorHandler);

// ===== CONEXION A MONGODB Y ARRANQUE DEL SERVIDOR =====
const PORT       = process.env.PORT || 3000;
const MONGO_URI  = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecoempack';

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB correctamente');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📋 Endpoints disponibles:`);
            console.log(`   GET  http://localhost:${PORT}/`);
            console.log(`   POST http://localhost:${PORT}/api/auth/register`);
            console.log(`   POST http://localhost:${PORT}/api/auth/login`);
            console.log(`   GET  http://localhost:${PORT}/api/products`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar a MongoDB:', err.message);
        console.log('💡 Asegurate de que MongoDB esta corriendo o revisa MONGODB_URI en .env');
        process.exit(1);
    });
