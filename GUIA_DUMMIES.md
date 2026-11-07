# GUIA COMPLETA DEL PROYECTO ECOEMPACK
## Explicacion "For Dummies" — Entiende TODO sin experiencia previa

---

## INDICE
1. [¿Que estamos construyendo?](#1-que-estamos-construyendo)
2. [Las tecnologias explicadas simple](#2-las-tecnologias-explicadas-simple)
3. [Estructura de archivos del proyecto](#3-estructura-de-archivos)
4. [Parte 1: El Frontend (la cara visible)](#4-el-frontend)
5. [Parte 2: El Backend (el motor)](#5-el-backend)
6. [¿Que es una API RESTful?](#6-que-es-una-api-restful)
7. [¿Que son las operaciones CRUD?](#7-operaciones-crud)
8. [¿Que es JWT y como funciona?](#8-jwt-autenticacion)
9. [¿Que es MongoDB y Mongoose?](#9-mongodb-y-mongoose)
10. [¿Que es dotenv y por que usarlo?](#10-dotenv-variables-de-entorno)
11. [Como instalar y correr el proyecto](#11-como-instalar-y-correr)
12. [Endpoints de la API documentados](#12-endpoints-de-la-api)
13. [Como hacer el despliegue](#13-despliegue)
14. [Glosario de terminos](#14-glosario)

---

## 1. ¿QUE ESTAMOS CONSTRUYENDO?

Estamos construyendo una **aplicacion web full stack** para la empresa ficticia "EcoEmpack", que vende empaques ecologicos y promueve el detox de microplasticos.

**"Full stack" significa que tiene DOS partes:**

```
USUARIO ——— ve la pagina ——→ FRONTEND (HTML/CSS/JS)
                                    |
                             envia peticiones
                                    |
                                    ↓
                           BACKEND (Node.js/Express)
                                    |
                          guarda y lee datos
                                    |
                                    ↓
                            BASE DE DATOS (MongoDB)
```

**Analogia del restaurante:**
- El **Frontend** = el salon del restaurante (lo que ve el cliente)
- El **Backend** = la cocina (donde se prepara todo)
- La **Base de Datos** = la despensa (donde se guardan los ingredientes/datos)
- La **API** = el mesero (quien lleva mensajes entre cocina y salon)

---

## 2. LAS TECNOLOGIAS EXPLICADAS SIMPLE

### Node.js
**¿Que es?** JavaScript corriendo en tu computadora (no en el navegador).
**Analogia:** Normalmente JS solo funciona en el navegador. Node.js es como "sacar" JS del navegador y ponerlo a trabajar como servidor.
**¿Por que usarlo?** Porque podemos usar el mismo lenguaje (JavaScript) tanto en el frontend como en el backend.

### Express.js
**¿Que es?** Una libreria/framework para Node.js que facilita crear servidores y rutas.
**Analogia:** Node.js es como tener una caja de herramientas. Express es como tener un cinturon organizado donde cada herramienta ya esta en su lugar y lista para usar.
**¿Por que usarlo?** Sin Express tendrías que escribir 100 lineas para crear un servidor simple. Con Express son 5 lineas.

### MongoDB
**¿Que es?** Una base de datos NoSQL que guarda informacion en formato JSON (documentos).
**Analogia:** Una base de datos tradicional (MySQL) es como una hoja de Excel muy rigida. MongoDB es como una coleccion de tarjetas de notas donde cada tarjeta puede tener diferente informacion.
**¿Por que usarlo?** Es muy flexible y facil de aprender. No necesitas definir columnas fijas como en SQL.

### Mongoose
**¿Que es?** Una libreria que conecta Node.js con MongoDB y te permite definir "esquemas" (plantillas de datos).
**Analogia:** Si MongoDB es una bodega sin orden, Mongoose es el sistema de organizacion que te dice "aqui van los zapatos, alla los libros".

### JWT (JSON Web Token)
**¿Que es?** Un "pasaporte digital" que el servidor le da al usuario despues de iniciar sesion.
**Analogia:** Cuando entras a un parque de diversiones, pagas y te ponen una pulsera. JWT es esa pulsera. En cada atraccion (ruta protegida) muestras tu pulsera en vez de pagar de nuevo.

### bcryptjs
**¿Que es?** Una libreria para encriptar contrasenias.
**Analogia:** Cuando guardas una contrasena, bcrypt la convierte en algo ilegible: "hola123" → "$2a$10$Kxm...". Si hackean tu BD, no pueden ver las contrasenias reales.

### dotenv
**¿Que es?** Una libreria para leer variables de entorno desde un archivo `.env`.
**Analogia:** En vez de escribir tu contrasena de BD directamente en el codigo (peligroso), la guardas en un archivo secreto (.env) y dotenv la lee. Como tener las llaves en un llavero seguro en vez de publicarlas en Facebook.

### CORS
**¿Que es?** Cross-Origin Resource Sharing. Permite que el frontend (en puerto 5500) le hable al backend (en puerto 3000).
**Analogia:** Sin CORS, el navegador bloquea las peticiones entre diferentes "origenes" por seguridad. CORS es como darle permiso especifico a ciertas personas para entrar a tu casa.

---

## 3. ESTRUCTURA DE ARCHIVOS

```
EcoEmpack/
│
├── frontend/                    ← Todo lo que VE el usuario
│   ├── index.html               ← Pagina principal (inicio, productos, detox)
│   ├── login.html               ← Pagina de login/registro
│   │
│   ├── css/
│   │   ├── style.css            ← Estilos de la pagina principal
│   │   └── login.css            ← Estilos del login
│   │
│   └── js/
│       ├── catalog.js           ← Datos de productos + logica del modal
│       ├── main.js              ← Funciones generales (navbar, animaciones)
│       └── login.js             ← Logica de autenticacion
│
├── backend/                     ← El servidor (no lo ve el usuario)
│   ├── server.js                ← Punto de entrada: arranca el servidor
│   ├── package.json             ← Lista de dependencias del proyecto
│   ├── .env.example             ← Plantilla de variables de entorno
│   ├── .gitignore               ← Archivos que NO subir a GitHub
│   │
│   ├── models/                  ← "Plantillas" de datos para MongoDB
│   │   ├── User.js              ← Como se ve un usuario en la BD
│   │   └── Product.js           ← Como se ve un producto en la BD
│   │
│   ├── routes/                  ← Los "caminos" que puede tomar una peticion
│   │   ├── auth.js              ← Rutas: /login, /register, /perfil
│   │   └── products.js          ← Rutas CRUD de productos
│   │
│   └── middleware/              ← Funciones que corren "en medio" de una peticion
│       ├── auth.js              ← Verifica el token JWT
│       └── errorHandler.js      ← Maneja errores de toda la app
│
└── GUIA_DUMMIES.md              ← ¡Este archivo!
```

---

## 4. EL FRONTEND

El frontend se compone de 3 lenguajes trabajando juntos:

```
HTML   = la estructura   (como el esqueleto de una persona)
CSS    = el diseno       (como la ropa y apariencia)
JS     = la logica       (como el cerebro que hace cosas)
```

### index.html — Pagina Principal
Contiene 4 secciones principales:
1. **Hero** — La primera pantalla con el titulo y botones
2. **Productos** — La cuadricula de 6 empaques ecologicos
3. **Detox** — Informacion sobre microplasticos
4. **Nosotros** — Historia de la empresa

**¿Como funciona el catalogo modal?**
Cuando el usuario hace clic en "Ver Catalogo", JavaScript:
1. Busca el producto en el array `products[]` de catalog.js
2. Construye el HTML del modal con los datos
3. Muestra el modal con CSS (agrega clase `.active`)
4. Las pestanas (tabs) cambian el contenido visible

### login.html — Pagina de Login
Tiene dos formularios:
- **Login**: manda email y contrasena al backend → recibe un JWT → lo guarda en localStorage
- **Registro**: manda todos los datos → el backend crea el usuario en MongoDB

**¿Que es localStorage?**
Es una "mini base de datos" en el navegador del usuario. Usamos `localStorage.setItem('token', jwt)` para guardar el token y `localStorage.getItem('token')` para recuperarlo.

---

## 5. EL BACKEND

### server.js — El Orquestador
Es el archivo mas importante. Hace 4 cosas:
1. **Configura Express** (el framework del servidor)
2. **Registra middleware** (CORS, parseo de JSON)
3. **Conecta las rutas** (¿a donde van las peticiones?)
4. **Se conecta a MongoDB** y arranca a escuchar en el puerto 3000

**¿Que es un puerto?**
Tu computadora tiene miles de "puertas" (puertos). El navegador usa el puerto 80 o 443. Tu servidor de Express usa el 3000. Es como los diferentes mostradores de un banco: cada servicio tiene su ventanilla.

### Flujo de una peticion tipica:
```
Navegador                Backend                   MongoDB
   |                        |                          |
   |-- POST /api/auth/login →|                          |
   |   {email, password}     |                          |
   |                        |-- User.findOne(email) → |
   |                        |                         ←|
   |                        |-- bcrypt.compare()       |
   |                        |-- jwt.sign()             |
   |←-- {token, user} ------|                          |
```

---

## 6. ¿QUE ES UNA API RESTful?

**API** = Application Programming Interface = una forma estandar de comunicacion entre sistemas.

**REST** = Representational State Transfer = un conjunto de reglas para disenar APIs.

**¿Como funciona?** Usamos verbos HTTP para indicar QUE queremos hacer:

| Verbo HTTP | Significado | Ejemplo |
|-----------|-------------|---------|
| GET       | Obtener/Leer | Ver todos los productos |
| POST      | Crear/Enviar | Crear un nuevo producto |
| PUT       | Actualizar  | Editar un producto |
| DELETE    | Eliminar    | Borrar un producto |

**¿Que es un endpoint?**
Es la URL especifica a la que mandamos una peticion.
Ejemplo: `GET http://localhost:3000/api/products` = "dame todos los productos"

**¿Que es JSON?**
JavaScript Object Notation. Es el formato en que se mandan los datos:
```json
{
    "nombre": "Bolsas Kraft",
    "precio": 0.45,
    "biodegradable": true
}
```

---

## 7. OPERACIONES CRUD

CRUD = Create, Read, Update, Delete (las 4 operaciones basicas de cualquier sistema de datos)

| Operacion | HTTP   | Endpoint              | ¿Que hace?              |
|-----------|--------|-----------------------|-------------------------|
| Create    | POST   | /api/products         | Crear nuevo producto    |
| Read (all)| GET    | /api/products         | Ver todos los productos |
| Read (one)| GET    | /api/products/:id     | Ver un producto por ID  |
| Update    | PUT    | /api/products/:id     | Editar un producto      |
| Delete    | DELETE | /api/products/:id     | Eliminar un producto    |

**¿Que es el `:id`?**
Es un parametro dinamico. En la URL real seria algo como `/api/products/507f1f77bcf86cd799439011`.
En el codigo, `req.params.id` te da ese valor.

**Reglas de negocio de este proyecto:**
- **GET** (lectura): cualquiera puede ver productos. No se necesita JWT.
- **POST, PUT, DELETE** (escritura): solo administradores autenticados con JWT valido.

---

## 8. JWT — AUTENTICACION

**¿Que es un JWT?**
Un token JWT tiene 3 partes separadas por puntos:
```
eyJhbGciOiJIUzI1NiJ9  .  eyJpZCI6IjEyMyJ9  .  xM5KJp3S3EY...
     HEADER                   PAYLOAD              FIRMA
  (tipo de algoritmo)    (datos del usuario)   (verificacion)
```

**El flujo de autenticacion:**
```
1. Usuario ingresa email + password en el formulario
2. Frontend envia POST /api/auth/login al backend
3. Backend busca el usuario en MongoDB
4. Backend compara la contrasena con bcrypt
5. Si es correcto: genera un JWT y lo envia al frontend
6. Frontend guarda el JWT en localStorage
7. En peticiones futuras: frontend envia JWT en el Header
8. Backend verifica el JWT antes de procesar la peticion
```

**¿Por que JWT y no guardar el usuario en la BD para cada peticion?**
JWT es "stateless": el servidor NO necesita guardar sesiones. El token contiene toda la informacion necesaria. Mas eficiente para escalar la app.

**El middleware de autenticacion (middleware/auth.js):**
Cada vez que alguien intenta hacer POST/PUT/DELETE en productos, este middleware:
1. Lee el header `Authorization: Bearer <token>`
2. Verifica que el token sea valido con `jwt.verify()`
3. Si es valido: agrega el usuario a `req.usuario` y llama `next()`
4. Si no: responde con error 401 (No autorizado)

---

## 9. MONGODB Y MONGOOSE

**MongoDB** guarda datos en "documentos" (como objetos JSON):
```
Coleccion "users":                 Coleccion "products":
[                                  [
  {                                  {
    _id: "507f1...",                   _id: "607g2...",
    nombre: "Ana",                     nombre: "Bolsas Kraft",
    email: "ana@mail.com",             precio: 0.45,
    password: "$2a$10$...",            categoria: "bolsas"
    rol: "admin"                     }
  }                                ]
]
```

**Mongoose** te permite definir Schemas (plantillas) para validar que los datos sean correctos antes de guardar. Ejemplo del modelo User:
```javascript
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,    // Obligatorio
        unique: true       // No se puede repetir
    }
});
```

**Operaciones de Mongoose:**
```javascript
// Crear
await User.create({ nombre: 'Ana', email: 'ana@test.com' });

// Leer todos
await User.find({});

// Leer uno
await User.findById('507f1...');

// Actualizar
await User.findByIdAndUpdate('507f1...', { nombre: 'Ana Maria' });

// Eliminar
await User.findByIdAndDelete('507f1...');
```

---

## 10. DOTENV — VARIABLES DE ENTORNO

**Problema:** Si escribes tu contrasena de BD directamente en el codigo:
```javascript
mongoose.connect('mongodb+srv://miUsuario:miContrasena123@cluster...');
```
...y subes el codigo a GitHub, TODOS pueden ver tu contrasena. PELIGROSO.

**Solucion con dotenv:**

1. Crea un archivo `.env` (este archivo NUNCA se sube a GitHub):
```
MONGODB_URI=mongodb+srv://miUsuario:miContrasena123@cluster...
JWT_SECRET=miClaveSuperSecreta
PORT=3000
```

2. En tu codigo:
```javascript
require('dotenv').config();  // Carga el .env

mongoose.connect(process.env.MONGODB_URI);  // Lee del .env
```

3. En `.gitignore` pones `.env` para que nunca se suba.

4. Compartes `.env.example` (sin valores reales) para que otros sepan que variables necesitan.

**Analogia:** Es como publicar en internet "la llave esta debajo del tapete" vs guardar la llave en un lugar privado y solo decirles a tus amigos donde esta.

---

## 11. COMO INSTALAR Y CORRER EL PROYECTO

### Requisitos previos (instalar una sola vez):
1. **Node.js**: Descargar de https://nodejs.org (version LTS recomendada)
2. **MongoDB**: Descargar de https://www.mongodb.com/try/download/community
   O usar MongoDB Atlas (gratis en la nube, no necesitas instalar nada local)

### Pasos de instalacion:

**Paso 1: Abrir terminal en la carpeta del backend**
```
cd C:\Users\TuUsuario\Desktop\EcoEmpack\backend
```

**Paso 2: Instalar las dependencias del proyecto**
```
npm install
```
Esto lee el `package.json` y descarga todas las librerias (express, mongoose, etc.) en una carpeta llamada `node_modules`.

**Paso 3: Configurar variables de entorno**
1. Copia el archivo `.env.example` y renombralo a `.env`
2. Edita el archivo `.env` con tus datos:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecoempack
JWT_SECRET=cualquier_cadena_larga_y_secreta_aqui_2024
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

**Paso 4: Iniciar el servidor**
```
npm start
```
O en modo desarrollo (reinicia solo al guardar cambios):
```
npm run dev
```

Deberias ver:
```
✅ Conectado a MongoDB correctamente
🚀 Servidor corriendo en http://localhost:3000
```

**Paso 5: Abrir el frontend**
Abre el archivo `frontend/index.html` en tu navegador.
Recomendado: usa la extension "Live Server" en VS Code para que el frontend tenga un servidor local en el puerto 5500.

### Probar que todo funciona:
Abre tu navegador y ve a: `http://localhost:3000`
Deberias ver:
```json
{
  "message": "Bienvenido a la API de EcoEmpack",
  "version": "1.0.0"
}
```

---

## 12. ENDPOINTS DE LA API

### Autenticacion (/api/auth)

**POST /api/auth/register** — Crear cuenta
```
URL:    http://localhost:3000/api/auth/register
Metodo: POST
Body (JSON):
{
    "nombre": "Juan",
    "apellido": "Garcia",
    "email": "juan@test.com",
    "password": "miContrasena123"
}

Respuesta exitosa (201):
{
    "success": true,
    "message": "Cuenta creada exitosamente.",
    "token": "eyJhbGci...",
    "user": { "id": "...", "nombre": "Juan", "email": "juan@test.com" }
}
```

**POST /api/auth/login** — Iniciar sesion
```
URL:    http://localhost:3000/api/auth/login
Metodo: POST
Body (JSON):
{
    "email": "juan@test.com",
    "password": "miContrasena123"
}

Respuesta exitosa (200):
{
    "success": true,
    "token": "eyJhbGci...",
    "user": { "id": "...", "nombre": "Juan", "rol": "usuario" }
}
```

**GET /api/auth/perfil** — Ver mi perfil (REQUIERE JWT)
```
URL:     http://localhost:3000/api/auth/perfil
Metodo:  GET
Headers: Authorization: Bearer eyJhbGci...

Respuesta exitosa (200):
{
    "success": true,
    "user": { "nombre": "Juan", "email": "juan@test.com", "rol": "usuario" }
}
```

---

### Productos (/api/products)

**GET /api/products** — Listar todos los productos
```
URL:    http://localhost:3000/api/products
Metodo: GET
Auth:   No requerida

Respuesta (200):
{
    "success": true,
    "count": 2,
    "products": [
        { "_id": "...", "nombre": "Bolsas Kraft", "precio": 0.45 },
        { "_id": "...", "nombre": "Cajas Carton", "precio": 1.20 }
    ]
}
```

**GET /api/products/:id** — Ver un producto
```
URL:    http://localhost:3000/api/products/507f1f77bcf86cd799439011
Metodo: GET
```

**POST /api/products** — Crear producto (ADMIN)
```
URL:    http://localhost:3000/api/products
Metodo: POST
Auth:   Bearer <token-de-admin>
Body:
{
    "nombre": "Film Compostable",
    "descripcion": "Film de maiz para alimentos",
    "categoria": "film",
    "precio": 185,
    "stock": 100,
    "biodegradable": true,
    "tiempoBiodegradacion": "3-6 meses"
}
```

**PUT /api/products/:id** — Actualizar (ADMIN)
```
URL:    http://localhost:3000/api/products/507f1f77...
Metodo: PUT
Auth:   Bearer <token-de-admin>
Body:   { "precio": 200 }
```

**DELETE /api/products/:id** — Eliminar (ADMIN)
```
URL:    http://localhost:3000/api/products/507f1f77...
Metodo: DELETE
Auth:   Bearer <token-de-admin>
```

**Herramienta para probar la API:** Descarga Postman (gratis) o usa Thunder Client (extension de VS Code) para enviar peticiones a la API sin necesidad de tener el frontend.

---

## 13. DESPLIEGUE

### Despliegue Local (lo que tienes ahora)
Tu servidor corre en `http://localhost:3000`. Solo tu puedes verlo.

### Despliegue en la Nube (para que todos puedan acceder)

**Backend con Render (gratis):**
1. Sube tu codigo a GitHub
2. Ve a https://render.com y crea cuenta
3. Crea un nuevo "Web Service" y conecta tu repositorio
4. En "Environment Variables" agrega las mismas variables de tu .env
5. Render te dara una URL como: `https://ecoempack-api.onrender.com`

**Base de datos con MongoDB Atlas (gratis):**
1. Ve a https://mongodb.com/atlas y crea cuenta
2. Crea un cluster gratuito (M0)
3. Crea un usuario de base de datos
4. Copia la "Connection String" y usala como MONGODB_URI en Render

**Frontend con GitHub Pages (gratis):**
1. Sube la carpeta `frontend/` a un repositorio de GitHub
2. Ve a Settings → Pages → selecciona la rama main
3. GitHub te dara una URL como: `https://tuusuario.github.io/ecoempack`
4. ¡IMPORTANTE! Cambia la URL de la API en `main.js` y `login.js`:
```javascript
// Antes (local):
const API_URL = 'http://localhost:3000/api';

// Despues (produccion):
const API_URL = 'https://ecoempack-api.onrender.com/api';
```

---

## 14. GLOSARIO DE TERMINOS

| Termino | Significado Simple |
|---------|-------------------|
| **API** | Intermediario que permite que dos programas se comuniquen |
| **Backend** | La parte del servidor que el usuario no ve |
| **bcrypt** | Herramienta que convierte contrasenias en codigos ilegibles |
| **CORS** | Permiso que da el servidor para recibir peticiones de otros origenes |
| **CRUD** | Create, Read, Update, Delete — las 4 operaciones de datos |
| **dotenv** | Herramienta para leer variables secretas de un archivo .env |
| **endpoint** | URL especifica de la API que hace una tarea |
| **Express** | Framework para crear servidores con Node.js facilmente |
| **Frontend** | La parte visual del sitio que ve el usuario |
| **Full Stack** | App que tiene frontend + backend juntos |
| **HTTP** | Protocolo para enviar datos por internet |
| **JSON** | Formato de texto para enviar datos (como listas y objetos) |
| **JWT** | Token de autenticacion que funciona como "pasaporte digital" |
| **localhost** | Tu propia computadora (IP 127.0.0.1) |
| **Middleware** | Funcion que corre entre la peticion y la respuesta |
| **Model** | Plantilla que define como se estructura un dato en la BD |
| **MongoDB** | Base de datos que guarda datos en formato JSON |
| **Mongoose** | Puente entre Node.js y MongoDB con validaciones |
| **Node.js** | JavaScript corriendo fuera del navegador (en el servidor) |
| **npm** | Node Package Manager — gestor de paquetes de Node.js |
| **package.json** | Lista de dependencias y configuracion del proyecto |
| **Puerto** | "Puerta" numerada por donde entra/sale informacion |
| **REST** | Estandar para disenar APIs usando verbos HTTP |
| **Route** | "Camino" que toma una peticion HTTP segun su URL y metodo |
| **Schema** | Plantilla/estructura que define como son los datos |
| **token** | Cadena de texto que actua como credencial de identidad |

---

*Creado para EcoEmpack — Proyecto Full Stack Fase 1*
*Version 1.0 — 2024*
