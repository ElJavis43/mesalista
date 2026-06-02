function obtenerClaseEstado(estado) {
    if (estado === "disponible") return "available";
    if (estado === "ocupada") return "occupied";
    if (estado === "reservada") return "reserved";
    return "neutral";
}

function contarMesasPorEstado(estado) {
    return mesas.filter((mesa) => mesa.estado === estado).length;
}

function actualizarHora() {
    const elemento = document.getElementById("ultima-actualizacion");

    if (!elemento) return;

    const ahora = new Date();

    elemento.textContent = ahora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function renderizarResumen() {
    const disponibles = contarMesasPorEstado("disponible");
    const ocupadas = contarMesasPorEstado("ocupada");
    const reservadas = contarMesasPorEstado("reservada");

    const totalDisponibles = document.getElementById("total-disponibles");
    const totalOcupadas = document.getElementById("total-ocupadas");
    const totalReservadas = document.getElementById("total-reservadas");

    if (totalDisponibles) totalDisponibles.textContent = disponibles;
    if (totalOcupadas) totalOcupadas.textContent = ocupadas;
    if (totalReservadas) totalReservadas.textContent = reservadas;
}

function renderizarMesas() {
    const contenedorMesas = document.getElementById("tables-map");

    if (!contenedorMesas) return;

    contenedorMesas.innerHTML = "";

    mesas.forEach((mesa) => {
        const botonMesa = crearBotonMesa(mesa);

        botonMesa.addEventListener("click", () => {
            mostrarDetalleMesa(mesa);
        });

        contenedorMesas.appendChild(botonMesa);
    });
}

function crearBotonMesa(mesa) {
    const botonMesa = document.createElement("button");

    botonMesa.className = `table ${obtenerClaseEstado(mesa.estado)}`;
    botonMesa.textContent = mesa.id;
    botonMesa.title = `${mesa.id} | ${mesa.capacidad} personas | ${mesa.zona} | ${mesa.estado}`;

    return botonMesa;
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

    if (!contenedor) return;

    contenedor.innerHTML = "";

    reservaciones.slice(0, 3).forEach((reservacion) => {
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
        `Estado: ${reservacion.estado}\n` +
        `Notas: ${reservacion.notas || "Sin notas"}`
    );
}

function renderizarSelectMesas() {
    const selectMesa = document.getElementById("mesa");

    if (!selectMesa) return;

    selectMesa.innerHTML = '<option value="">Selecciona una mesa</option>';

    mesas.forEach((mesa) => {
        const opcion = document.createElement("option");
        opcion.value = mesa.id;
        opcion.textContent = `${mesa.id} - ${mesa.capacidad} personas - ${mesa.zona} - ${mesa.estado}`;

        if (mesa.estado !== "disponible") {
            opcion.disabled = true;
        }

        selectMesa.appendChild(opcion);
    });
}

function renderizarSelectAsignarMesa() {
    const selectMesa = document.getElementById("mesa-asignar");

    if (!selectMesa) return;

    selectMesa.innerHTML = '<option value="">Selecciona una mesa</option>';

    mesas.forEach((mesa) => {
        const opcion = document.createElement("option");
        opcion.value = mesa.id;
        opcion.textContent = `${mesa.id} - ${mesa.capacidad} personas - ${mesa.zona} - ${mesa.estado}`;

        if (mesa.estado !== "disponible") {
            opcion.disabled = true;
        }

        selectMesa.appendChild(opcion);
    });
}

function renderizarMiniMapaReservacion() {
    const contenedor = document.getElementById("mini-map-reservacion");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    mesas.forEach((mesa) => {
        const botonMesa = crearBotonMesa(mesa);

        botonMesa.addEventListener("click", () => {
            if (mesa.estado !== "disponible") {
                alert("Esta mesa no está disponible.");
                return;
            }

            const selectMesa = document.getElementById("mesa");
            selectMesa.value = mesa.id;
        });

        contenedor.appendChild(botonMesa);
    });
}

function renderizarMiniMapaAsignar() {
    const contenedor = document.getElementById("mini-map-asignar");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    mesas.forEach((mesa) => {
        const botonMesa = crearBotonMesa(mesa);

        botonMesa.addEventListener("click", () => {
            if (mesa.estado !== "disponible") {
                alert("Esta mesa no está disponible para ocuparse.");
                return;
            }

            const selectMesa = document.getElementById("mesa-asignar");
            selectMesa.value = mesa.id;
        });

        contenedor.appendChild(botonMesa);
    });
}

function sugerirMesaDisponible(personas) {
    const mesasDisponibles = mesas
        .filter((mesa) => mesa.estado === "disponible" && mesa.capacidad >= personas)
        .sort((a, b) => a.capacidad - b.capacidad);

    return mesasDisponibles[0] || null;
}

function actualizarSugerenciaMesa() {
    const inputPersonas = document.getElementById("personas");
    const cajaSugerencia = document.getElementById("mesa-sugerida");
    const selectMesa = document.getElementById("mesa");

    if (!inputPersonas || !cajaSugerencia || !selectMesa) return;

    const personas = Number(inputPersonas.value);

    if (!personas || personas <= 0) {
        cajaSugerencia.textContent = "Ingresa el número de personas para sugerir una mesa.";
        selectMesa.value = "";
        return;
    }

    const mesaSugerida = sugerirMesaDisponible(personas);

    if (!mesaSugerida) {
        cajaSugerencia.textContent = "No hay mesas disponibles para ese número de personas.";
        selectMesa.value = "";
        return;
    }

    cajaSugerencia.textContent =
        `Mesa sugerida: ${mesaSugerida.id} | Capacidad: ${mesaSugerida.capacidad} personas | Zona: ${mesaSugerida.zona}`;

    selectMesa.value = mesaSugerida.id;
}

function actualizarSugerenciaAsignar() {
    const inputPersonas = document.getElementById("personas-asignar");
    const cajaSugerencia = document.getElementById("sugerencia-asignar");
    const selectMesa = document.getElementById("mesa-asignar");

    if (!inputPersonas || !cajaSugerencia || !selectMesa) return;

    const personas = Number(inputPersonas.value);

    if (!personas || personas <= 0) {
        cajaSugerencia.textContent = "Ingresa el número de personas para sugerir una mesa disponible.";
        selectMesa.value = "";
        return;
    }

    const mesaSugerida = sugerirMesaDisponible(personas);

    if (!mesaSugerida) {
        cajaSugerencia.textContent = "No hay mesas disponibles para ese número de personas.";
        selectMesa.value = "";
        return;
    }

    cajaSugerencia.textContent =
        `Mesa sugerida: ${mesaSugerida.id} | Capacidad: ${mesaSugerida.capacidad} personas | Zona: ${mesaSugerida.zona}`;

    selectMesa.value = mesaSugerida.id;
}

function guardarNuevaReservacion(event) {
    event.preventDefault();

    const cliente = document.getElementById("cliente").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const personas = Number(document.getElementById("personas").value);
    const mesaSeleccionada = document.getElementById("mesa").value;
    const notas = document.getElementById("notas").value.trim();

    if (!cliente || !telefono || !fecha || !hora || !personas || !mesaSeleccionada) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    const mesa = mesas.find((item) => item.id === mesaSeleccionada);

    if (!mesa || mesa.estado !== "disponible") {
        alert("La mesa seleccionada ya no está disponible.");
        actualizarSistema();
        return;
    }

    const nuevaReservacion = {
        id: Date.now(),
        cliente: cliente,
        telefono: telefono,
        fecha: fecha,
        hora: hora,
        personas: personas,
        mesa: mesaSeleccionada,
        estado: "confirmada",
        notas: notas
    };

    reservaciones.push(nuevaReservacion);

    mesa.estado = "reservada";

    document.getElementById("form-nueva-reservacion").reset();

    actualizarSistema();
    cambiarPantalla("pantalla-reservaciones");

    alert("Reservación guardada correctamente.");
}

function guardarAsignacionMesa(event) {
    event.preventDefault();

    const mesaSeleccionada = document.getElementById("mesa-asignar").value;
    const personas = Number(document.getElementById("personas-asignar").value);
    const notas = document.getElementById("notas-asignar").value.trim();

    if (!mesaSeleccionada || !personas) {
        alert("Selecciona una mesa e indica el número de personas.");
        return;
    }

    const mesa = mesas.find((item) => item.id === mesaSeleccionada);

    if (!mesa) {
        alert("No se encontró la mesa seleccionada.");
        return;
    }

    if (mesa.estado !== "disponible") {
        alert("La mesa seleccionada ya no está disponible.");
        actualizarSistema();
        return;
    }

    if (personas > mesa.capacidad) {
        const confirmar = confirm(
            `La mesa ${mesa.id} tiene capacidad para ${mesa.capacidad} personas. ` +
            `¿Deseas asignarla de todos modos?`
        );

        if (!confirmar) return;
    }

    mesa.estado = "ocupada";
    mesa.personasActuales = personas;
    mesa.notas = notas;

    document.getElementById("form-asignar-mesa").reset();

    actualizarSistema();
    cambiarPantalla("pantalla-dashboard");

    alert(`La mesa ${mesa.id} fue marcada como ocupada.`);
}

function actualizarSistema() {
    renderizarResumen();
    renderizarMesas();
    renderizarReservaciones();
    renderizarTablaReservaciones();
    renderizarSelectMesas();
    renderizarSelectAsignarMesa();
    renderizarMiniMapaReservacion();
    renderizarMiniMapaAsignar();
    actualizarHora();
}