const mesas = [
    {
        id: "M1",
        capacidad: 4,
        zona: "Terraza",
        estado: "disponible"
    },
    {
        id: "M2",
        capacidad: 2,
        zona: "Terraza",
        estado: "disponible"
    },
    {
        id: "M3",
        capacidad: 6,
        zona: "Interior",
        estado: "reservada"
    },
    {
        id: "M4",
        capacidad: 4,
        zona: "Terraza",
        estado: "disponible"
    },
    {
        id: "M5",
        capacidad: 8,
        zona: "Interior",
        estado: "ocupada"
    },
    {
        id: "M6",
        capacidad: 4,
        zona: "Terraza",
        estado: "disponible"
    },
    {
        id: "M7",
        capacidad: 2,
        zona: "Bar",
        estado: "reservada"
    },
    {
        id: "M8",
        capacidad: 6,
        zona: "Bar",
        estado: "disponible"
    },
    {
        id: "M9",
        capacidad: 4,
        zona: "Bar",
        estado: "disponible"
    },
    {
        id: "M10",
        capacidad: 6,
        zona: "Interior",
        estado: "ocupada"
    }
];

const reservaciones = [
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