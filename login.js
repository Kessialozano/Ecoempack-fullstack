/* ============================================================
   login.js — Logica de autenticacion (Login y Registro)
   Conecta con el backend en /api/auth
   ============================================================ */

const API_URL = 'http://localhost:3000/api';

// ===== CAMBIAR ENTRE FORMULARIOS =====
function switchTab(tab) {
    const loginForm    = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin     = document.getElementById('tabLogin');
    const tabRegister  = document.getElementById('tabRegister');

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    }

    clearStatus();
}

// ===== MOSTRAR/OCULTAR CONTRASENA =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// ===== MOSTRAR MENSAJE DE ESTADO =====
function showStatus(message, type = 'error') {
    const statusEl = document.getElementById('statusMessage');
    const icon     = type === 'error' ? '❌' : '✅';
    statusEl.textContent = `${icon} ${message}`;
    statusEl.className   = `status-message show ${type}`;
}

function clearStatus() {
    const statusEl = document.getElementById('statusMessage');
    statusEl.className  = 'status-message';
    statusEl.textContent = '';
}

// ===== INDICADOR DE FUERZA DE CONTRASENA =====
const regPasswordInput = document.getElementById('regPassword');
if (regPasswordInput) {
    regPasswordInput.addEventListener('input', function () {
        updatePasswordStrength(this.value);
    });
}

function updatePasswordStrength(password) {
    const container = document.getElementById('passwordStrength');
    if (!container) return;

    let strength = 0;
    if (password.length >= 8)         strength++;
    if (/[A-Z]/.test(password))       strength++;
    if (/[0-9]/.test(password))       strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = ['', 'weak', 'medium', 'medium', 'strong'];
    const labels = ['', 'Debil', 'Regular', 'Buena', 'Muy segura'];

    container.innerHTML = `
        <div style="display:flex; gap:4px; margin-top:6px;">
            ${[1,2,3,4].map(i => `
                <div class="strength-bar ${i <= strength ? levels[strength] : ''}"></div>
            `).join('')}
        </div>
        ${strength > 0 ? `<div class="strength-label">${labels[strength]}</div>` : ''}
    `;
}

// ===== SETEAR ESTADO DE CARGA EN BOTON =====
function setLoading(formType, isLoading) {
    const btnId   = formType === 'login' ? 'loginBtn' : 'registerBtn';
    const btn     = document.getElementById(btnId);
    const text    = btn.querySelector('.btn-text');
    const loader  = btn.querySelector('.btn-loader');

    btn.disabled    = isLoading;
    text.style.display  = isLoading ? 'none' : 'inline';
    loader.style.display = isLoading ? 'inline' : 'none';
}

// ===== FORMULARIO DE LOGIN =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearStatus();

        const email    = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showStatus('Por favor completa todos los campos.');
            return;
        }

        setLoading('login', true);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token en localStorage
                localStorage.setItem('ecoEmpackToken', data.token);
                localStorage.setItem('ecoEmpackUser', JSON.stringify(data.user));

                showStatus('¡Inicio de sesion exitoso! Redirigiendo...', 'success');

                // Redirigir al panel (cuando exista) o a la pagina principal
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);

            } else {
                showStatus(data.message || 'Credenciales incorrectas. Intenta de nuevo.');
            }

        } catch (error) {
            // Si el backend no esta corriendo, simular login para pruebas
            console.warn('Backend no disponible, usando login de prueba.');

            if (email === 'admin@ecoempack.com' && password === 'admin123') {
                const fakeToken = 'fake-jwt-token-for-demo-' + Date.now();
                localStorage.setItem('ecoEmpackToken', fakeToken);
                localStorage.setItem('ecoEmpackUser', JSON.stringify({ email, nombre: 'Admin' }));
                showStatus('Inicio de sesion en modo demo. Redirigiendo...', 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 1500);
            } else {
                showStatus('Credenciales incorrectas. (Prueba: admin@ecoempack.com / admin123)');
            }
        }

        setLoading('login', false);
    });
}

// ===== FORMULARIO DE REGISTRO =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearStatus();

        const nombre   = document.getElementById('regNombre').value.trim();
        const apellido = document.getElementById('regApellido').value.trim();
        const email    = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirm  = document.getElementById('regPasswordConfirm').value;

        if (!nombre || !apellido || !email || !password || !confirm) {
            showStatus('Por favor completa todos los campos.');
            return;
        }

        if (password.length < 8) {
            showStatus('La contrasena debe tener al menos 8 caracteres.');
            return;
        }

        if (password !== confirm) {
            showStatus('Las contrasenitas no coinciden. Revisa e intenta de nuevo.');
            return;
        }

        setLoading('register', true);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                showStatus('¡Cuenta creada exitosamente! Ahora inicia sesion.', 'success');
                setTimeout(() => switchTab('login'), 2000);
            } else {
                showStatus(data.message || 'Error al crear la cuenta. El correo puede estar en uso.');
            }

        } catch (error) {
            showStatus('Servidor no disponible. Intentalo cuando el backend este corriendo.', 'error');
        }

        setLoading('register', false);
    });
}

// ===== VERIFICAR SI YA HAY SESION ACTIVA =====
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('ecoEmpackToken');
    if (token) {
        console.log('Ya tienes sesion activa.');
        // Podrías redirigir al panel si ya hay sesion
    }
});
