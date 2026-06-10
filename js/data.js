const MESAS_INICIALES = [
    {
        id: "M1",
        capacidad: 4,
        zona: "Terraza",
        estado: "disponible",
        descripcion: "Mesa en terraza.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M2",
        capacidad: 2,
        zona: "Terraza",
        estado: "disponible",
        descripcion: "Mesa pequeña en terraza.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M3",
        capacidad: 6,
        zona: "Interior",
        estado: "reservada",
        descripcion: "Mesa amplia en zona interior.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M4",
        capacidad: 4,
        zona: "Terraza",
        estado: "disponible",
        descripcion: "Mesa estándar en terraza.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M5",
        capacidad: 8,
        zona: "Interior",
        estado: "ocupada",
        descripcion: "Mesa familiar en interior.",
        personasActuales: 8,
        notas: "Mesa ocupada inicialmente."
    },
    {
        id: "M6",
        capacidad: 4,
        zona: "Terraza",
        estado: "disponible",
        descripcion: "Mesa en terraza.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M7",
        capacidad: 2,
        zona: "Bar",
        estado: "reservada",
        descripcion: "Mesa pequeña cerca del bar.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M8",
        capacidad: 6,
        zona: "Bar",
        estado: "disponible",
        descripcion: "Mesa grande en zona de bar.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M9",
        capacidad: 4,
        zona: "Bar",
        estado: "disponible",
        descripcion: "Mesa estándar en zona de bar.",
        personasActuales: 0,
        notas: ""
    },
    {
        id: "M10",
        capacidad: 6,
        zona: "Interior",
        estado: "ocupada",
        descripcion: "Mesa interior.",
        personasActuales: 6,
        notas: "Mesa ocupada inicialmente."
    }
];

const RESERVACIONES_INICIALES = [
    {
        id: 1,
        cliente: "María López",
        telefono: "5551234567",
        fecha: "2026-05-29",
        hora: "12:30",
        personas: 4,
        mesa: "M3",
        estado: "confirmada",
        notas: ""
    },
    {
        id: 2,
        cliente: "Carlos Ramírez",
        telefono: "5559876543",
        fecha: "2026-05-29",
        hora: "13:00",
        personas: 2,
        mesa: "M8",
        estado: "confirmada",
        notas: ""
    },
    {
        id: 3,
        cliente: "Ana Torres",
        telefono: "5552345678",
        fecha: "2026-05-29",
        hora: "13:30",
        personas: 6,
        mesa: "M7",
        estado: "en espera",
        notas: ""
    },
    {
        id: 4,
        cliente: "Luis Hernández",
        telefono: "5553456789",
        fecha: "2026-05-30",
        hora: "14:15",
        personas: 4,
        mesa: "M1",
        estado: "confirmada",
        notas: ""
    },
    {
        id: 5,
        cliente: "Sofía Castillo",
        telefono: "5554567890",
        fecha: "2026-05-30",
        hora: "15:00",
        personas: 3,
        mesa: "M9",
        estado: "en espera",
        notas: ""
    }
];

const HISTORIAL_INICIAL = [];

let mesas = cargarDesdeLocalStorage("mesalista_mesas", MESAS_INICIALES);
let reservaciones = cargarDesdeLocalStorage("mesalista_reservaciones", RESERVACIONES_INICIALES);
let historialMovimientos = cargarDesdeLocalStorage("mesalista_historial", HISTORIAL_INICIAL);

function copiarDatos(datos) {
    return JSON.parse(JSON.stringify(datos));
}

function cargarDesdeLocalStorage(clave, valorInicial) {
    const datosGuardados = localStorage.getItem(clave);

    if (!datosGuardados) {
        return copiarDatos(valorInicial);
    }

    try {
        return JSON.parse(datosGuardados);
    } catch (error) {
        console.error(`Error al cargar ${clave}:`, error);
        return copiarDatos(valorInicial);
    }
}

function guardarDatosLocales() {
    localStorage.setItem("mesalista_mesas", JSON.stringify(mesas));
    localStorage.setItem("mesalista_reservaciones", JSON.stringify(reservaciones));
    localStorage.setItem("mesalista_historial", JSON.stringify(historialMovimientos));
}

function guardarDatos() {
    guardarDatosLocales();

    if (typeof guardarDatosFirebase === "function") {
        guardarDatosFirebase();
    }
}

function reiniciarDatos() {
    const confirmar = confirm(
        "¿Deseas reiniciar todos los datos del sistema? Se perderán los cambios guardados."
    );

    if (!confirmar) return;

    localStorage.removeItem("mesalista_mesas");
    localStorage.removeItem("mesalista_reservaciones");
    localStorage.removeItem("mesalista_historial");

    mesas = copiarDatos(MESAS_INICIALES);
    reservaciones = copiarDatos(RESERVACIONES_INICIALES);
    historialMovimientos = copiarDatos(HISTORIAL_INICIAL);

    guardarDatos();

    if (typeof actualizarSistema === "function") {
        actualizarSistema();
    }

    alert("Los datos fueron reiniciados correctamente.");
}