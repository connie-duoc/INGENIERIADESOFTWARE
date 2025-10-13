const api = { login:'/api/auth/login', items:'/api/items', users:'/api/admin/users' };
const $ = s=>document.querySelector(s);
const view=$('#view'), menu=$('#menu'), who=$('#who'), logoutBtn=$('#logoutBtn');

function token(){ return localStorage.getItem('token'); }
function user(){ try{ return JSON.parse(localStorage.getItem('user')||'null'); }catch{ return null; } }
function setAuth(u,t){ if(u&&t){localStorage.setItem('user',JSON.stringify(u));localStorage.setItem('token',t);} else {localStorage.clear();} renderMenu(); }
logoutBtn.onclick=()=>{ setAuth(null,null); location.hash='#/login'; };

function renderMenu(){
  const u=user(); who.textContent = u ? `${u.name||u.email} — ${u.role}` : '';
  if(!u){ menu.innerHTML='<a href="#/login" class="active">Login</a>'; return; }
  const client = '<a href="#/cliente/busqueda">Búsqueda</a><a href="#/cliente/resultados">Resultados</a><a href="#/cliente/checkout">Checkout</a><a href="#/cliente/confirmacion">Confirmación</a>';
  const admin  = '<a href="#/admin/dashboard">Dashboard</a><a href="#/admin/reservas">Reservas</a><a href="#/admin/habitaciones">Habitaciones</a><a href="#/admin/reporte">Reporte</a>';
  menu.innerHTML = (u.role==='admin'?admin:client);
  [...menu.querySelectorAll('a')].forEach(a=>a.classList.toggle('active',location.hash.startsWith(a.getAttribute('href'))));
}

async function doLogin(email,password){
  const res = await fetch(api.login,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
  const data = await res.json(); if(!res.ok||!data.ok) throw new Error(data?.error||'Login fallido');
  const t = data.token || data.accessToken || data.jwt; if(!t) throw new Error('No se recibió token');
  setAuth(data.user,t); location.hash = data.user.role==='admin'?'#/admin/dashboard':'#/cliente/busqueda';
}

function guard(role){ const u=user(); if(!u||!token()){location.hash='#/login';return false;} if(role&&u.role!==role){location.hash='#/login';return false;} return true; }

// ---------- VISTAS ----------
function Login(){
  view.innerHTML = `
  <div class="container"><div class="panel">
    <h1 class="h1">HotelApp — Login</h1><p class="subtitle">Ingresa con Admin o Cliente.</p>
    <form id="f">
      <div class="field"><label>Email</label><input id="e" type="email" value="admin@demo.cl" required></div>
      <div class="field"><label>Clave</label><input id="p" type="password" value="Admin*123" required></div>
      <div class="actions"><button class="btn" type="submit">Ingresar</button>
        </div>
      <div id="msg" class="notice"></div>
    </form>
  </div></div>`;
  $('#f').onsubmit=async ev=>{ev.preventDefault(); $('#msg').textContent='Ingresando...'; try{await doLogin($('#e').value.trim(),$('#p').value);}catch(e){$('#msg').textContent=e.message;}};
  renderMenu();
}

async function AdminDashboard(){ if(!guard('admin'))return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Admin — Dashboard</h1><p class="subtitle">KPIs generales</p>
    <div class="grid cols-2">
      <div class="panel">
        <h3 class="section-title">KPIs</h3>
        <div class="grid cols-2">
          <div class="card"><div class="badge ok">Ocupación</div><h2>85%</h2><div class="notice">Tendencia ▲ 3%</div></div>
          <div class="card"><div class="badge">Ingresos</div><h2>$ 12.4K</h2><div class="notice">Tendencia ▲ 1%</div></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Gráfico</h3>
        <canvas id="chart" height="120"></canvas>
      </div>
    </div>
  </div>`;
  renderMenu();
  if(window.Chart){ new Chart(document.getElementById('chart'),{type:'line',data:{labels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],datasets:[{label:'Ingreso',data:[10,12,9,14,16,12,18],tension:.3}]}}); }
}

async function AdminReservas(){ if(!guard('admin'))return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Admin — Reservas</h1>
    <div class="panel">
      <div class="grid cols-2">
        <div>
          <div class="field"><label>Hotel</label><input></div>
          <div class="field"><label>Tipo</label><select><option>Deluxe</option><option>Standard</option></select></div>
          <div class="field"><label>Capacidad</label><select><option>1</option><option>2</option><option>3</option></select></div>
          <div class="field"><label>Estado</label><select><option>Activa</option><option>Cancelada</option></select></div>
          <div class="actions"><button class="btn">Buscar</button><button class="btn ghost">Nueva reserva</button></div>
        </div>
        <div>
          <table class="table">
            <thead><tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              <tr><td>5001</td><td>Ana</td><td>2025-10-06</td><td><span class="badge ok">Confirmada</span></td><td><a href="#">Detalle</a></td></tr>
              <tr><td>5000</td><td>Luis</td><td>2025-10-06</td><td><span class="badge">Pendiente</span></td><td><a href="#">Detalle</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
  renderMenu();
}

async function AdminHabitaciones(){ if(!guard('admin'))return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Admin — Gestión de habitaciones</h1>
    <div class="panel">
      <div class="grid cols-2">
        <div>
          <div class="field"><label>Hotel</label><input></div>
          <div class="field"><label>Tipo</label><select><option>Deluxe</option><option>Standard</option></select></div>
          <div class="field"><label>Capacidad</label><select><option>1</option><option>2</option><option>3</option></select></div>
          <div class="field"><label>Estado</label><select><option>Activa</option><option>Fuera de servicio</option></select></div>
          <div class="actions"><button class="btn">Buscar</button><button class="btn ghost">Nueva habitación</button></div>
        </div>
        <div>
          <table class="table">
            <thead><tr><th>ID</th><th>Tipo</th><th>Capacidad</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody><tr><td>201</td><td>Deluxe</td><td>2</td><td>$140</td><td><span class="badge ok">Activa</span></td><td><a href="#">Editar</a></td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
  renderMenu();
}

async function AdminReporte(){ if(!guard('admin'))return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Admin — Reporte</h1>
    <div class="panel">
      <div class="grid cols-2">
        <div>
          <div class="field"><label>Desde</label><input type="date"></div>
          <div class="field"><label>Hasta</label><input type="date"></div>
          <div class="actions"><button class="btn">Aplicar</button><button class="btn ghost">Exportar CSV</button><button class="btn ghost">Exportar PDF</button></div>
        </div>
        <div class="center notice">Placeholder de gráfico</div>
      </div>
    </div>
  </div>`;
  renderMenu();
}

async function ClienteBusqueda(){ if(!guard())return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Hotel Pacific Reef — Búsqueda de disponibilidad</h1>
    <div class="panel">
      <div class="grid cols-2">
        <div>
          <div class="field"><label>Destino/Hotel</label><input placeholder="Ciudad u hotel"></div>
          <div class="grid cols-2">
            <div class="field"><label>Check-in</label><input type="date"></div>
            <div class="field"><label>Check-out</label><input type="date"></div>
          </div>
          <div class="field"><label>Huéspedes</label><select><option>1</option><option selected>2</option><option>3</option></select></div>
          <div class="field"><label>Tips/Promo</label><input placeholder="Códigos promocionales..."></div>
          <div class="actions"><a class="btn" href="#/cliente/resultados">Buscar disponibilidad</a></div>
        </div>
        <div class="center notice">Usa la búsqueda para ver disponibilidad.</div>
      </div>
    </div>
  </div>`;
  renderMenu();
}

async function ClienteResultados(){ if(!guard())return;
  let data={items:[]}; try{const res=await fetch(api.items,{headers:{Authorization:'Bearer '+token()}}); const j=await res.json(); data.items=j.items||[];}catch{}
  view.innerHTML = `
  <div class="container">
    <div class="grid cols-2">
      <div class="panel">
        <h2 class="section-title">Filtros</h2>
        <div class="field"><label>Rango de precio</label><input placeholder="Ej: 60 - 150"></div>
        <div class="field"><label>Tipo de habitación</label><select><option>Standard</option><option>Deluxe</option></select></div>
        <div class="field"><label>Capacidad</label><select><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
        <div class="field"><label>Servicios</label><input placeholder="Wifi, Desayuno..."></div>
        <div class="field"><label>Hotel</label><input placeholder="Nombre del hotel"></div>
        <div class="actions"><button class="btn">Aplicar filtros</button></div>
      </div>
      <div class="panel">
        <h2 class="section-title">Resultados — Habitaciones disponibles</h2>
        <div id="cards"></div>
      </div>
    </div>
  </div>`;
  const cards=$('#cards'); cards.innerHTML=data.items.map(it=>`
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px">
      <div><div><strong>${it.name}</strong></div><div class="notice">$${it.price}</div></div>
      <div class="actions"><a class="btn ghost" href="#/cliente/checkout">Ver detalle</a><a class="btn" href="#/cliente/checkout">Reservar</a></div>
    </div>`).join('');
  renderMenu();
}

async function ClienteCheckout(){ if(!guard())return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Checkout — Datos y Pago</h1>
    <div class="panel">
      <div class="grid cols-3">
        <div class="card">
          <h3 class="section-title">Resumen de reserva</h3>
          <ul class="notice"><li>Hotel · Habitación · noches</li><li>Total estimado</li></ul>
        </div>
        <div class="card">
          <h3 class="section-title">Datos del cliente</h3>
          <div class="field"><label>Nombre</label><input></div>
          <div class="field"><label>Email</label><input></div>
          <div class="field"><label>Teléfono</label><input></div>
          <div class="field"><label>Preferencias / Notas</label><textarea rows="3"></textarea></div>
        </div>
        <div class="card">
          <h3 class="section-title">Método de pago</h3>
          <div class="field"><label>Número tarjeta</label><input placeholder="0000 0000 0000 0000"></div>
          <div class="grid cols-2">
            <div class="field"><label>Vencimiento</label><input placeholder="MM/AA"></div>
            <div class="field"><label>CVV</label><input placeholder="123"></div>
          </div>
          <div class="actions"><a class="btn" href="#/cliente/confirmacion">Pagar</a></div>
          <div class="actions"><button class="btn ghost">Pagar con pasarela</button></div>
        </div>
      </div>
    </div>
  </div>`;
  renderMenu();
}

async function ClienteConfirmacion(){ if(!guard())return;
  view.innerHTML = `
  <div class="container">
    <h1 class="h1">Confirmación — ¡Reserva creada!</h1>
    <div class="panel">
      <div class="grid cols-2">
        <div class="card">
          <h3 class="section-title">Detalle de la reserva</h3>
          <ul class="notice">
            <li>ID de reserva</li><li>Hotel · Habitación</li><li>Fechas · Noches · Huéspedes</li><li>Total pagado</li>
            <li>Estado: <span class="badge ok">Confirmada</span></li>
          </ul>
          <div class="actions"><a class="btn ghost" href="#/cliente/busqueda">Volver al inicio</a></div>
        </div>
        <div class="card">
          <h3 class="section-title">Comprobante / QR</h3>
          <div class="center notice" style="height:150px;border:1px dashed var(--border)">QR</div>
        </div>
      </div>
    </div>
  </div>`;
  renderMenu();
}

// Router
const routes = {
  '#/login':Login,'#/admin/dashboard':AdminDashboard,'#/admin/reservas':AdminReservas,
  '#/admin/habitaciones':AdminHabitaciones,'#/admin/reporte':AdminReporte,
  '#/cliente/busqueda':ClienteBusqueda,'#/cliente/resultados':ClienteResultados,
  '#/cliente/checkout':ClienteCheckout,'#/cliente/confirmacion':ClienteConfirmacion
};
function router(){ (routes[location.hash]||Login)(); }
window.addEventListener('hashchange',router);
window.addEventListener('load',()=>{
  renderMenu();
  if(user()&&token()){ location.hash = location.hash || (user().role==='admin'?'#/admin/dashboard':'#/cliente/busqueda'); }
  else { location.hash = '#/login'; }
  router();
});
