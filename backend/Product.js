// ============================================================
// models/Product.js — Modelo de Producto para MongoDB
// ============================================================

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        nombre: {
            type:     String,
            required: [true, 'El nombre del producto es obligatorio'],
            trim:     true
        },
        descripcion: {
            type:     String,
            required: [true, 'La descripcion es obligatoria'],
            trim:     true
        },
        categoria: {
            type:    String,
            enum:    ['bolsas', 'cajas', 'film', 'contenedores', 'vidrio', 'otro'],
            default: 'otro'
        },
        precio: {
            type:     Number,
            required: [true, 'El precio es obligatorio'],
            min:      [0, 'El precio no puede ser negativo']
        },
        stock: {
            type:    Number,
            default: 0,
            min:     0
        },
        materiales: {
            type:    [String],   // Array de strings
            default: []
        },
        certificaciones: {
            type:    [String],
            default: []
        },
        biodegradable: {
            type:    Boolean,
            default: true
        },
        tiempoBiodegradacion: {
            type: String
        },
        imagen: {
            type:    String,
            default: ''
        },
        activo: {
            type:    Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);
