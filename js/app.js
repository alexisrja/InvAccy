/* ============================================
   ACCY FLOR - Sistema de Inventario de Rosas
   JavaScript Principal
   ============================================ */

// ---- Datos de ejemplo ----
const appData = {
  rosas: [
    { id: 1, nombre: "Freedom", color: "rojo", variedad: "Híbrida de Té", tallosCm: 60, precioTallo: 2.50, stock: 480, minStock: 100, proveedor: "Finca El Rosal" },
    { id: 2, nombre: "Vendela", color: "blanco", variedad: "Híbrida de Té", tallosCm: 50, precioTallo: 2.80, stock: 320, minStock: 80, proveedor: "Flores del Valle" },
    { id: 3, nombre: "Topaz", color: "rosa", variedad: "Híbrida de Té", tallosCm: 60, precioTallo: 3.00, stock: 200, minStock: 80, proveedor: "Finca El Rosal" },
    { id: 4, nombre: "Brighton", color: "amarillo", variedad: "Spray", tallosCm: 40, precioTallo: 2.20, stock: 150, minStock: 60, proveedor: "AgroFlor" },
    { id: 5, nombre: "Confidential", color: "rojo", variedad: "Híbrida de Té", tallosCm: 70, precioTallo: 3.50, stock: 90, minStock: 100, proveedor: "Flores del Valle" },
    { id: 6, nombre: "Ocean Song", color: "lavanda", variedad: "Híbrida de Té", tallosCm: 50, precioTallo: 4.00, stock: 60, minStock: 50, proveedor: "Finca Premium" },
    { id: 7, nombre: "Circus", color: "bicolor", variedad: "Floribunda", tallosCm: 45, precioTallo: 3.20, stock: 45, minStock: 40, proveedor: "AgroFlor" },
    { id: 8, nombre: "High & Magic", color: "naranja", variedad: "Híbrida de Té", tallosCm: 60, precioTallo: 3.80, stock: 180, minStock: 70, proveedor: "Finca Premium" },
  ],
  clientes: [
    { id: 1, nombre: "Florería La Bella", contacto: "María López", telefono: "555-0101", email: "labella@email.com", tipo: "Mayorista" },
    { id: 2, nombre: "Eventos Elegance", contacto: "Carlos Ruiz", telefono: "555-0202", email: "elegance@email.com", tipo: "Eventos" },
    { id: 3, nombre: "Decoraciones Primavera", contacto: "Ana Torres", telefono: "555-0303", email: "primavera@email.com", tipo: "Decoración" },
    { id: 4, nombre: "Rosas Express", contacto: "Pedro Martínez", telefono: "555-0404", email: "rexpress@email.com", tipo: "Minorista" },
  ],
  proveedores: [
    { id: 1, nombre: "Finca El Rosal", contacto: "Juan García", telefono: "555-1001", ubicacion: "Valle Central", variedades: 12 },
    { id: 2, nombre: "Flores del Valle", contacto: "Rosa Méndez", telefono: "555-1002", ubicacion: "Tierras Altas", variedades: 8 },
    { id: 3, nombre: "AgroFlor", contacto: "Miguel Soto", telefono: "555-1003", ubicacion: "Costa Este", variedades: 15 },
    { id: 4, nombre: "Finca Premium", contacto: "Laura Vega", telefono: "555-1004", ubicacion: "Valle Norte", variedades: 10 },
  ],
  ventas: [
    { id: 1001, fecha: "2026-02-28", cliente: "Florería La Bella", items: [{ rosa: "Freedom", cantidad: 100, precio: 2.50 }, { rosa: "Vendela", cantidad: 50, precio: 2.80 }], total: 390.00, estado: "Completada" },
    { id: 1002, fecha: "2026-02-27", cliente: "Eventos Elegance", items: [{ rosa: "Topaz", cantidad: 200, precio: 3.00 }, { rosa: "Ocean Song", cantidad: 80, precio: 4.00 }], total: 920.00, estado: "Completada" },
    { id: 1003, fecha: "2026-02-27", cliente: "Decoraciones Primavera", items: [{ rosa: "Brighton", cantidad: 60, precio: 2.20 }], total: 132.00, estado: "Pendiente" },
    { id: 1004, fecha: "2026-02-26", cliente: "Rosas Express", items: [{ rosa: "High & Magic", cantidad: 150, precio: 3.80 }, { rosa: "Circus", cantidad: 40, precio: 3.20 }], total: 698.00, estado: "Completada" },
  ],
  nextVentaId: 1005,
  ramos: [
    { id: 1, nombre: "Bouquet Romántico", tipo: "Bouquet", desc: "12 rosas rojas con follaje", composicion: [{ rosaId: 1, cantidad: 12 }], precio: 45.00 },
    { id: 2, nombre: "Centro Elegance", tipo: "Centro de Mesa", desc: "Mix de colores para evento", composicion: [{ rosaId: 2, cantidad: 8 }, { rosaId: 3, cantidad: 8 }, { rosaId: 6, cantidad: 4 }], precio: 68.00 },
    { id: 3, nombre: "Caja Sorpresa", tipo: "Caja", desc: "24 rosas bicolor en caja premium", composicion: [{ rosaId: 7, cantidad: 24 }], precio: 95.00 },
  ],
  config: {
    empresa: "Accy Flor",
    telefono: "555-9000",
    email: "contacto@accyflor.com",
    direccion: "",
    moneda: "USD",
    alertaPct: 100,
    iva: 16,
    tema: "rosa"
  }
};

const ACCESS_PASSWORD = 'lacercada01';
const AUTH_SESSION_KEY = 'invaccy_auth_ok';

function lockApp() {
  const gate = document.getElementById('login-gate');
  const app = document.querySelector('.app-container');
  const passwordInput = document.getElementById('login-password');
  const errorEl = document.getElementById('login-error');
  if (gate) gate.classList.add('active');
  if (app) app.classList.add('locked');
  document.body.classList.add('auth-locked');
  if (passwordInput) passwordInput.value = '';
  if (errorEl) errorEl.textContent = '';
  setTimeout(() => passwordInput && passwordInput.focus(), 80);
}

function unlockApp() {
  const gate = document.getElementById('login-gate');
  const app = document.querySelector('.app-container');
  if (gate) gate.classList.remove('active');
  if (app) app.classList.remove('locked');
  document.body.classList.remove('auth-locked');
}

function handleLogin(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('login-password');
  const errorEl = document.getElementById('login-error');
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (password === ACCESS_PASSWORD) {
    sessionStorage.setItem(AUTH_SESSION_KEY, '1');
    unlockApp();
    return;
  }

  if (errorEl) errorEl.textContent = 'Contraseña incorrecta';
  if (passwordInput) {
    passwordInput.value = '';
    passwordInput.focus();
  }
}

function logoutSystem() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  lockApp();
}

// ---- Navegación ----
function navigateTo(section) {
  // Ocultar todas las secciones
  document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
  // Mostrar la sección seleccionada
  const target = document.getElementById('section-' + section);
  if (target) {
    target.classList.add('active');
  }
  // Actualizar nav activo
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-section="${section}"]`);
  if (navItem) navItem.classList.add('active');

  // Actualizar título
  const titles = {
    'inicio': ' Panel de Control',
    'nueva-venta': '🌹 Nueva Venta',
    'catalogo': '📋 Catálogo de Rosas',
    'clientes': '👥 Clientes',
    'proveedores': '🚚 Proveedores',
    'inventario': '📦 Inventario',
    'historial': '📜 Historial de Ventas',
    'dashboard': '📊 Dashboard de Ventas',
    'etiquetas': '🏷️ Etiquetas',
    'ramos': '💐 Ramos y Arreglos',
    'config': '⚙️ Configuración'
  };
  const titleEl = document.querySelector('.page-title h1');
  if (titleEl && titles[section]) {
    titleEl.textContent = titles[section];
  }

  // Cargar datos de la sección
  if (section === 'catalogo') renderCatalogo();
  if (section === 'inventario') renderInventario();
  if (section === 'clientes') renderClientes();
  if (section === 'proveedores') renderProveedores();
  if (section === 'historial') renderHistorial();
  if (section === 'dashboard') renderDashboard();
  if (section === 'inicio') renderInicio();
  if (section === 'nueva-venta') initNuevaVenta();
  if (section === 'etiquetas') renderEtiquetasTable();
  if (section === 'ramos') renderRamos();
}

// ---- Toggle Sidebar ----
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('collapsed');
}

// ---- Renderizar Panel de Inicio ----
function renderInicio() {
  const totalStock = appData.rosas.reduce((s, r) => s + r.stock, 0);
  const totalVariedades = appData.rosas.length;
  const ventasHoy = appData.ventas.filter(v => v.fecha === '2026-02-28').reduce((s, v) => s + v.total, 0);
  const totalClientes = appData.clientes.length;

  document.getElementById('stat-stock').textContent = totalStock.toLocaleString();
  document.getElementById('stat-variedades').textContent = totalVariedades;
  document.getElementById('stat-ventas-hoy').textContent = '$' + ventasHoy.toLocaleString('es-MX', { minimumFractionDigits: 2 });
  document.getElementById('stat-clientes').textContent = totalClientes;

  // Alertas de stock bajo
  const lowStock = appData.rosas.filter(r => r.stock <= r.minStock);
  const alertEl = document.getElementById('low-stock-alerts');
  if (lowStock.length > 0) {
    alertEl.innerHTML = lowStock.map(r => `
      <div class="toast warning" style="animation:none; position:relative; margin-bottom:8px;">
        <i class="bi bi-exclamation-triangle-fill" style="color:#ff9800;"></i>
        <div>
          <strong>${r.nombre}</strong> (${capitalizeFirst(r.color)}) — Stock: <strong>${r.stock}</strong> paquetes (Mín: ${r.minStock})
        </div>
      </div>
    `).join('');
  } else {
    alertEl.innerHTML = '<p style="color:var(--success);"><i class="bi bi-check-circle"></i> Todos los productos están sobre el stock mínimo.</p>';
  }
}

// ---- Renderizar Catálogo ----
function renderCatalogo() {
  const tbody = document.getElementById('catalogo-tbody');
  tbody.innerHTML = appData.rosas.map(r => `
    <tr>
      <td><span class="color-dot ${r.color}"></span>${r.nombre}</td>
      <td>${capitalizeFirst(r.color)}</td>
      <td>${r.variedad}</td>
      <td>${r.tallosCm} cm</td>
      <td>$${r.precioTallo.toFixed(2)}</td>
      <td><span class="stock-badge ${r.stock > r.minStock * 1.5 ? 'high' : r.stock > r.minStock ? 'medium' : 'low'}">${r.stock}</span></td>
      <td>
        <button class="btn btn-outline" onclick="editRosa(${r.id})" title="Editar"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-outline" onclick="deleteRosa(${r.id})" title="Eliminar" style="color:var(--danger);border-color:var(--danger);"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// ---- Renderizar Inventario ----
function renderInventario() {
  const tbody = document.getElementById('inventario-tbody');
  tbody.innerHTML = appData.rosas.map(r => {
    const estado = r.stock <= r.minStock * 0.5 ? 'Crítico' : r.stock <= r.minStock ? 'Bajo' : r.stock <= r.minStock * 1.5 ? 'Normal' : 'Óptimo';
    const estadoClass = estado === 'Crítico' ? 'low' : estado === 'Bajo' ? 'medium' : 'high';
    return `
      <tr>
        <td><span class="color-dot ${r.color}"></span>${r.nombre}</td>
        <td>${capitalizeFirst(r.color)}</td>
        <td><strong>${r.stock}</strong> paquetes</td>
        <td>${r.minStock} paquetes</td>
        <td><span class="stock-badge ${estadoClass}">${estado}</span></td>
        <td>${r.proveedor}</td>
        <td>
          <button class="btn btn-outline" style="font-size:12px;" onclick="adjustStock(${r.id}, 'add')"><i class="bi bi-plus-lg"></i></button>
          <button class="btn btn-outline" style="font-size:12px;" onclick="adjustStock(${r.id}, 'remove')"><i class="bi bi-dash-lg"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

// ---- Renderizar Clientes ----
function renderClientes() {
  const tbody = document.getElementById('clientes-tbody');
  tbody.innerHTML = appData.clientes.map(c => `
    <tr>
      <td><strong>${c.nombre}</strong></td>
      <td>${c.contacto}</td>
      <td>${c.telefono}</td>
      <td>${c.email}</td>
      <td><span class="stock-badge high">${c.tipo}</span></td>
      <td>
        <button class="btn btn-outline" onclick="editCliente(${c.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-outline" onclick="deleteCliente(${c.id})" style="color:var(--danger);"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// ---- Renderizar Proveedores ----
function renderProveedores() {
  const tbody = document.getElementById('proveedores-tbody');
  tbody.innerHTML = appData.proveedores.map(p => `
    <tr>
      <td><strong>${p.nombre}</strong></td>
      <td>${p.contacto}</td>
      <td>${p.telefono}</td>
      <td>${p.ubicacion}</td>
      <td>${p.variedades}</td>
      <td>
        <button class="btn btn-outline" onclick="editProveedor(${p.id})"><i class="bi bi-pencil"></i></button>
      </td>
    </tr>
  `).join('');
}

// ---- Renderizar Historial ----
function renderHistorial() {
  const tbody = document.getElementById('historial-tbody');
  tbody.innerHTML = appData.ventas.map(v => `
    <tr>
      <td>#${v.id}</td>
      <td>${v.fecha}</td>
      <td>${v.cliente}</td>
      <td>${v.items.map(i => `${i.rosa} (${i.cantidad})`).join(', ')}</td>
      <td><strong>$${v.total.toFixed(2)}</strong></td>
      <td><span class="stock-badge ${v.estado === 'Completada' ? 'high' : 'medium'}">${v.estado}</span></td>
    </tr>
  `).join('');
}

// ---- Nueva Venta ----
let ventaItems = [];

function initNuevaVenta() {
  ventaItems = [];
  renderVentaForm();
}

function renderVentaForm() {
  const container = document.getElementById('venta-items');
  container.innerHTML = ventaItems.map((item, idx) => `
    <div class="sale-item-row">
      <div class="form-group" style="margin:0;">
        <select onchange="updateVentaItem(${idx}, 'rosaId', this.value)">
          <option value="">Seleccionar rosa...</option>
          ${appData.rosas.map(r => `<option value="${r.id}" ${item.rosaId == r.id ? 'selected' : ''}>${r.nombre} (${capitalizeFirst(r.color)}) — Stock: ${r.stock}</option>`).join('')}
        </select>
      </div>
      <div class="form-group" style="margin:0;">
        <input type="number" placeholder="Cantidad" min="1" value="${item.cantidad || ''}" onchange="updateVentaItem(${idx}, 'cantidad', this.value)" />
      </div>
      <div class="form-group" style="margin:0; position:relative;">
        <input type="number" placeholder="Precio" step="0.01" value="${item.precio || ''}" 
          ${!item.precioEditado ? 'readonly style="background:var(--accent-light); cursor:default;"' : ''} 
          id="precio-input-${idx}"
          onchange="updateVentaItem(${idx}, 'precio', this.value)" />
        <button type="button" class="btn btn-outline" onclick="habilitarEditarPrecio(${idx})" 
          style="position:absolute; right:2px; top:50%; transform:translateY(-50%); padding:4px 6px; font-size:11px; border:none; ${item.precioEditado ? 'display:none;' : ''}" 
          title="Modificar precio">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <button class="btn btn-outline" onclick="removeVentaItem(${idx})" style="color:var(--danger);height:40px;"><i class="bi bi-x-lg"></i></button>
    </div>
  `).join('');

  const total = ventaItems.reduce((s, i) => s + (parseFloat(i.cantidad) || 0) * (parseFloat(i.precio) || 0), 0);
  document.getElementById('venta-total').textContent = '$' + total.toFixed(2);
}

function addVentaItem() {
  ventaItems.push({ rosaId: '', cantidad: '', precio: '', precioEditado: false });
  renderVentaForm();
}

function removeVentaItem(idx) {
  ventaItems.splice(idx, 1);
  renderVentaForm();
}

function updateVentaItem(idx, field, value) {
  ventaItems[idx][field] = value;
  // Auto-fill price when rosa is selected (only if user hasn't manually edited)
  if (field === 'rosaId' && value) {
    const rosa = appData.rosas.find(r => r.id == value);
    if (rosa) {
      ventaItems[idx].precio = rosa.precioTallo;
      ventaItems[idx].precioEditado = false;
    }
  }
  // Mark price as manually edited
  if (field === 'precio') {
    ventaItems[idx].precioEditado = true;
  }
  renderVentaForm();
}

function habilitarEditarPrecio(idx) {
  ventaItems[idx].precioEditado = true;
  renderVentaForm();
  const input = document.getElementById('precio-input-' + idx);
  if (input) {
    input.focus();
    input.select();
  }
}

function guardarVenta() {
  const clienteSelect = document.getElementById('venta-cliente');
  const clienteNombre = clienteSelect.options[clienteSelect.selectedIndex]?.text;
  
  if (!clienteSelect.value) {
    showToast('Selecciona un cliente', 'error');
    return;
  }
  if (ventaItems.length === 0 || ventaItems.some(i => !i.rosaId || !i.cantidad)) {
    showToast('Agrega al menos un producto con cantidad', 'error');
    return;
  }

  const items = ventaItems.map(i => {
    const rosa = appData.rosas.find(r => r.id == i.rosaId);
    return { rosa: rosa.nombre, cantidad: parseInt(i.cantidad), precio: parseFloat(i.precio) };
  });

  const total = items.reduce((s, i) => s + i.cantidad * i.precio, 0);

  // Descontar del stock
  ventaItems.forEach(i => {
    const rosa = appData.rosas.find(r => r.id == i.rosaId);
    if (rosa) rosa.stock -= parseInt(i.cantidad);
  });

  const ventaId = appData.nextVentaId++;
  const fechaHoy = new Date().toISOString().slice(0, 10);

  appData.ventas.unshift({
    id: ventaId,
    fecha: fechaHoy,
    cliente: clienteNombre,
    items: items,
    total: total,
    estado: 'Completada'
  });

  showToast(`Venta #${ventaId} registrada — $${total.toFixed(2)}`, 'success');

  // Generar factura
  generarFactura(ventaId, fechaHoy, clienteNombre, items, total);

  ventaItems = [];
  renderVentaForm();
  clienteSelect.value = '';
  notificacionesRead = false;
  refreshNotifDot();
}

// ---- Generar Factura ----
function generarFactura(ventaId, fecha, cliente, items, total) {
  const config = appData.config;
  const iva = config.iva || 0;
  const subtotal = total;
  const montoIva = subtotal * (iva / 100);
  const totalConIva = subtotal + montoIva;

  // Convertir favicon a base64 para la ventana de impresión
  const canvas = document.createElement('canvas');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    let faviconBase64 = '';
    try { faviconBase64 = canvas.toDataURL('image/png'); } catch (e) { faviconBase64 = ''; }
    abrirVentanaFactura(ventaId, fecha, cliente, items, subtotal, iva, montoIva, totalConIva, config, faviconBase64);
  };
  img.onerror = function () {
    abrirVentanaFactura(ventaId, fecha, cliente, items, subtotal, iva, montoIva, totalConIva, config, '');
  };
  img.src = 'img/favicon.png';
}

function abrirVentanaFactura(ventaId, fecha, cliente, items, subtotal, iva, montoIva, totalConIva, config, faviconBase64) {
  const printWin = window.open('', '_blank', 'width=820,height=900');
  printWin.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Factura #${ventaId} — ${config.empresa}</title>
  <style>
    @page { size: letter; margin: 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', 'Inter', -apple-system, sans-serif;
      color: #2d1f27;
      background: #fff;
      position: relative;
      padding: 40px 50px;
      min-height: 100vh;
    }
    /* Marca de agua */
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.06;
      pointer-events: none;
      z-index: 0;
    }
    .watermark img {
      width: 420px;
      height: 420px;
      object-fit: contain;
    }
    .factura-content { position: relative; z-index: 1; }

    /* Header */
    .factura-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #6b3a5d;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .factura-brand { display: flex; align-items: center; gap: 14px; }
    .factura-brand img { width: 56px; height: 56px; border-radius: 12px; }
    .factura-brand h1 { font-size: 28px; font-weight: 800; color: #6b3a5d; }
    .factura-brand p { font-size: 12px; color: #6b5460; margin-top: 2px; }
    .factura-id { text-align: right; }
    .factura-id h2 { font-size: 22px; font-weight: 800; color: #6b3a5d; letter-spacing: 1px; }
    .factura-id p { font-size: 13px; color: #6b5460; margin-top: 4px; }

    /* Info boxes */
    .factura-info-row {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 30px;
    }
    .factura-info-box {
      flex: 1;
      background: #faf5f7;
      border: 1px solid #e8d0dc;
      border-radius: 10px;
      padding: 16px 20px;
    }
    .factura-info-box h4 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6b3a5d;
      margin-bottom: 8px;
      font-weight: 700;
    }
    .factura-info-box p { font-size: 13px; color: #2d1f27; line-height: 1.6; }
    .factura-info-box p strong { font-weight: 700; }

    /* Tabla */
    .factura-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .factura-table thead th {
      background: #6b3a5d;
      color: #fff;
      padding: 10px 14px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 700;
      text-align: left;
    }
    .factura-table thead th:first-child { border-radius: 8px 0 0 0; }
    .factura-table thead th:last-child { border-radius: 0 8px 0 0; text-align: right; }
    .factura-table tbody td {
      padding: 10px 14px;
      font-size: 13px;
      border-bottom: 1px solid #e8d0dc;
    }
    .factura-table tbody tr:nth-child(even) { background: #faf5f7; }
    .factura-table tbody td:last-child { text-align: right; font-weight: 600; }
    .factura-table tbody td.qty { text-align: center; }
    .factura-table tbody td.price { text-align: right; }

    /* Totales */
    .factura-totals {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40px;
    }
    .factura-totals-box {
      width: 280px;
      border: 1px solid #e8d0dc;
      border-radius: 10px;
      overflow: hidden;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 18px;
      font-size: 13px;
    }
    .total-row.subtotal { background: #faf5f7; }
    .total-row.iva { background: #faf5f7; border-top: 1px solid #e8d0dc; }
    .total-row.grand {
      background: #6b3a5d;
      color: #fff;
      font-size: 16px;
      font-weight: 800;
      padding: 14px 18px;
    }

    /* Footer */
    .factura-footer {
      border-top: 2px solid #e8d0dc;
      padding-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #9a8590;
    }
    .factura-footer p { margin-bottom: 4px; }
    .factura-footer strong { color: #6b3a5d; }

    /* Print button */
    .no-print { text-align: center; margin-top: 30px; }
    .no-print button {
      padding: 12px 32px; font-size: 15px; font-weight: 700;
      border: none; border-radius: 10px; cursor: pointer;
      color: #fff; background: #6b3a5d;
    }
    .no-print button:hover { background: #4e2a44; }
    .no-print .btn-close-factura {
      background: transparent; color: #6b5460; border: 1px solid #e8d0dc;
      margin-left: 10px;
    }
    @media print {
      .no-print { display: none !important; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  ${faviconBase64 ? `<div class="watermark"><img src="${faviconBase64}" alt="watermark" /></div>` : ''}
  <div class="factura-content">
    <!-- Header -->
    <div class="factura-header">
      <div class="factura-brand">
        ${faviconBase64 ? `<img src="${faviconBase64}" alt="logo" />` : ''}
        <div>
          <h1>${config.empresa}</h1>
          <p>${config.telefono ? config.telefono : ''} ${config.email ? '• ' + config.email : ''}</p>
          ${config.direccion ? `<p>${config.direccion}</p>` : ''}
        </div>
      </div>
      <div class="factura-id">
        <h2>FACTURA</h2>
        <p><strong>#${ventaId}</strong></p>
        <p>Fecha: <strong>${fecha}</strong></p>
      </div>
    </div>

    <!-- Info -->
    <div class="factura-info-row">
      <div class="factura-info-box">
        <h4>Facturado a</h4>
        <p><strong>${cliente}</strong></p>
      </div>
      <div class="factura-info-box">
        <h4>Detalles</h4>
        <p>Método: <strong>Pendiente</strong></p>
        <p>Estado: <strong>Completada</strong></p>
      </div>
    </div>

    <!-- Tabla de productos -->
    <table class="factura-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th style="text-align:center;">Cantidad</th>
          <th style="text-align:right;">Precio Unit.</th>
          <th>Importe</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${item.rosa}</td>
            <td class="qty">${item.cantidad}</td>
            <td class="price">$${item.precio.toFixed(2)}</td>
            <td>$${(item.cantidad * item.precio).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Totales -->
    <div class="factura-totals">
      <div class="factura-totals-box">
        <div class="total-row subtotal">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="total-row iva">
          <span>IVA (${iva}%)</span>
          <span>$${montoIva.toFixed(2)}</span>
        </div>
        <div class="total-row grand">
          <span>TOTAL</span>
          <span>$${totalConIva.toFixed(2)}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="factura-footer">
      <p><strong>${config.empresa}</strong></p>
      <p>${config.telefono || ''} ${config.email ? '• ' + config.email : ''}</p>
      <p style="margin-top:8px;">Gracias por su compra</p>
    </div>

    <!-- Botones (no se imprimen) -->
    <div class="no-print">
      <button onclick="window.print();">🖨️ Imprimir Factura</button>
      <button class="btn-close-factura" onclick="window.close();">Cerrar</button>
    </div>
  </div>
</body>
</html>`);
  printWin.document.close();
}

// ---- Ajustar Stock ----
function adjustStock(rosaId, type) {
  const rosa = appData.rosas.find(r => r.id === rosaId);
  if (!rosa) return;

  const cantidad = prompt(`${type === 'add' ? 'Agregar' : 'Retirar'} paquetes de "${rosa.nombre}":\nStock actual: ${rosa.stock}\n\nCantidad:`);
  if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) return;

  const num = parseInt(cantidad);
  if (type === 'add') {
    rosa.stock += num;
    showToast(`+${num} paquetes de ${rosa.nombre} agregados`, 'success');
  } else {
    if (num > rosa.stock) {
      showToast('No hay suficiente stock', 'error');
      return;
    }
    rosa.stock -= num;
    showToast(`-${num} paquetes de ${rosa.nombre} retirados`, 'warning');
  }
  renderInventario();
  notificacionesRead = false;
  refreshNotifDot();
}

// ---- CRUD Rosas ----
function openAddRosaModal() {
  document.getElementById('rosa-modal-title').textContent = 'Agregar Nueva Rosa';
  document.getElementById('rosa-form').reset();
  document.getElementById('rosa-form').dataset.editId = '';
  showModal('rosa-modal');
}

function editRosa(id) {
  const rosa = appData.rosas.find(r => r.id === id);
  if (!rosa) return;
  document.getElementById('rosa-modal-title').textContent = 'Editar Rosa';
  document.getElementById('rosa-nombre').value = rosa.nombre;
  document.getElementById('rosa-color').value = rosa.color;
  document.getElementById('rosa-variedad').value = rosa.variedad;
  document.getElementById('rosa-tallo').value = rosa.tallosCm;
  document.getElementById('rosa-precio').value = rosa.precioTallo;
  document.getElementById('rosa-stock').value = rosa.stock;
  document.getElementById('rosa-minstock').value = rosa.minStock;
  document.getElementById('rosa-proveedor').value = rosa.proveedor;
  document.getElementById('rosa-form').dataset.editId = id;
  showModal('rosa-modal');
}

function saveRosa() {
  const form = document.getElementById('rosa-form');
  const editId = form.dataset.editId;
  const data = {
    nombre: document.getElementById('rosa-nombre').value.trim(),
    color: document.getElementById('rosa-color').value,
    variedad: document.getElementById('rosa-variedad').value.trim(),
    tallosCm: parseInt(document.getElementById('rosa-tallo').value),
    precioTallo: parseFloat(document.getElementById('rosa-precio').value),
    stock: parseInt(document.getElementById('rosa-stock').value),
    minStock: parseInt(document.getElementById('rosa-minstock').value),
    proveedor: document.getElementById('rosa-proveedor').value
  };

  if (!data.nombre || !data.color) {
    showToast('Completa los campos obligatorios', 'error');
    return;
  }

  if (editId) {
    const idx = appData.rosas.findIndex(r => r.id == editId);
    if (idx >= 0) {
      appData.rosas[idx] = { ...appData.rosas[idx], ...data };
      showToast(`"${data.nombre}" actualizada`, 'success');
    }
  } else {
    data.id = Math.max(...appData.rosas.map(r => r.id), 0) + 1;
    appData.rosas.push(data);
    showToast(`"${data.nombre}" agregada al catálogo`, 'success');
  }

  closeModal('rosa-modal');
  renderCatalogo();
}

function deleteRosa(id) {
  const rosa = appData.rosas.find(r => r.id === id);
  if (!rosa) return;
  if (!confirm(`¿Eliminar "${rosa.nombre}" del catálogo?`)) return;
  appData.rosas = appData.rosas.filter(r => r.id !== id);
  showToast(`"${rosa.nombre}" eliminada`, 'warning');
  renderCatalogo();
}

// ---- CRUD Clientes ----
function openAddClienteModal() {
  document.getElementById('cliente-modal-title').textContent = 'Agregar Cliente';
  document.getElementById('cliente-form').reset();
  document.getElementById('cliente-form').dataset.editId = '';
  showModal('cliente-modal');
}

function editCliente(id) {
  const c = appData.clientes.find(c => c.id === id);
  if (!c) return;
  document.getElementById('cliente-modal-title').textContent = 'Editar Cliente';
  document.getElementById('cliente-nombre').value = c.nombre;
  document.getElementById('cliente-contacto').value = c.contacto;
  document.getElementById('cliente-telefono').value = c.telefono;
  document.getElementById('cliente-email').value = c.email;
  document.getElementById('cliente-tipo').value = c.tipo;
  document.getElementById('cliente-form').dataset.editId = id;
  showModal('cliente-modal');
}

function saveCliente() {
  const form = document.getElementById('cliente-form');
  const editId = form.dataset.editId;
  const data = {
    nombre: document.getElementById('cliente-nombre').value.trim(),
    contacto: document.getElementById('cliente-contacto').value.trim(),
    telefono: document.getElementById('cliente-telefono').value.trim(),
    email: document.getElementById('cliente-email').value.trim(),
    tipo: document.getElementById('cliente-tipo').value,
  };

  if (!data.nombre) {
    showToast('El nombre es obligatorio', 'error');
    return;
  }

  if (editId) {
    const idx = appData.clientes.findIndex(c => c.id == editId);
    if (idx >= 0) {
      appData.clientes[idx] = { ...appData.clientes[idx], ...data };
      showToast(`"${data.nombre}" actualizado`, 'success');
    }
  } else {
    data.id = Math.max(...appData.clientes.map(c => c.id), 0) + 1;
    appData.clientes.push(data);
    showToast(`"${data.nombre}" agregado`, 'success');
  }

  closeModal('cliente-modal');
  renderClientes();
}

function deleteCliente(id) {
  const c = appData.clientes.find(c => c.id === id);
  if (!c) return;
  if (!confirm(`¿Eliminar "${c.nombre}"?`)) return;
  appData.clientes = appData.clientes.filter(c => c.id !== id);
  showToast(`"${c.nombre}" eliminado`, 'warning');
  renderClientes();
}

// ---- CRUD Proveedores ----
function openAddProveedorModal() {
  document.getElementById('proveedor-modal-title').textContent = 'Agregar Proveedor';
  document.getElementById('proveedor-form').reset();
  document.getElementById('proveedor-form').dataset.editId = '';
  showModal('proveedor-modal');
}

function editProveedor(id) {
  const p = appData.proveedores.find(p => p.id === id);
  if (!p) return;
  document.getElementById('proveedor-modal-title').textContent = 'Editar Proveedor';
  document.getElementById('proveedor-nombre').value = p.nombre;
  document.getElementById('proveedor-contacto').value = p.contacto;
  document.getElementById('proveedor-telefono').value = p.telefono;
  document.getElementById('proveedor-ubicacion').value = p.ubicacion;
  document.getElementById('proveedor-form').dataset.editId = id;
  showModal('proveedor-modal');
}

function saveProveedor() {
  const form = document.getElementById('proveedor-form');
  const editId = form.dataset.editId;
  const data = {
    nombre: document.getElementById('proveedor-nombre').value.trim(),
    contacto: document.getElementById('proveedor-contacto').value.trim(),
    telefono: document.getElementById('proveedor-telefono').value.trim(),
    ubicacion: document.getElementById('proveedor-ubicacion').value.trim(),
    variedades: 0,
  };

  if (!data.nombre) {
    showToast('El nombre es obligatorio', 'error');
    return;
  }

  if (editId) {
    const idx = appData.proveedores.findIndex(p => p.id == editId);
    if (idx >= 0) {
      appData.proveedores[idx] = { ...appData.proveedores[idx], ...data };
      showToast(`"${data.nombre}" actualizado`, 'success');
    }
  } else {
    data.id = Math.max(...appData.proveedores.map(p => p.id), 0) + 1;
    appData.proveedores.push(data);
    showToast(`"${data.nombre}" agregado`, 'success');
  }

  closeModal('proveedor-modal');
  renderProveedores();
}

// ---- Modal Helpers ----
function showModal(id) {
  document.getElementById(id).classList.add('show');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

// ---- Toast Notifications ----
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="bi bi-${type === 'success' ? 'check-circle-fill' : type === 'error' ? 'x-circle-fill' : 'exclamation-triangle-fill'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ---- Notificaciones ----
let notificacionesRead = false;

function toggleNotificaciones() {
  const panel = document.getElementById('notif-panel');
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
  } else {
    buildNotificaciones();
    panel.classList.add('open');
  }
}

// Cerrar panel al hacer clic fuera
document.addEventListener('click', function(e) {
  const panel = document.getElementById('notif-panel');
  if (panel && panel.classList.contains('open')) {
    const btn = e.target.closest('.header-btn');
    const panelClick = e.target.closest('.notif-panel');
    if (!btn && !panelClick) {
      panel.classList.remove('open');
    }
  }
});

function buildNotificaciones() {
  const list = document.getElementById('notif-list');
  const notifs = [];

  // 1. Alertas de stock bajo / crítico
  appData.rosas.forEach(r => {
    if (r.stock <= r.minStock * 0.5) {
      notifs.push({
        type: 'stock-alert',
        icon: 'bi-exclamation-triangle-fill',
        title: `⚠️ Stock CRÍTICO: ${r.nombre}`,
        desc: `Solo quedan ${r.stock} paquetes (mín: ${r.minStock}). ¡Reabastecer urgente!`,
        time: 'Ahora',
        priority: 1
      });
    } else if (r.stock <= r.minStock) {
      notifs.push({
        type: 'stock-alert',
        icon: 'bi-exclamation-circle-fill',
        title: `Stock bajo: ${r.nombre}`,
        desc: `${r.stock} paquetes en stock (mín: ${r.minStock}). Considerar pedido.`,
        time: 'Hoy',
        priority: 2
      });
    }
  });

  // 2. Ventas pendientes
  const pendientes = appData.ventas.filter(v => v.estado === 'Pendiente');
  pendientes.forEach(v => {
    notifs.push({
      type: 'sale-alert',
      icon: 'bi-clock-fill',
      title: `Venta #${v.id} pendiente`,
      desc: `${v.cliente} — $${v.total.toFixed(2)}. Confirmar entrega.`,
      time: v.fecha,
      priority: 3
    });
  });

  // 3. Info general
  const totalStock = appData.rosas.reduce((s, r) => s + r.stock, 0);
  if (totalStock > 0) {
    notifs.push({
      type: 'info-alert',
      icon: 'bi-info-circle-fill',
      title: 'Resumen del día',
      desc: `${totalStock.toLocaleString()} paquetes en inventario. ${appData.ventas.filter(v => v.fecha === '2026-02-28').length} ventas hoy.`,
      time: 'Hoy',
      priority: 4
    });
  }

  // Ordenar por prioridad
  notifs.sort((a, b) => a.priority - b.priority);

  if (notifs.length === 0) {
    list.innerHTML = `
      <div class="notif-empty">
        <i class="bi bi-bell-slash"></i>
        <p>No hay notificaciones</p>
      </div>
    `;
  } else {
    list.innerHTML = notifs.map(n => `
      <div class="notif-item ${notificacionesRead ? '' : 'unread'}">
        <div class="notif-icon ${n.type}"><i class="bi ${n.icon}"></i></div>
        <div class="notif-text">
          <strong>${n.title}</strong>
          <small>${n.desc}</small>
          <small style="display:block; margin-top:3px; color:var(--primary);">${n.time}</small>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('notif-count').textContent = `${notifs.length} alerta${notifs.length !== 1 ? 's' : ''}`;
  updateNotifDot(notifs.length);
}

function markAllRead() {
  notificacionesRead = true;
  document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
  document.getElementById('notif-dot').classList.remove('visible');
}

function updateNotifDot(count) {
  const dot = document.getElementById('notif-dot');
  if (count > 0 && !notificacionesRead) {
    dot.classList.add('visible');
  } else {
    dot.classList.remove('visible');
  }
}

function refreshNotifDot() {
  const lowStock = appData.rosas.filter(r => r.stock <= r.minStock).length;
  const pendientes = appData.ventas.filter(v => v.estado === 'Pendiente').length;
  const total = lowStock + pendientes;
  updateNotifDot(total);
}

// ---- Keyboard Shortcut ----
document.addEventListener('keydown', function(e) {
  if (e.key === 'F2') {
    e.preventDefault();
    navigateTo('nueva-venta');
  }
  if (e.key === 'Escape') {
    const panel = document.getElementById('notif-panel');
    if (panel && panel.classList.contains('open')) {
      panel.classList.remove('open');
    }
  }
});

// ---- Utilities ----
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ---- Etiquetas ----
function generateBarcode(code) {
  // Genera un código de barras SVG simple basado en el código
  let bars = '';
  const seed = code.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  let x = 0;
  for (let i = 0; i < 40; i++) {
    const width = ((seed * (i + 1) * 7) % 3) + 1;
    const isBar = i % 2 === 0;
    if (isBar) {
      bars += `<rect x="${x}" y="0" width="${width}" height="40" fill="#2d1f27"/>`;
    }
    x += width + 1;
  }
  return `<svg viewBox="0 0 ${x} 50" style="width:100%;height:40px;">${bars}<text x="${x/2}" y="48" text-anchor="middle" font-size="7" fill="#2d1f27" font-family="monospace">${code}</text></svg>`;
}

function getRosaCode(rosa) {
  return 'AF-' + String(rosa.id).padStart(4, '0') + '-' + rosa.color.substring(0, 3).toUpperCase();
}

function renderEtiquetasTable() {
  const tbody = document.getElementById('etiquetas-tbody');
  tbody.innerHTML = appData.rosas.map(r => {
    const code = getRosaCode(r);
    return `
      <tr>
        <td><input type="checkbox" class="etiqueta-check" data-id="${r.id}" onchange="previewEtiquetas()" /></td>
        <td><span class="color-dot ${r.color}"></span><strong>${r.nombre}</strong></td>
        <td>${capitalizeFirst(r.color)}</td>
        <td>$${r.precioTallo.toFixed(2)}</td>
        <td><code style="font-size:12px; background:var(--bg-main); padding:2px 8px; border-radius:4px;">${code}</code></td>
        <td><input type="number" class="etiqueta-qty" data-id="${r.id}" min="1" value="1" style="width:60px; padding:4px 8px; border:1px solid var(--border); border-radius:6px; font-size:13px;" onchange="previewEtiquetas()" /></td>
      </tr>
    `;
  }).join('');
}

function toggleAllEtiquetas(checked) {
  document.querySelectorAll('.etiqueta-check').forEach(cb => cb.checked = checked);
  previewEtiquetas();
}

function selectAllEtiquetas() {
  const checkAll = document.getElementById('check-all-etiquetas');
  checkAll.checked = true;
  toggleAllEtiquetas(true);
}

function toggleEtiquetaConfig() {
  const config = document.getElementById('etiqueta-config');
  const btn = document.getElementById('btn-toggle-config');
  if (config.style.display === 'none') {
    config.style.display = 'block';
    btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
  } else {
    config.style.display = 'none';
    btn.innerHTML = '<i class="bi bi-chevron-down"></i>';
  }
}

function previewEtiquetas() {
  const preview = document.getElementById('etiquetas-preview');
  const countEl = document.getElementById('etiquetas-count');
  const size = document.getElementById('etiqueta-size').value;
  const showNombre = document.getElementById('show-nombre').checked;
  const showColor = document.getElementById('show-color').checked;
  const showPrecio = document.getElementById('show-precio').checked;
  const showCodigo = document.getElementById('show-codigo').checked;
  const showVariedad = document.getElementById('show-variedad').checked;
  const showTallo = document.getElementById('show-tallo').checked;

  const selected = [];
  document.querySelectorAll('.etiqueta-check:checked').forEach(cb => {
    const id = parseInt(cb.dataset.id);
    const rosa = appData.rosas.find(r => r.id === id);
    const qtyInput = document.querySelector(`.etiqueta-qty[data-id="${id}"]`);
    const qty = parseInt(qtyInput?.value) || 1;
    if (rosa) {
      for (let i = 0; i < qty; i++) {
        selected.push(rosa);
      }
    }
  });

  if (selected.length === 0) {
    preview.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-tags"></i>
        <h3>Selecciona productos</h3>
        <p>Marca las rosas de la tabla para generar etiquetas.</p>
      </div>
    `;
    countEl.textContent = '0 etiquetas';
    return;
  }

  countEl.textContent = `${selected.length} etiqueta${selected.length !== 1 ? 's' : ''}`;

  preview.innerHTML = selected.map(r => {
    const code = getRosaCode(r);
    const sizeClass = `etiqueta-${size}`;
    return `
      <div class="etiqueta-card ${sizeClass}">
        <div class="etiqueta-header">
          <span class="etiqueta-brand">Accy Flor</span>
          <span class="color-dot ${r.color}" style="width:10px;height:10px;"></span>
        </div>
        <div class="etiqueta-body">
          ${showNombre ? `<div class="etiqueta-nombre">${r.nombre}</div>` : ''}
          ${showColor ? `<div class="etiqueta-detail">${capitalizeFirst(r.color)}</div>` : ''}
          ${showVariedad ? `<div class="etiqueta-detail">${r.variedad}</div>` : ''}
          ${showTallo ? `<div class="etiqueta-detail">${r.tallosCm} cm</div>` : ''}
          ${showPrecio ? `<div class="etiqueta-precio">$${r.precioTallo.toFixed(2)}</div>` : ''}
        </div>
        ${showCodigo ? `<div class="etiqueta-barcode">${generateBarcode(code)}</div>` : ''}
      </div>
    `;
  }).join('');
}

function imprimirEtiquetas() {
  const selected = document.querySelectorAll('.etiqueta-check:checked');
  if (selected.length === 0) {
    showToast('Selecciona al menos una rosa para imprimir', 'error');
    return;
  }

  // Generar ventana de impresión
  const preview = document.getElementById('etiquetas-preview').innerHTML;
  const size = document.getElementById('etiqueta-size').value;
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Etiquetas - Accy Flor</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; padding: 10mm; }
        .etiquetas-preview-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: flex-start;
        }
        .etiqueta-card {
          border: 1.5px solid #2d1f27;
          border-radius: 8px;
          padding: 10px;
          page-break-inside: avoid;
        }
        .etiqueta-small { width: 50mm; min-height: 30mm; }
        .etiqueta-medium { width: 70mm; min-height: 40mm; }
        .etiqueta-large { width: 100mm; min-height: 60mm; }
        .etiqueta-header {
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 6px;
        }
        .etiqueta-brand { font-size: 10px; font-weight: 700; color: #6b3a5d; }
        .etiqueta-nombre { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
        .etiqueta-detail { font-size: 10px; color: #666; }
        .etiqueta-precio { font-size: 16px; font-weight: 800; color: #6b3a5d; margin-top: 4px; }
        .etiqueta-barcode { margin-top: 6px; }
        .color-dot {
          width: 10px; height: 10px; border-radius: 50%; display: inline-block;
          border: 1px solid rgba(0,0,0,0.2);
        }
        .color-dot.rojo { background: #e53935; }
        .color-dot.blanco { background: #f5f5f5; }
        .color-dot.rosa { background: #ec407a; }
        .color-dot.amarillo { background: #fdd835; }
        .color-dot.naranja { background: #ff9800; }
        .color-dot.lavanda { background: #ab47bc; }
        .color-dot.bicolor { background: linear-gradient(135deg, #e53935 50%, #fdd835 50%); }
        @media print { body { padding: 5mm; } }
      </style>
    </head>
    <body>
      <div class="etiquetas-preview-grid">${preview}</div>
      <script>window.onload = function() { window.print(); }<\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
  showToast(`Imprimiendo ${selected.length} etiqueta(s)...`, 'success');
}

// ---- Ramos y Arreglos ----
let ramoComposicion = [];

function renderRamos() {
  const grid = document.getElementById('ramos-grid');
  if (appData.ramos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-flower2"></i>
        <h3>Sin arreglos</h3>
        <p>Crea tu primer ramo o arreglo floral.</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = appData.ramos.map(ramo => {
    const costo = calcRamoCosto(ramo.composicion);
    const ganancia = ramo.precio - costo;
    const rosasDesc = ramo.composicion.map(c => {
      const rosa = appData.rosas.find(r => r.id === c.rosaId);
      return rosa ? `${c.cantidad}× ${rosa.nombre}` : `${c.cantidad}× (?)`;
    }).join(', ');
    const totalTallos = ramo.composicion.reduce((s, c) => s + c.cantidad, 0);
    return `
      <div class="ramo-card">
        <div class="ramo-card-header">
          <div>
            <div class="ramo-card-title">${ramo.nombre}</div>
            <span class="stock-badge high" style="font-size:11px;">${ramo.tipo}</span>
          </div>
          <div class="ramo-card-price">$${ramo.precio.toFixed(2)}</div>
        </div>
        <div class="ramo-card-body">
          <p style="font-size:13px; color:var(--text-light); margin-bottom:8px;">${ramo.desc || 'Sin descripción'}</p>
          <div class="ramo-composicion-list">
            <strong style="font-size:12px;">Composición (${totalTallos} paquetes):</strong>
            <div style="font-size:12px; color:var(--text-medium); margin-top:4px;">${rosasDesc}</div>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:12px;">
            <span>Costo: <strong>$${costo.toFixed(2)}</strong></span>
            <span style="color:${ganancia >= 0 ? 'var(--success)' : 'var(--danger)'};">Ganancia: <strong>$${ganancia.toFixed(2)}</strong></span>
          </div>
        </div>
        <div class="ramo-card-footer">
          <button class="btn btn-outline" style="font-size:12px;" onclick="editRamo(${ramo.id})"><i class="bi bi-pencil"></i> Editar</button>
          <button class="btn btn-primary" style="font-size:12px;" onclick="sellRamo(${ramo.id})"><i class="bi bi-cart-plus"></i> Vender</button>
          <button class="btn btn-outline" style="font-size:12px; color:var(--danger); border-color:var(--danger);" onclick="deleteRamo(${ramo.id})"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function calcRamoCosto(composicion) {
  return composicion.reduce((s, c) => {
    const rosa = appData.rosas.find(r => r.id === c.rosaId);
    return s + (rosa ? rosa.precioTallo * c.cantidad : 0);
  }, 0);
}

function openAddRamoModal() {
  document.getElementById('ramo-modal-title').textContent = 'Nuevo Arreglo Floral';
  document.getElementById('ramo-form').reset();
  document.getElementById('ramo-form').dataset.editId = '';
  document.getElementById('ramo-costo').value = '$0.00';
  ramoComposicion = [{ rosaId: '', cantidad: 1 }];
  renderRamoComposicion();
  showModal('ramo-modal');
}

function editRamo(id) {
  const ramo = appData.ramos.find(r => r.id === id);
  if (!ramo) return;
  document.getElementById('ramo-modal-title').textContent = 'Editar Arreglo';
  document.getElementById('ramo-nombre').value = ramo.nombre;
  document.getElementById('ramo-tipo').value = ramo.tipo;
  document.getElementById('ramo-desc').value = ramo.desc || '';
  document.getElementById('ramo-precio').value = ramo.precio;
  document.getElementById('ramo-form').dataset.editId = id;
  ramoComposicion = ramo.composicion.map(c => ({ ...c }));
  renderRamoComposicion();
  showModal('ramo-modal');
}

function renderRamoComposicion() {
  const container = document.getElementById('ramo-composicion');
  container.innerHTML = ramoComposicion.map((c, idx) => `
    <div class="sale-item-row" style="margin-bottom:6px;">
      <div class="form-group" style="margin:0;">
        <select onchange="updateRamoComp(${idx}, 'rosaId', this.value)" style="font-size:13px; padding:6px 10px;">
          <option value="">Seleccionar rosa...</option>
          ${appData.rosas.map(r => `<option value="${r.id}" ${c.rosaId == r.id ? 'selected' : ''}>${r.nombre} (${capitalizeFirst(r.color)})</option>`).join('')}
        </select>
      </div>
      <div class="form-group" style="margin:0;">
        <input type="number" min="1" value="${c.cantidad}" onchange="updateRamoComp(${idx}, 'cantidad', this.value)" style="font-size:13px; padding:6px 10px;" placeholder="Cant." />
      </div>
      <div></div>
      <button class="btn btn-outline" onclick="removeRamoComp(${idx})" style="color:var(--danger);height:34px;font-size:12px;"><i class="bi bi-x-lg"></i></button>
    </div>
  `).join('');
  updateRamoCosto();
}

function addRamoRosa() {
  ramoComposicion.push({ rosaId: '', cantidad: 1 });
  renderRamoComposicion();
}

function removeRamoComp(idx) {
  ramoComposicion.splice(idx, 1);
  renderRamoComposicion();
}

function updateRamoComp(idx, field, value) {
  ramoComposicion[idx][field] = field === 'cantidad' ? parseInt(value) || 1 : value;
  updateRamoCosto();
}

function updateRamoCosto() {
  const costo = calcRamoCosto(ramoComposicion.filter(c => c.rosaId));
  document.getElementById('ramo-costo').value = '$' + costo.toFixed(2);
}

function saveRamo() {
  const form = document.getElementById('ramo-form');
  const editId = form.dataset.editId;
  const data = {
    nombre: document.getElementById('ramo-nombre').value.trim(),
    tipo: document.getElementById('ramo-tipo').value,
    desc: document.getElementById('ramo-desc').value.trim(),
    composicion: ramoComposicion.filter(c => c.rosaId && c.cantidad > 0).map(c => ({ rosaId: parseInt(c.rosaId), cantidad: c.cantidad })),
    precio: parseFloat(document.getElementById('ramo-precio').value) || 0,
  };
  if (!data.nombre) { showToast('El nombre es obligatorio', 'error'); return; }
  if (data.composicion.length === 0) { showToast('Agrega al menos una rosa', 'error'); return; }

  if (editId) {
    const idx = appData.ramos.findIndex(r => r.id == editId);
    if (idx >= 0) { appData.ramos[idx] = { ...appData.ramos[idx], ...data }; showToast(`"${data.nombre}" actualizado`, 'success'); }
  } else {
    data.id = Math.max(...appData.ramos.map(r => r.id), 0) + 1;
    appData.ramos.push(data);
    showToast(`"${data.nombre}" creado`, 'success');
  }
  closeModal('ramo-modal');
  renderRamos();
}

function deleteRamo(id) {
  const ramo = appData.ramos.find(r => r.id === id);
  if (!ramo || !confirm(`¿Eliminar "${ramo.nombre}"?`)) return;
  appData.ramos = appData.ramos.filter(r => r.id !== id);
  showToast(`"${ramo.nombre}" eliminado`, 'warning');
  renderRamos();
}

function sellRamo(id) {
  const ramo = appData.ramos.find(r => r.id === id);
  if (!ramo) return;
  // Verificar stock
  for (const c of ramo.composicion) {
    const rosa = appData.rosas.find(r => r.id === c.rosaId);
    if (!rosa || rosa.stock < c.cantidad) {
      showToast(`Stock insuficiente de "${rosa ? rosa.nombre : '?'}" para este arreglo`, 'error');
      return;
    }
  }
  if (!confirm(`¿Vender "${ramo.nombre}" por $${ramo.precio.toFixed(2)}?`)) return;
  // Descontar stock
  ramo.composicion.forEach(c => {
    const rosa = appData.rosas.find(r => r.id === c.rosaId);
    if (rosa) rosa.stock -= c.cantidad;
  });
  // Registrar venta
  const items = ramo.composicion.map(c => {
    const rosa = appData.rosas.find(r => r.id === c.rosaId);
    return { rosa: rosa ? rosa.nombre : '?', cantidad: c.cantidad, precio: rosa ? rosa.precioTallo : 0 };
  });
  appData.ventas.unshift({
    id: appData.nextVentaId++,
    fecha: '2026-02-28',
    cliente: 'Venta directa (Arreglo)',
    items: items,
    total: ramo.precio,
    estado: 'Completada'
  });
  showToast(`Arreglo "${ramo.nombre}" vendido — $${ramo.precio.toFixed(2)}`, 'success');
  notificacionesRead = false;
  refreshNotifDot();
  renderRamos();
}

// ---- Búsqueda Global ----
let searchTimeout;
function globalSearch(query) {
  clearTimeout(searchTimeout);
  const results = document.getElementById('search-results');
  if (!query || query.length < 2) {
    results.style.display = 'none';
    results.innerHTML = '';
    return;
  }
  searchTimeout = setTimeout(() => {
    const q = query.toLowerCase();
    const matches = [];

    // Buscar rosas
    appData.rosas.filter(r => r.nombre.toLowerCase().includes(q) || r.color.toLowerCase().includes(q) || r.variedad.toLowerCase().includes(q))
      .forEach(r => matches.push({ type: 'rosa', icon: 'bi-flower1', label: r.nombre, desc: `${capitalizeFirst(r.color)} — $${r.precioTallo.toFixed(2)} — Stock: ${r.stock}`, action: "navigateTo('catalogo')" }));

    // Buscar clientes
    appData.clientes.filter(c => c.nombre.toLowerCase().includes(q) || c.contacto.toLowerCase().includes(q))
      .forEach(c => matches.push({ type: 'cliente', icon: 'bi-person', label: c.nombre, desc: `${c.contacto} — ${c.telefono}`, action: "navigateTo('clientes')" }));

    // Buscar proveedores
    appData.proveedores.filter(p => p.nombre.toLowerCase().includes(q) || p.ubicacion.toLowerCase().includes(q))
      .forEach(p => matches.push({ type: 'prov', icon: 'bi-truck', label: p.nombre, desc: p.ubicacion, action: "navigateTo('proveedores')" }));

    // Buscar ventas
    appData.ventas.filter(v => v.cliente.toLowerCase().includes(q) || String(v.id).includes(q))
      .forEach(v => matches.push({ type: 'venta', icon: 'bi-receipt', label: `Venta #${v.id}`, desc: `${v.cliente} — $${v.total.toFixed(2)}`, action: "navigateTo('historial')" }));

    // Buscar ramos
    appData.ramos.filter(r => r.nombre.toLowerCase().includes(q))
      .forEach(r => matches.push({ type: 'ramo', icon: 'bi-flower2', label: r.nombre, desc: `${r.tipo} — $${r.precio.toFixed(2)}`, action: "navigateTo('ramos')" }));

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-result-item" style="justify-content:center;color:var(--text-light);">Sin resultados para "' + query + '"</div>';
    } else {
      results.innerHTML = matches.slice(0, 8).map(m => `
        <div class="search-result-item" onclick="${m.action}; document.getElementById('search-results').style.display='none'; document.getElementById('global-search').value='';">
          <i class="bi ${m.icon}" style="font-size:16px; color:var(--primary); width:20px;"></i>
          <div>
            <strong style="font-size:13px;">${m.label}</strong>
            <small style="display:block; font-size:11px; color:var(--text-light);">${m.desc}</small>
          </div>
        </div>
      `).join('');
    }
    results.style.display = 'block';
  }, 200);
}

// Cerrar búsqueda al hacer clic fuera
document.addEventListener('click', function(e) {
  if (!e.target.closest('.header-search')) {
    const r = document.getElementById('search-results');
    if (r) r.style.display = 'none';
  }
});

// ---- Exportar Historial ----
function exportHistorial() {
  const headers = ['# Venta', 'Fecha', 'Cliente', 'Productos', 'Total', 'Estado'];
  const rows = appData.ventas.map(v => [
    v.id,
    v.fecha,
    v.cliente,
    v.items.map(i => `${i.rosa}(${i.cantidad})`).join('; '),
    v.total.toFixed(2),
    v.estado
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `historial_ventas_AccyFlor_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Historial exportado como CSV', 'success');
}

// ---- Configuración ----
function saveConfig() {
  appData.config.empresa = document.getElementById('config-empresa').value.trim();
  appData.config.telefono = document.getElementById('config-telefono').value.trim();
  appData.config.email = document.getElementById('config-email').value.trim();
  appData.config.direccion = document.getElementById('config-direccion').value.trim();
  appData.config.moneda = document.getElementById('config-moneda').value;
  appData.config.alertaPct = parseInt(document.getElementById('config-alerta-pct').value) || 100;
  appData.config.iva = parseFloat(document.getElementById('config-iva').value) || 0;
  appData.config.tema = document.getElementById('config-tema').value;

  // Actualizar nombre en sidebar
  const brandTitle = document.querySelector('.sidebar-brand h2');
  if (brandTitle) brandTitle.textContent = appData.config.empresa;

  showToast('Configuración guardada', 'success');
}

function loadConfig() {
  const c = appData.config;
  const el = (id) => document.getElementById(id);
  if (el('config-empresa')) el('config-empresa').value = c.empresa;
  if (el('config-telefono')) el('config-telefono').value = c.telefono;
  if (el('config-email')) el('config-email').value = c.email;
  if (el('config-direccion')) el('config-direccion').value = c.direccion;
  if (el('config-moneda')) el('config-moneda').value = c.moneda;
  if (el('config-alerta-pct')) el('config-alerta-pct').value = c.alertaPct;
  if (el('config-iva')) el('config-iva').value = c.iva;
  if (el('config-tema')) el('config-tema').value = c.tema;
}

// ---- Temas ----
function changeTheme(theme) {
  const root = document.documentElement;
  const themes = {
    rosa: { primary: '#6b3a5d', primaryDark: '#4e2a44', primaryLight: '#8e5580', accent: '#d4a0b9', accentLight: '#f0d6e4', bgSidebar: '#4e2a44' },
    verde: { primary: '#3a6b4e', primaryDark: '#2a4e38', primaryLight: '#55806b', accent: '#a0d4b5', accentLight: '#d6f0e2', bgSidebar: '#2a4e38' },
    azul: { primary: '#3a5d6b', primaryDark: '#2a444e', primaryLight: '#558098', accent: '#a0c4d4', accentLight: '#d6e8f0', bgSidebar: '#2a444e' },
    oscuro: { primary: '#8e5580', primaryDark: '#2d2030', primaryLight: '#a870a0', accent: '#d4a0c5', accentLight: '#3a2e38', bgSidebar: '#1a1520' },
  };
  const t = themes[theme] || themes.rosa;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-dark', t.primaryDark);
  root.style.setProperty('--primary-light', t.primaryLight);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-light', t.accentLight);
  root.style.setProperty('--bg-sidebar', t.bgSidebar);

  if (theme === 'oscuro') {
    root.style.setProperty('--bg-main', '#1e1824');
    root.style.setProperty('--bg-card', '#2d2030');
    root.style.setProperty('--text-dark', '#e8d0dc');
    root.style.setProperty('--text-medium', '#c0a8b5');
    root.style.setProperty('--text-light', '#9a8590');
    root.style.setProperty('--border', '#3a2e38');
  } else {
    root.style.setProperty('--bg-main', '#faf5f7');
    root.style.setProperty('--bg-card', '#ffffff');
    root.style.setProperty('--text-dark', '#2d1f27');
    root.style.setProperty('--text-medium', '#6b5460');
    root.style.setProperty('--text-light', '#9a8590');
    root.style.setProperty('--border', '#e8d0dc');
  }

  // Actualizar gradiente sidebar
  document.querySelector('.sidebar').style.background = `linear-gradient(180deg, ${t.bgSidebar} 0%, ${t.primaryDark} 100%)`;
  appData.config.tema = theme;
}

// ---- Exportar / Importar Datos ----
function exportAllData() {
  const json = JSON.stringify(appData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AccyFlor_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Datos exportados correctamente', 'success');
}

function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.rosas && data.clientes && data.ventas) {
        Object.assign(appData, data);
        showToast('Datos importados correctamente. Recargando...', 'success');
        setTimeout(() => navigateTo('inicio'), 500);
      } else {
        showToast('Archivo no válido — faltan datos', 'error');
      }
    } catch (err) {
      showToast('Error al leer el archivo', 'error');
    }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm('⚠️ ¿Estás seguro? Esto eliminará TODOS los datos y restaurará los valores por defecto.')) return;
  if (!confirm('Esta acción NO se puede deshacer. ¿Continuar?')) return;
  location.reload();
}

// ---- Dashboard Mejorado ----
function renderDashboard() {
  const totalVentas = appData.ventas.reduce((s, v) => s + v.total, 0);
  const ventasCompletadas = appData.ventas.filter(v => v.estado === 'Completada').length;
  const ventasPendientes = appData.ventas.filter(v => v.estado === 'Pendiente').length;
  const ventasHoy = appData.ventas.filter(v => v.fecha === '2026-02-28');
  const totalHoy = ventasHoy.reduce((s, v) => s + v.total, 0);
  
  // Rosas más vendidas
  const rosaSales = {};
  appData.ventas.forEach(v => {
    v.items.forEach(item => {
      rosaSales[item.rosa] = (rosaSales[item.rosa] || 0) + item.cantidad;
    });
  });
  const sortedRosas = Object.entries(rosaSales).sort((a, b) => b[1] - a[1]);

  // Ventas por cliente
  const clientSales = {};
  appData.ventas.forEach(v => {
    clientSales[v.cliente] = (clientSales[v.cliente] || 0) + v.total;
  });
  const sortedClients = Object.entries(clientSales).sort((a, b) => b[1] - a[1]);

  // Ventas por fecha
  const dateSales = {};
  appData.ventas.forEach(v => {
    dateSales[v.fecha] = (dateSales[v.fecha] || 0) + v.total;
  });
  const sortedDates = Object.entries(dateSales).sort((a, b) => a[0].localeCompare(b[0]));
  const maxDateSale = Math.max(...sortedDates.map(([, v]) => v), 1);

  // Valor del inventario
  const inventoryValue = appData.rosas.reduce((s, r) => s + r.stock * r.precioTallo, 0);
  
  document.getElementById('dashboard-content').innerHTML = `
    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-icon sales"><i class="bi bi-cash-stack"></i></div>
        <div class="stat-info">
          <h3>$${totalVentas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</h3>
          <p>Ventas Totales</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon roses"><i class="bi bi-calendar-check"></i></div>
        <div class="stat-info">
          <h3>$${totalHoy.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</h3>
          <p>Ventas Hoy</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stock"><i class="bi bi-check-circle"></i></div>
        <div class="stat-info">
          <h3>${ventasCompletadas} <small style="font-size:12px; color:var(--warning);">/ ${ventasPendientes} pend.</small></h3>
          <p>Completadas / Pendientes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon clients"><i class="bi bi-piggy-bank"></i></div>
        <div class="stat-info">
          <h3>$${inventoryValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</h3>
          <p>Valor del Inventario</p>
        </div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
      <!-- Gráfico de ventas por fecha -->
      <div class="data-table-container">
        <div class="table-header"><h3>📈 Ventas por Día</h3></div>
        <div style="padding:20px;">
          ${sortedDates.map(([fecha, total]) => `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <span style="width:90px; font-size:12px; color:var(--text-light);">${fecha}</span>
              <div style="flex:1; height:24px; background:var(--accent-light); border-radius:4px; overflow:hidden;">
                <div style="width:${(total / maxDateSale * 100).toFixed(1)}%; height:100%; background:linear-gradient(90deg, var(--primary), var(--accent)); border-radius:4px; display:flex; align-items:center; justify-content:flex-end; padding-right:6px;">
                  <span style="font-size:10px; color:#fff; font-weight:700;">$${total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Top Clientes -->
      <div class="data-table-container">
        <div class="table-header"><h3>🏆 Mejores Clientes</h3></div>
        <table class="data-table">
          <thead><tr><th>#</th><th>Cliente</th><th>Total Comprado</th></tr></thead>
          <tbody>
            ${sortedClients.map(([nombre, total], idx) => `
              <tr>
                <td><span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:${idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : 'var(--accent-light)'};font-size:11px;font-weight:700;color:${idx < 3 ? '#fff' : 'var(--text-medium)'};">${idx + 1}</span></td>
                <td><strong>${nombre}</strong></td>
                <td>$${total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rosas más vendidas -->
    <div class="data-table-container">
      <div class="table-header">
        <h3>🌹 Rosas Más Vendidas</h3>
      </div>
      <table class="data-table">
        <thead><tr><th>Rosa</th><th>Paquetes Vendidos</th><th>Ingresos Est.</th><th>Participación</th></tr></thead>
        <tbody>
          ${sortedRosas.map(([nombre, cantidad]) => {
            const totalTallos = sortedRosas.reduce((s, [, c]) => s + c, 0);
            const pct = ((cantidad / totalTallos) * 100).toFixed(1);
            const rosa = appData.rosas.find(r => r.nombre === nombre);
            const ingresos = rosa ? cantidad * rosa.precioTallo : 0;
            return `<tr>
              <td><strong>${nombre}</strong></td>
              <td>${cantidad} paquetes</td>
              <td>$${ingresos.toFixed(2)}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div style="flex:1;height:8px;background:var(--accent-light);border-radius:4px;overflow:hidden;">
                    <div style="width:${pct}%;height:100%;background:var(--primary);border-radius:4px;"></div>
                  </div>
                  <span style="font-size:12px;font-weight:600;">${pct}%</span>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
  navigateTo('inicio');
  refreshNotifDot();
  loadConfig();
  if (sessionStorage.getItem(AUTH_SESSION_KEY) === '1') {
    unlockApp();
  } else {
    lockApp();
  }
});
