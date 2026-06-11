function obtenerReservacionesActivas() {
    return reservaciones.filter((reservacion) => reservacion.estado === "en espera");
}

function iniciarSesion(event) {
    event.preventDefault();

    const usuario = document.getElementById("login-usuario").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (usuario === "admin" && password === "1234") {
        sessionStorage.setItem("mesalista_sesion", "activa");
        sessionStorage.setItem("mesalista_usuario", usuario);

        mostrarSistema();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function mostrarSistema() {
    const loginScreen = document.getElementById("login-screen");
    const appShell = document.getElementById("app-shell");
    const usuarioActivo = document.getElementById("usuario-activo");

    if (loginScreen) {
        loginScreen.style.display = "none";
    }

    if (appShell) {
        appShell.classList.remove("app-locked");
    }

    if (usuarioActivo) {
        usuarioActivo.textContent = sessionStorage.getItem("mesalista_usuario") || "Administrador";
    }
}

function cerrarSesion() {
    const confirmar = confirm("¿Deseas cerrar sesión?");

    if (!confirmar) return;

    sessionStorage.removeItem("mesalista_sesion");
    sessionStorage.removeItem("mesalista_usuario");

    location.reload();
}

function verificarSesion() {
    const sesionActiva = sessionStorage.getItem("mesalista_sesion");

    if (sesionActiva === "activa") {
        mostrarSistema();
    }
}

function renderizarTablaReservaciones(lista = obtenerReservacionesActivas()) {
    const tabla = document.getElementById("tabla-reservaciones");

    if (!tabla) return;

    tabla.innerHTML = "";

    if (lista.length === 0) {
        const filaVacia = document.createElement("tr");

        filaVacia.innerHTML = `
      <td colspan="7" class="empty-row">
        No hay reservaciones pendientes por atender.
      </td>
    `;

        tabla.appendChild(filaVacia);
        return;
    }

    lista.forEach((reservacion) => {
        const fila = document.createElement("tr");

        let botonesAcciones = `
      <button class="action-btn" onclick="verReservacion(${reservacion.id})">
        Ver
      </button>
    `;

        botonesAcciones += `
      <button class="action-btn" onclick="ocuparMesaReservacion(${reservacion.id})">
        Ocupar
      </button>

      <button class="action-btn danger-action" onclick="cancelarReservacion(${reservacion.id})">
        Cancelar
      </button>
    `;

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
      <td class="acciones-reservacion">
        ${botonesAcciones}
      </td>
    `;

        tabla.appendChild(fila);
    });
}

function aplicarFiltrosReservaciones() {
    const filtroFecha = document.getElementById("filtro-fecha");
    const filtroEstado = document.getElementById("filtro-estado");
    const filtroBusqueda = document.getElementById("filtro-busqueda");

    if (!filtroFecha || !filtroEstado || !filtroBusqueda) return;

    const fecha = filtroFecha.value;
    const busqueda = filtroBusqueda.value.trim().toLowerCase();

    let resultado = obtenerReservacionesActivas();

    if (fecha) {
        resultado = resultado.filter((reservacion) => reservacion.fecha === fecha);
    }

    if (busqueda) {
        resultado = resultado.filter((reservacion) => {
            const cliente = String(reservacion.cliente || "").toLowerCase();
            const telefono = String(reservacion.telefono || "").toLowerCase();
            const mesa = String(reservacion.mesa || "").toLowerCase();
            const estado = String(reservacion.estado || "").toLowerCase();

            return (
                cliente.includes(busqueda) ||
                telefono.includes(busqueda) ||
                mesa.includes(busqueda) ||
                estado.includes(busqueda)
            );
        });
    }

    renderizarTablaReservaciones(resultado);
}

function limpiarFiltrosReservaciones() {
    const filtroFecha = document.getElementById("filtro-fecha");
    const filtroEstado = document.getElementById("filtro-estado");
    const filtroBusqueda = document.getElementById("filtro-busqueda");

    if (filtroFecha) filtroFecha.value = "";
    if (filtroEstado) filtroEstado.value = "todos";
    if (filtroBusqueda) filtroBusqueda.value = "";

    renderizarTablaReservaciones(obtenerReservacionesActivas());
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
        estado: "en espera",
        notas: notas
    };

    reservaciones.push(nuevaReservacion);

    mesa.estado = "reservada";
    mesa.personasActuales = 0;
    mesa.notas = `Mesa reservada para ${cliente}.`;

    agregarHistorial(
        "Reservación",
        `Se registró una reservación en espera para ${cliente} en la mesa ${mesaSeleccionada}.`
    );

    guardarDatos();

    document.getElementById("form-nueva-reservacion").reset();

    limpiarFiltrosReservaciones();
    actualizarSistema();
    cambiarPantalla("pantalla-reservaciones");

    alert("Reservación guardada correctamente y quedó en espera.");
}

function ocuparMesaReservacion(id) {
    const reservacion = reservaciones.find((item) => item.id === id);

    if (!reservacion) {
        alert("No se encontró la reservación.");
        return;
    }

    if (reservacion.estado !== "en espera") {
        alert("Esta reservación ya fue atendida.");
        return;
    }

    const mesa = mesas.find((item) => item.id === reservacion.mesa);

    if (!mesa) {
        alert("No se encontró la mesa asignada a esta reservación.");
        return;
    }

    const confirmar = confirm(
        `¿Deseas confirmar la llegada de ${reservacion.cliente} y ocupar la mesa ${mesa.id}?`
    );

    if (!confirmar) return;

    reservacion.estado = "confirmada";

    mesa.estado = "ocupada";
    mesa.personasActuales = reservacion.personas;
    mesa.notas = `Ocupada por reservación de ${reservacion.cliente}.`;

    agregarHistorial(
        "Reservación",
        `La reservación de ${reservacion.cliente} fue confirmada y la mesa ${mesa.id} pasó a ocupada.`
    );

    guardarDatos();
    actualizarSistema();

    alert("Reservación confirmada. La mesa ahora está ocupada.");
}

function cancelarReservacion(id) {
    const reservacion = reservaciones.find((item) => item.id === id);

    if (!reservacion) {
        alert("No se encontró la reservación.");
        return;
    }

    if (reservacion.estado !== "en espera") {
        alert("Esta reservación ya fue atendida.");
        return;
    }

    const confirmar = confirm(
        `¿Deseas cancelar la reservación de ${reservacion.cliente}?`
    );

    if (!confirmar) return;

    const mesa = mesas.find((item) => item.id === reservacion.mesa);

    reservacion.estado = "cancelada";

    if (mesa && mesa.estado === "reservada") {
        mesa.estado = "disponible";
        mesa.personasActuales = 0;
        mesa.notas = "Mesa liberada por cancelación de reservación.";
    }

    agregarHistorial(
        "Cancelación",
        `Se canceló la reservación de ${reservacion.cliente}.`
    );

    guardarDatos();
    actualizarSistema();

    alert("Reservación cancelada. Ya no aparecerá en la ventana de reservaciones.");
}

function buscarGlobal() {
    const inputBusqueda = document.getElementById("busqueda-global");

    if (!inputBusqueda) return;

    const texto = inputBusqueda.value.trim().toLowerCase();

    if (!texto) {
        limpiarFiltrosReservaciones();
        actualizarSistema();
        return;
    }

    const resultadosReservaciones = obtenerReservacionesActivas().filter((reservacion) => {
        const cliente = String(reservacion.cliente || "").toLowerCase();
        const telefono = String(reservacion.telefono || "").toLowerCase();
        const mesa = String(reservacion.mesa || "").toLowerCase();
        const estado = String(reservacion.estado || "").toLowerCase();

        return (
            cliente.includes(texto) ||
            telefono.includes(texto) ||
            mesa.includes(texto) ||
            estado.includes(texto)
        );
    });

    cambiarPantalla("pantalla-reservaciones");
    renderizarTablaReservaciones(resultadosReservaciones);
}

function activarBusquedaSuperior() {
    const inputBusqueda = document.getElementById("busqueda-global");

    if (!inputBusqueda) return;

    inputBusqueda.addEventListener("input", buscarGlobal);
}

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    if (formLogin) {
        formLogin.addEventListener("submit", iniciarSesion);
    }

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", cerrarSesion);
    }

    activarBusquedaSuperior();
    verificarSesion();
});