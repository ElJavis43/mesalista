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

function crearBotonMesa(mesa) {
    const botonMesa = document.createElement("button");

    botonMesa.className = `table ${obtenerClaseEstado(mesa.estado)}`;
    botonMesa.textContent = mesa.id;
    botonMesa.title = `${mesa.id} | ${mesa.capacidad} personas | ${mesa.zona} | ${mesa.estado}`;

    return botonMesa;
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

function mostrarDetalleMesa(mesa) {
    const personas = mesa.personasActuales ? `\nPersonas actuales: ${mesa.personasActuales}` : "";

    alert(
        `Mesa: ${mesa.id}\n` +
        `Capacidad: ${mesa.capacidad} personas\n` +
        `Zona: ${mesa.zona}\n` +
        `Estado: ${mesa.estado}` +
        personas
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

function renderizarSelectLiberarMesa() {
    const selectMesa = document.getElementById("mesa-liberar");

    if (!selectMesa) return;

    selectMesa.innerHTML = '<option value="">Selecciona una mesa ocupada</option>';

    const mesasOcupadas = mesas.filter((mesa) => mesa.estado === "ocupada");

    mesasOcupadas.forEach((mesa) => {
        const opcion = document.createElement("option");
        opcion.value = mesa.id;
        opcion.textContent = `${mesa.id} - ${mesa.capacidad} personas - ${mesa.zona}`;

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

function renderizarMiniMapaLiberar() {
    const contenedor = document.getElementById("mini-map-liberar");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    mesas.forEach((mesa) => {
        const botonMesa = crearBotonMesa(mesa);

        botonMesa.addEventListener("click", () => {
            if (mesa.estado !== "ocupada") {
                alert("Solo puedes liberar mesas ocupadas.");
                return;
            }

            const selectMesa = document.getElementById("mesa-liberar");
            selectMesa.value = mesa.id;
            actualizarDetalleLiberar();
        });

        contenedor.appendChild(botonMesa);
    });
}

function renderizarMiniMapaAdmin() {
    const contenedor = document.getElementById("mini-map-admin");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    mesas.forEach((mesa) => {
        const botonMesa = crearBotonMesa(mesa);

        botonMesa.addEventListener("click", () => {
            cargarMesaEnFormulario(mesa.id);
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

function actualizarDetalleLiberar() {
    const selectMesa = document.getElementById("mesa-liberar");
    const detalle = document.getElementById("detalle-mesa-liberar");

    if (!selectMesa || !detalle) return;

    const mesaSeleccionada = selectMesa.value;
    const mesa = mesas.find((item) => item.id === mesaSeleccionada);

    if (!mesa) {
        detalle.textContent = "Selecciona una mesa para ver su información.";
        return;
    }

    detalle.textContent =
        `Mesa ${mesa.id} | Capacidad: ${mesa.capacidad} personas | Zona: ${mesa.zona} | ` +
        `Personas actuales: ${mesa.personasActuales || "No registrado"}`;
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

function guardarLiberacionMesa(event) {
    event.preventDefault();

    const mesaSeleccionada = document.getElementById("mesa-liberar").value;
    const notas = document.getElementById("notas-liberar").value.trim();

    if (!mesaSeleccionada) {
        alert("Selecciona una mesa ocupada para liberarla.");
        return;
    }

    const mesa = mesas.find((item) => item.id === mesaSeleccionada);

    if (!mesa) {
        alert("No se encontró la mesa seleccionada.");
        return;
    }

    if (mesa.estado !== "ocupada") {
        alert("Solo se pueden liberar mesas ocupadas.");
        actualizarSistema();
        return;
    }

    const confirmar = confirm(`¿Deseas liberar la mesa ${mesa.id}?`);

    if (!confirmar) return;

    mesa.estado = "disponible";
    mesa.personasActuales = 0;
    mesa.notas = notas || "Mesa liberada.";

    document.getElementById("form-liberar-mesa").reset();

    const detalle = document.getElementById("detalle-mesa-liberar");
    if (detalle) {
        detalle.textContent = "Selecciona una mesa para ver su información.";
    }

    actualizarSistema();
    cambiarPantalla("pantalla-dashboard");

    alert(`La mesa ${mesa.id} fue liberada correctamente.`);
}

function renderizarTablaAdminMesas() {
    const tabla = document.getElementById("tabla-admin-mesas");

    if (!tabla) return;

    tabla.innerHTML = "";

    mesas.forEach((mesa) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
      <td>${mesa.id}</td>
      <td>${mesa.capacidad} personas</td>
      <td>${mesa.zona}</td>
      <td>
        <span class="estado-badge ${obtenerClaseEstadoAdmin(mesa.estado)}">
          ${mesa.estado}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="cargarMesaEnFormulario('${mesa.id}')">Editar</button>
        <button class="action-btn danger-action" onclick="eliminarMesa('${mesa.id}')">Eliminar</button>
      </td>
    `;

        tabla.appendChild(fila);
    });
}

function obtenerClaseEstadoAdmin(estado) {
    if (estado === "disponible") return "estado-confirmada";
    if (estado === "reservada") return "estado-en-espera";
    if (estado === "ocupada") return "estado-cancelada";
    return "";
}

function guardarMesaAdmin(event) {
    event.preventDefault();

    const modo = document.getElementById("modo-edicion-mesa").value;
    const id = document.getElementById("admin-mesa-id").value.trim().toUpperCase();
    const capacidad = Number(document.getElementById("admin-mesa-capacidad").value);
    const zona = document.getElementById("admin-mesa-zona").value;
    const estado = document.getElementById("admin-mesa-estado").value;
    const descripcion = document.getElementById("admin-mesa-descripcion").value.trim();

    if (!id || !capacidad || !zona || !estado) {
        alert("Completa los campos obligatorios de la mesa.");
        return;
    }

    if (modo === "nuevo") {
        const existe = mesas.some((mesa) => mesa.id === id);

        if (existe) {
            alert("Ya existe una mesa con ese número.");
            return;
        }

        mesas.push({
            id: id,
            capacidad: capacidad,
            zona: zona,
            estado: estado,
            descripcion: descripcion,
            personasActuales: estado === "ocupada" ? capacidad : 0
        });

        alert("Mesa agregada correctamente.");
    } else {
        const mesa = mesas.find((item) => item.id === modo);

        if (!mesa) {
            alert("No se encontró la mesa a editar.");
            return;
        }

        const idDuplicado = mesas.some((item) => item.id === id && item.id !== modo);

        if (idDuplicado) {
            alert("Ya existe otra mesa con ese número.");
            return;
        }

        mesa.id = id;
        mesa.capacidad = capacidad;
        mesa.zona = zona;
        mesa.estado = estado;
        mesa.descripcion = descripcion;

        if (estado !== "ocupada") {
            mesa.personasActuales = 0;
        }

        reservaciones.forEach((reservacion) => {
            if (reservacion.mesa === modo) {
                reservacion.mesa = id;
            }
        });

        alert("Mesa editada correctamente.");
    }

    limpiarFormularioMesa();
    actualizarSistema();
}

function cargarMesaEnFormulario(id) {
    const mesa = mesas.find((item) => item.id === id);

    if (!mesa) return;

    cambiarPantalla("pantalla-admin-mesas");

    document.getElementById("modo-edicion-mesa").value = mesa.id;
    document.getElementById("admin-mesa-id").value = mesa.id;
    document.getElementById("admin-mesa-capacidad").value = mesa.capacidad;
    document.getElementById("admin-mesa-zona").value = mesa.zona;
    document.getElementById("admin-mesa-estado").value = mesa.estado;
    document.getElementById("admin-mesa-descripcion").value = mesa.descripcion || "";

    const botonGuardar = document.getElementById("btn-guardar-mesa");

    if (botonGuardar) {
        botonGuardar.textContent = "Guardar cambios";
    }
}

function eliminarMesa(id) {
    const mesa = mesas.find((item) => item.id === id);

    if (!mesa) return;

    const tieneReservaciones = reservaciones.some((reservacion) => reservacion.mesa === id);

    if (tieneReservaciones) {
        const confirmarReservaciones = confirm(
            `La mesa ${id} tiene reservaciones asociadas. ` +
            `Si la eliminas, esas reservaciones quedarán sin mesa. ¿Deseas continuar?`
        );

        if (!confirmarReservaciones) return;

        reservaciones.forEach((reservacion) => {
            if (reservacion.mesa === id) {
                reservacion.mesa = "Sin asignar";
            }
        });
    }

    const confirmar = confirm(`¿Deseas eliminar la mesa ${id}?`);

    if (!confirmar) return;

    const indice = mesas.findIndex((item) => item.id === id);

    if (indice !== -1) {
        mesas.splice(indice, 1);
    }

    limpiarFormularioMesa();
    actualizarSistema();

    alert("Mesa eliminada correctamente.");
}

function limpiarFormularioMesa() {
    const form = document.getElementById("form-admin-mesa");

    if (form) {
        form.reset();
    }

    const modo = document.getElementById("modo-edicion-mesa");
    const botonGuardar = document.getElementById("btn-guardar-mesa");

    if (modo) {
        modo.value = "nuevo";
    }

    if (botonGuardar) {
        botonGuardar.textContent = "Guardar mesa";
    }
}

function actualizarSistema() {
    renderizarResumen();
    renderizarMesas();
    renderizarReservaciones();
    renderizarTablaReservaciones();
    renderizarSelectMesas();
    renderizarSelectAsignarMesa();
    renderizarSelectLiberarMesa();
    renderizarMiniMapaReservacion();
    renderizarMiniMapaAsignar();
    renderizarMiniMapaLiberar();
    renderizarMiniMapaAdmin();
    renderizarTablaAdminMesas();
    actualizarHora();
}