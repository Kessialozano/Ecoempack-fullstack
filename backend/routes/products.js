// ============================================================
// routes/products.js — CRUD completo de productos
//
// GET    /api/products         → Listar todos (publico)
// GET    /api/products/:id     → Ver uno (publico)
// POST   /api/products         → Crear (solo admin con JWT)
// PUT    /api/products/:id     → Actualizar (solo admin con JWT)
// DELETE /api/products/:id     → Eliminar (solo admin con JWT)
// ============================================================

const express = require('express');
const Product = require('../models/Product');
const { protegerRuta, soloAdmin } = require('../middleware/auth');

const router = express.Router();

// =======================================
// GET /api/products — LISTAR PRODUCTOS
// Publica: cualquiera puede ver productos
// =======================================
router.get('/', async (req, res, next) => {
    try {
        // Filtros opcionales por query string
        // Ejemplo: /api/products?categoria=bolsas&biodegradable=true
        const filtro = { activo: true };

        if (req.query.categoria)      filtro.categoria      = req.query.categoria;
        if (req.query.biodegradable)  filtro.biodegradable  = req.query.biodegradable === 'true';

        const productos = await Product.find(filtro).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count:   productos.length,
            products: productos
        });

    } catch (error) {
        next(error);
    }
});

// ============================================
// GET /api/products/:id — VER UN PRODUCTO
// ============================================
router.get('/:id', async (req, res, next) => {
    try {
        const producto = await Product.findById(req.params.id);

        if (!producto || !producto.activo) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            product: producto
        });

    } catch (error) {
        next(error);
    }
});

// ================================================
// POST /api/products — CREAR PRODUCTO (admin)
// Requiere: JWT valido + rol admin
// ================================================
router.post('/', protegerRuta, soloAdmin, async (req, res, next) => {
    try {
        const nuevoProducto = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente.',
            product: nuevoProducto
        });

    } catch (error) {
        next(error);
    }
});

// ====================================================
// PUT /api/products/:id — ACTUALIZAR PRODUCTO (admin)
// ====================================================
router.put('/:id', protegerRuta, soloAdmin, async (req, res, next) => {
    try {
        const producto = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:           true,   // Devolver el documento ACTUALIZADO
                runValidators: true    // Volver a validar los campos
            }
        );

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente.',
            product: producto
        });

    } catch (error) {
        next(error);
    }
});

// ====================================================
// DELETE /api/products/:id — ELIMINAR PRODUCTO (admin)
// Se hace "soft delete": solo cambia activo a false
// ====================================================
router.delete('/:id', protegerRuta, soloAdmin, async (req, res, next) => {
    try {
        const producto = await Product.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente.'
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
