/* ============================================================
   catalog.js — Datos de productos y logica del modal
   ============================================================ */

// ===== DATOS DE PRODUCTOS =====
const products = [
    {
        id: 1,
        name: "Bolsas Kraft Premium",
        emoji: "🛍️",
        description: "Bolsas de papel kraft 100% reciclado, perfectas para retail y empaque de alimentos.",
        gradient: "linear-gradient(135deg, #D4A373, #8B6914)",
        badge: "Mas Vendido",
        tags: ["Papel", "Reciclado", "Biodegradable"],
        catalogo: {
            presentaciones: [
                { size: "Pequena (15x8x20cm)", price: "$0.45/unidad", min: "Min. 100 pzas" },
                { size: "Mediana (25x12x30cm)", price: "$0.65/unidad", min: "Min. 50 pzas" },
                { size: "Grande (35x15x40cm)",  price: "$0.90/unidad", min: "Min. 50 pzas" },
                { size: "Extra Grande",         price: "$1.20/unidad", min: "Min. 30 pzas" }
            ],
            materiales:       ["Papel kraft reciclado 90g", "Sin blanqueadores quimicos", "Asas de cordon de algodon", "Sin plastificado"],
            certificaciones:  ["FSC Certificado", "Sin BPA", "Compostable ASTM"],
            caracteristicas:  ["Resistencia humeda basica", "Imprimible con tintas vegetales", "Doble fondo reforzado"]
        },
        uso: [
            { icon: "1️⃣", title: "Apertura",    desc: "Abre la bolsa suavemente desde la parte superior, jalando las asas hacia afuera." },
            { icon: "2️⃣", title: "Carga",       desc: "Coloca los productos sin exceder la capacidad maxima (2kg pequena, 5kg mediana)." },
            { icon: "3️⃣", title: "Cierre",      desc: "Dobla la parte superior 2-3 veces hacia afuera para mayor seguridad." },
            { icon: "4️⃣", title: "Reutiliza",   desc: "Reutiliza la bolsa hasta 5 veces si se mantiene seca. Ideal para compras recurrentes." },
            { icon: "5️⃣", title: "Compostar",   desc: "Deposita en contenedor de papel/carton o compostera. Se biodegrada en 2-6 semanas." }
        ],
        eco: {
            co2:     "85% menos CO2 vs bolsa plastica",
            bio:     "2-6 semanas en compostera",
            agua:    "75% menos agua en produccion",
            dato:    "Reemplazar 1 bolsa plastica salva 1 litro de agua marina"
        }
    },
    {
        id: 2,
        name: "Cajas Carton Reciclado",
        emoji: "📦",
        description: "Cajas de carton 100% reciclado con diseno modular, perfectas para envios y almacenamiento.",
        gradient: "linear-gradient(135deg, #A89060, #6B5F3A)",
        badge: "Eco Premium",
        tags: ["Carton", "Post-consumo", "Resistente"],
        catalogo: {
            presentaciones: [
                { size: "Caja S (20x15x10cm)", price: "$1.20/unidad", min: "Min. 50 pzas" },
                { size: "Caja M (30x25x15cm)", price: "$2.10/unidad", min: "Min. 30 pzas" },
                { size: "Caja L (50x35x25cm)", price: "$3.50/unidad", min: "Min. 20 pzas" },
                { size: "Caja XL",             price: "$5.80/unidad", min: "Min. 10 pzas" }
            ],
            materiales:      ["Carton corrugado reciclado", "Sin cloro en blanqueo", "Tinta vegetal disponible", "Resistencia hasta 15kg"],
            certificaciones: ["100% Post-consumo", "Certificado PEFC", "Reciclable"],
            caracteristicas: ["Armado sin pegamento", "Diseno reforzado en esquinas", "Perforacion para ventilacion opcional"]
        },
        uso: [
            { icon: "1️⃣", title: "Armado",     desc: "Dobla las solapas inferiores en cruz para formar la base. No necesita pegamento." },
            { icon: "2️⃣", title: "Relleno",    desc: "Para objetos fragiles, agrega papel periodico reciclado. Nunca uses burbujas plasticas." },
            { icon: "3️⃣", title: "Empaque",    desc: "Coloca los objetos y llena los espacios vacios con papel kraft arrugado." },
            { icon: "4️⃣", title: "Cierre",     desc: "Dobla las solapas superiores y usa cinta kraft adhesiva (libre de plastico) para sellar." },
            { icon: "5️⃣", title: "Recicla",    desc: "Aplana la caja y deposita en el contenedor de carton. 100% reciclable." }
        ],
        eco: {
            co2:  "70% menos CO2 vs caja plastica",
            bio:  "2 meses en compostera",
            agua: "60% menos agua vs carton virgen",
            dato: "Cada caja usa fibras equivalentes a 5 botellas recicladas"
        }
    },
    {
        id: 3,
        name: "Film Compostable de Maiz",
        emoji: "🌽",
        description: "Film transparente de almidon de maiz, ideal para envolver alimentos sin dejar residuos plasticos.",
        gradient: "linear-gradient(135deg, #74C69D, #4A7C59)",
        badge: "Biodegradable",
        tags: ["Vegetal", "Compostable", "Alimentos"],
        catalogo: {
            presentaciones: [
                { size: "Rollo 30cm x 50m",       price: "$185/rollo",   min: "Min. 6 rollos" },
                { size: "Rollo 45cm x 100m",       price: "$320/rollo",   min: "Min. 4 rollos" },
                { size: "Laminas 30x30cm",          price: "$0.30/lamina", min: "Min. 200 pzas" },
                { size: "Bolsas preformadas S/M/L", price: "$0.55/bolsa",  min: "Min. 100 pzas" }
            ],
            materiales:      ["Almidon de maiz organico", "Plastificante vegetal PLA", "Sin PVC ni PVDC", "Apto contacto alimentario"],
            certificaciones: ["OK Compost Home", "OK Compost Industrial", "ASTM D6400"],
            caracteristicas: ["Transparente y brillante", "Soporta -18C a +120C", "Barrera a la humedad"]
        },
        uso: [
            { icon: "1️⃣", title: "Corte",      desc: "Corta el film del tamano necesario con tijeras o el cortador del rollo." },
            { icon: "2️⃣", title: "Envoltura",  desc: "Envuelve el alimento firmemente. Adhiere ligeramente a superficies frias." },
            { icon: "3️⃣", title: "Almacena",   desc: "Puede usarse en refrigerador (-18C). No usar en microondas excepto modelos certificados." },
            { icon: "4️⃣", title: "Calor",      desc: "Para cocinar al vapor, verifica modelo heat-resistant. Soporta hasta 120C." },
            { icon: "5️⃣", title: "Compostar",  desc: "Deposita en compostera o basurero verde. Se degrada en 3-6 meses en compost casero." }
        ],
        eco: {
            co2:  "80% menos CO2 vs film PVC",
            bio:  "3-6 meses en compostera casera",
            agua: "Material renovable anualmente",
            dato: "Un rollo reemplaza 200m de film plastico que tardaria 400 anos en degradarse"
        }
    },
    {
        id: 4,
        name: "Bolsas Red de Algodon",
        emoji: "🛒",
        description: "Bolsas de red tejida con algodon organico certificado, perfectas para compras de frutas y verduras.",
        gradient: "linear-gradient(135deg, #52B788, #2D6A4F)",
        badge: "Organico GOTS",
        tags: ["Algodon", "Organico", "Reutilizable"],
        catalogo: {
            presentaciones: [
                { size: "Pequena 25x30cm",      price: "$45/pieza", min: "Min. 5 pzas" },
                { size: "Mediana 35x40cm",      price: "$65/pieza", min: "Min. 3 pzas" },
                { size: "Grande 45x55cm",       price: "$85/pieza", min: "Min. 2 pzas" },
                { size: "Set Familiar (6 pzas)", price: "$280/set",  min: "Min. 1 set" }
            ],
            materiales:      ["Algodon organico GOTS certificado", "Tintes naturales o sin tenir", "Cordon de algodon", "Sin pesticidas"],
            certificaciones: ["GOTS (Global Organic Textile)", "OEKO-TEX 100", "Comercio Justo"],
            caracteristicas: ["Lavable a maquina 30C", "Durable 500+ usos", "Permite ver el contenido"]
        },
        uso: [
            { icon: "1️⃣", title: "Primera vez", desc: "Lava en agua fria antes del primer uso para quitar residuos de fabricacion." },
            { icon: "2️⃣", title: "Compras",     desc: "Lleva tus bolsas al mercado. Perfectas para frutas, verduras, panes y granel." },
            { icon: "3️⃣", title: "Almacena",    desc: "Guarda frutas y verduras directamente en la bolsa en el refrigerador. La red permite respiracion." },
            { icon: "4️⃣", title: "Lavado",      desc: "Lava a maquina ciclo delicado 30C o a mano con jabon neutro. No usar cloro." },
            { icon: "5️⃣", title: "Secado",      desc: "Seca al aire libre. Evita la secadora para prolongar la vida de la bolsa." }
        ],
        eco: {
            co2:  "Reemplaza 300 bolsas plasticas en su vida util",
            bio:  "6-12 meses (100% natural)",
            agua: "Sin microplasticos al lavar",
            dato: "Una bolsa dura 500+ usos vs 1 solo uso de bolsa plastica"
        }
    },
    {
        id: 5,
        name: "Contenedores de Cana de Azucar",
        emoji: "🌾",
        description: "Contenedores de bagazo de cana certificados para alimentos, incluyendo liquidos calientes y frios.",
        gradient: "linear-gradient(135deg, #E9C46A, #B5781C)",
        badge: "Apto Alimentos",
        tags: ["Bagazo", "Microondas", "Compostable"],
        catalogo: {
            presentaciones: [
                { size: "Plato Hondo 600ml",    price: "$0.85/pza",  min: "Min. 100 pzas" },
                { size: "Bowl 500ml",           price: "$0.75/pza",  min: "Min. 100 pzas" },
                { size: "Vaso Hot 355ml",       price: "$0.60/pza",  min: "Min. 150 pzas" },
                { size: "Clamshell 800ml",      price: "$1.10/pza",  min: "Min. 50 pzas" }
            ],
            materiales:      ["Bagazo de cana de azucar", "Almidon de yuca para union", "Sin blanqueadores toxicos", "Certificado FDA"],
            certificaciones: ["FDA Food Contact", "OK Compost Industrial", "BPI Certified", "PFAS Free"],
            caracteristicas: ["Microondas hasta 3 minutos", "Resistente a grasas", "Temperatura: -20C a +120C"]
        },
        uso: [
            { icon: "1️⃣", title: "Inspeccion",  desc: "Verifica que no haya deformaciones. El color varia naturalmente del beige al cafe claro." },
            { icon: "2️⃣", title: "Uso Caliente", desc: "Perfecto para sopas y bebidas hasta 90C. Coloca sobre superficie plana." },
            { icon: "3️⃣", title: "Microondas",  desc: "Apto microondas hasta 3 minutos. Para mas tiempo, usa vidrio o ceramica." },
            { icon: "4️⃣", title: "Congelador",  desc: "Puede ir al congelador (-20C). Al descongelar, calienta suavemente en microondas." },
            { icon: "5️⃣", title: "Compostar",   desc: "Deposita en compostera industrial o basurero organico. Se degrada en 45-90 dias." }
        ],
        eco: {
            co2:  "65% menos CO2 vs poliestireno (unicel)",
            bio:  "45-90 dias en compost industrial",
            agua: "Producto de residuo agroindustrial",
            dato: "Cada contenedor usa bagazo que de otro modo seria quemado"
        }
    },
    {
        id: 6,
        name: "Botellas de Vidrio Premium",
        emoji: "🪹",
        description: "Botellas y frascos de vidrio reutilizable de alta calidad para agua, jugos y alimentos en conserva.",
        gradient: "linear-gradient(135deg, #48CAE4, #1D4E6F)",
        badge: "Reutilizable 20 anos",
        tags: ["Vidrio", "Reutilizable", "Sin BPA"],
        catalogo: {
            presentaciones: [
                { size: "Botella 350ml",         price: "$85/pza",  min: "Min. 3 pzas" },
                { size: "Botella 500ml",         price: "$95/pza",  min: "Min. 3 pzas" },
                { size: "Botella 1L",            price: "$120/pza", min: "Min. 2 pzas" },
                { size: "Set Familia (5 pzas)", price: "$450/set", min: "Min. 1 set" }
            ],
            materiales:      ["Vidrio borosilicato sin plomo", "Tapa de bambu o acero inoxidable", "Sin BPA ni ftalatos"],
            certificaciones: ["NSF/ANSI 61 agua potable", "CE Certificado", "FDA Aprobado"],
            caracteristicas: ["Lavavajillas 100%", "Vida util 20+ anos", "Resiste cambios termicos bruscos"]
        },
        uso: [
            { icon: "1️⃣", title: "Primera vez", desc: "Lava con agua caliente y jabon neutro. Para bebes, esteriliza en agua hirviendo 5 min." },
            { icon: "2️⃣", title: "Llenado",     desc: "Para bebidas calientes, precalienta con agua tibia. No llenes mas del 90% si vas a congelar." },
            { icon: "3️⃣", title: "Sellado",     desc: "Rosca la tapa firmemente pero sin forzar. Las tapas de bambu no van al lavavajillas." },
            { icon: "4️⃣", title: "Lavado",      desc: "Lava en lavavajillas o con cepillo largo. Enjuaga bien para eliminar residuos de jabon." },
            { icon: "5️⃣", title: "Reciclaje",   desc: "El vidrio es 100% reciclable infinitamente sin perder calidad. Deposita en contenedor de vidrio." }
        ],
        eco: {
            co2:  "Reemplaza 500+ botellas PET en su vida util",
            bio:  "100% reciclable (infinitamente)",
            agua: "Sin lixiviados ni microplasticos",
            dato: "Una botella usada 20 anos = cero plastico en oceanos"
        }
    }
];

// ===== GENERAR TARJETAS DE PRODUCTOS =====
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openModal(${product.id})">
            <div class="product-image" style="background: ${product.gradient}">
                <span>${product.emoji}</span>
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-tags">
                    ${product.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <button class="product-btn" onclick="event.stopPropagation(); openModal(${product.id})">
                    📋 Ver Catalogo y Modo de Uso
                </button>
            </div>
        </div>
    `).join('');
}

// ===== ABRIR MODAL =====
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Header del modal
    document.getElementById('modalHeader').innerHTML = `
        <div class="modal-emoji">${product.emoji}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
    `;
    document.getElementById('modalHeader').style.background = product.gradient;

    // Tab: Catalogo
    const cat = product.catalogo;
    document.getElementById('tab-catalogo').innerHTML = `
        <h4 style="margin-bottom:1rem; color:var(--primary-dark);">📋 Presentaciones Disponibles</h4>
        <div class="catalog-grid">
            ${cat.presentaciones.map(p => `
                <div class="catalog-item">
                    <div class="item-size">${p.size}</div>
                    <div class="item-price">${p.price}</div>
                    <div class="item-min">${p.min}</div>
                </div>
            `).join('')}
        </div>
        <div class="catalog-section">
            <h4>🧪 Materiales</h4>
            <div class="catalog-tags">
                ${cat.materiales.map(m => `<span class="tag">${m}</span>`).join('')}
            </div>
        </div>
        <div class="catalog-section">
            <h4>🎖️ Certificaciones</h4>
            <div class="catalog-tags">
                ${cat.certificaciones.map(c => `<span class="tag" style="background:rgba(45,106,79,0.15)">${c}</span>`).join('')}
            </div>
        </div>
        <div class="catalog-section">
            <h4>✨ Caracteristicas Especiales</h4>
            <div class="catalog-tags">
                ${cat.caracteristicas.map(c => `<span class="tag" style="background:rgba(212,163,115,0.12); color:var(--accent-dark)">${c}</span>`).join('')}
            </div>
        </div>
    `;

    // Tab: Modo de Uso
    document.getElementById('tab-uso').innerHTML = `
        <h4 style="margin-bottom:1.2rem; color:var(--primary-dark);">📚 Guia de Uso Paso a Paso</h4>
        <div class="uso-steps">
            ${product.uso.map(step => `
                <div class="uso-step">
                    <span class="uso-step-icon">${step.icon}</span>
                    <div class="uso-step-content">
                        <h4>${step.title}</h4>
                        <p>${step.desc}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Tab: Impacto Eco
    const eco = product.eco;
    document.getElementById('tab-eco').innerHTML = `
        <h4 style="margin-bottom:1.2rem; color:var(--primary-dark);">🌍 Impacto Ambiental Positivo</h4>
        <div class="eco-stats">
            <div class="eco-stat">
                <div class="eco-stat-value">💨 CO2</div>
                <div class="eco-stat-label">${eco.co2}</div>
            </div>
            <div class="eco-stat">
                <div class="eco-stat-value">🌿 Bio</div>
                <div class="eco-stat-label">${eco.bio}</div>
            </div>
            <div class="eco-stat">
                <div class="eco-stat-value">💧 Agua</div>
                <div class="eco-stat-label">${eco.agua}</div>
            </div>
            <div class="eco-stat">
                <div class="eco-stat-value">♻️ Ciclo</div>
                <div class="eco-stat-label">Economia circular</div>
            </div>
        </div>
        <div class="eco-equivalencia">
            💡 <strong>Dato Eco:</strong> ${eco.dato}
        </div>
    `;

    // Mostrar modal
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Activar primer tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelector('[data-tab="catalogo"]').classList.add('active');
    document.getElementById('tab-catalogo').classList.add('active');
}

// ===== CERRAR MODAL =====
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== TABS DEL MODAL =====
function initModalTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
}

// ===== EVENTOS =====
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    initModalTabs();

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
});
