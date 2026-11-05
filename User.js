// ============================================================
// models/User.js — Modelo de Usuario para MongoDB
// Define la estructura (schema) de un usuario en la BD
// ============================================================

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Schema = la "plantilla" que define como se ve un documento en MongoDB
const userSchema = new mongoose.Schema(
    {
        nombre: {
            type:     String,
            required: [true, 'El nombre es obligatorio'],
            trim:     true
        },
        apellido: {
            type:     String,
            required: [true, 'El apellido es obligatorio'],
            trim:     true
        },
        email: {
            type:      String,
            required:  [true, 'El email es obligatorio'],
            unique:    true,        // No puede haber dos usuarios con el mismo email
            lowercase: true,
            trim:      true,
            match:     [/^\S+@\S+\.\S+$/, 'Email no valido']
        },
        password: {
            type:      String,
            required:  [true, 'La contrasena es obligatoria'],
            minlength: [8, 'La contrasena debe tener al menos 8 caracteres'],
            select:    false         // Por seguridad: no incluir en consultas normales
        },
        rol: {
            type:    String,
            enum:    ['usuario', 'admin'],
            default: 'usuario'
        },
        activo: {
            type:    Boolean,
            default: true
        }
    },
    {
        timestamps: true    // Agrega createdAt y updatedAt automaticamente
    }
);

// ===== HOOK: Antes de guardar, encriptar la contrasena =====
// "pre('save')" se ejecuta automaticamente antes de guardar en BD
userSchema.pre('save', async function (next) {
    // Solo encriptar si la contrasena fue modificada
    if (!this.isModified('password')) return next();

    // bcrypt convierte "mi123" en "$2a$10$Kx..." (imposible de revertir)
    // El "10" es el numero de "rounds" (mas alto = mas seguro pero mas lento)
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ===== METODO: Comparar contrasena ingresada con la encriptada =====
userSchema.methods.compararPassword = async function (passwordIngresada) {
    return bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('User', userSchema);
