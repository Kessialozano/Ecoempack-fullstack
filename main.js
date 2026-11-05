/* ============================================================
   main.js — Funcionalidad general de la pagina principal
   Incluye: navbar scroll, hamburger menu, animaciones
   ============================================================ */

const API_URL = 'http://localhost:3000/api';

// ===== NAVBAR: sombra al hacer scroll =====
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MENU HAMBURGUESA (movil) =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
    });

    // Cerrar menu al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ===== SCROLL SUAVE PARA LINKS DEL NAVBAR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ANIMACION DE ENTRADA AL HACER SCROLL =====
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

// Aplicar animacion a secciones
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll(
        '.product-card, .detox-card, .about-card, .feature'
    );

    animatedElements.forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== FUNCION PARA OBTENER TOKEN JWT =====
function getToken() {
    return localStorage.getItem('ecoEmpackToken');
}

// ===== VERIFICAR SI EL USUARIO ESTA LOGUEADO =====
function isLoggedIn() {
    const token = getToken();
    return token !== null;
}

// ===== HACER PETICION AUTENTICADA AL BACKEND =====
async function apiRequest(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en la solicitud');
        }
        return data;
    } catch (error) {
        console.error('Error en API:', error.message);
        throw error;
    }
}

// ===== EJEMPLO: CARGAR PRODUCTOS DESDE EL BACKEND =====
// (Cuando el backend este corriendo, puedes activar esto)
async function loadProductsFromAPI() {
    try {
        const data = await apiRequest('/products');
        console.log('Productos del backend:', data);
        // Aqui podrias usar data.products para actualizar el catalogo
    } catch (error) {
        console.log('Backend no disponible, usando datos locales.');
    }
}

// ===== HIGHLIGHT DEL LINK ACTIVO EN LA NAVBAR =====
window.addEventListener('scroll', function () {
    const sections = ['inicio', 'productos', 'detox', 'nosotros'];
    const scrollPos = window.scrollY + 100;

    sections.forEach(id => {
        const section = document.getElementById(id);
        const link    = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!section || !link) return;

        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-link'));
            link.classList.add('active-link');
        }
    });
});
