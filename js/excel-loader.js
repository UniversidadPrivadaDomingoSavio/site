document.addEventListener('DOMContentLoaded', () => {
  cargarInscritos();
  inicializarBuscador();
});

let datosOriginales = [];

async function cargarInscritos() {
  const contenedor = document.getElementById('tabla-inscritos-contenedor');
  const contador = document.getElementById('contador-inscritos');

  try {
    contenedor.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        Cargando participantes...
      </div>
    `;

    const response = await fetch('assets/data/inscritos.xlsx');

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se encontró el archivo Excel`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const nombreHoja = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[nombreHoja];

    const datos = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    if (!datos.length) {
      contenedor.innerHTML = `
        <div class="sin-datos">
          No hay participantes registrados por el momento.
        </div>
      `;
      contador.textContent = '0';
      return;
    }

    datosOriginales = datos;
    contador.textContent = datos.length;
    renderizarTabla(datosOriginales);

  } catch (error) {
    console.error('Error cargando inscritos:', error);
    contenedor.innerHTML = `
      <div class="error-mensaje">
        <strong>Error al cargar los participantes.</strong><br>
        ${error.message}
      </div>
    `;
    contador.textContent = '0';
  }
}

function renderizarTabla(datos) {
  const contenedor = document.getElementById('tabla-inscritos-contenedor');
  const contador = document.getElementById('contador-inscritos');

  if (!datos.length) {
    contenedor.innerHTML = `
      <div class="sin-datos">
        No se encontraron resultados con esa búsqueda.
      </div>
    `;
    contador.textContent = '0';
    return;
  }

  const columnas = Object.keys(datos[0]);

  let html = `
    <div class="tabla-contenedor">
      <table class="table align-middle">
        <thead>
          <tr>
            <th class="col-numero">#</th>
  `;

  columnas.forEach(columna => {
    html += `<th>${escapeHTML(columna)}</th>`;
  });

  html += `
          </tr>
        </thead>
        <tbody>
  `;

  datos.forEach((fila, index) => {
    html += `<tr>`;
    html += `<td class="col-numero">${index + 1}</td>`;

    columnas.forEach(columna => {
      const valor = fila[columna] !== null && fila[columna] !== undefined && fila[columna] !== ''
        ? fila[columna]
        : '-';

      html += `<td>${escapeHTML(String(valor))}</td>`;
    });

    html += `</tr>`;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  contenedor.innerHTML = html;
  contador.textContent = datos.length;
}

function inicializarBuscador() {
  const buscador = document.getElementById('buscador-inscritos');

  if (!buscador) return;

  buscador.addEventListener('input', function () {
    const texto = this.value.trim().toLowerCase();

    if (!texto) {
      renderizarTabla(datosOriginales);
      return;
    }

    const filtrados = datosOriginales.filter(fila =>
      Object.values(fila).some(valor =>
        String(valor).toLowerCase().includes(texto)
      )
    );

    renderizarTabla(filtrados);
  });
}

function escapeHTML(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function recargarInscritos() {
  cargarInscritos();
}