function obtenerClaseEstado(estado) {
    if (estado === "disponible") return "available";
    if (estado === "ocupada") return "occupied";
    if (estado === "reservada") return "reserved";
    return "neutral";
}

function contarMesasPorEstado(estado) {
    return mesas.filter((mesa) => mesa.estado === estado).length;
}

function renderizarResumen() {
    const disponibles = contarMesasPorEstado("disponible");
    const ocupadas = contarMesasPorEstado("ocupada");
    const reservadas = contarMesasPorEstado("reservada");

    document.getElementById("total-disponibles").textContent = disponibles;
    document.getElementById("total-ocupadas").textContent = ocupadas;
    document.getElementById("total-reservadas").textContent = reservadas;
}

function renderizarMesas() {
    const contenedorMesas = document.getElementById("tables-map");

    contenedorMesas.innerHTML = "";

    mesas.forEach((mesa) => {
        const botonMesa = document.createElement("button");

        botonMesa.className = `table ${obtenerClaseEstado(mesa.estado)}`;
        botonMesa.textContent = mesa.id;

        botonMesa.addEventListener("click", () => {
            mostrarDetalleMesa(mesa);
        });

        contenedorMesas.appendChild(botonMesa);
    });
}

function mostrarDetalleMesa(mesa) {
    alert(
        `Mesa: ${mesa.id}\n` +
        `Capacidad: ${mesa.capacidad} personas\n` +
        `Zona: ${mesa.zona}\n` +
        `Estado: ${mesa.estado}`
    );
}

function renderizarReservaciones() {
    const contenedor = document.getElementById("lista-reservaciones");

    contenedor.innerHTML = "";

    reservaciones.forEach((reservacion) => {
        const item = document.createElement("p");
        item.textContent = `${reservacion.hora} - ${reservacion.cliente} - ${reservacion.mesa}`;
        contenedor.appendChild(item);
    });
}

function obtenerClaseEstadoReservacion(estado) {
    if (estado === "confirmada") return "estado-confirmada";
    if (estado === "en espera") return "estado-en-espera";
    if (estado === "cancelada") return "estado-cancelada";
    return "";
}

function renderizarTablaReservaciones(lista = reservaciones) {
    const tabla = document.getElementById("tabla-reservaciones");

    if (!tabla) return;

    tabla.innerHTML = "";

    lista.forEach((reservacion) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
      <td>${reservacion.cliente}</td>
      <td>${reservacion.fecha}</td>
      <td>${reservacion.hora}</td>
      <td>${reservacion.personas}</td>
      <td>${reservacion.mesa}</td>
      <td>
        <span class="estado-badge ${obtenerClaseEstadoReservacion(reservacion.estado)}">
          ${reservacion.estado}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="verReservacion(${reservacion.id})">
          Ver
        </button>
      </td>
    `;

        tabla.appendChild(fila);
    });
}

function verReservacion(id) {
    const reservacion = reservaciones.find((item) => item.id === id);

    if (!reservacion) return;

    alert(
        `Cliente: ${reservacion.cliente}\n` +
        `Teléfono: ${reservacion.telefono}\n` +
        `Fecha: ${reservacion.fecha}\n` +
        `Hora: ${reservacion.hora}\n` +
        `Personas: ${reservacion.personas}\n` +
        `Mesa: ${reservacion.mesa}\n` +
        `Estado: ${reservacion.estado}`
    );
}