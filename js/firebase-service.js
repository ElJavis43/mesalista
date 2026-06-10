let firebaseListo = false;
let aplicandoCambiosRemotos = false;

function obtenerReferenciaPrincipal() {
    return database.ref("mesalista");
}

async function iniciarFirebaseDatos() {
    try {
        const referencia = obtenerReferenciaPrincipal();
        const snapshot = await referencia.get();

        if (snapshot.exists()) {
            const datos = snapshot.val();

            mesas = datos.mesas || [];
            reservaciones = datos.reservaciones || [];
            historialMovimientos = datos.historialMovimientos || [];

            guardarDatosLocales();

            console.log("Datos cargados desde Firebase.");
        } else {
            await referencia.set({
                mesas: mesas,
                reservaciones: reservaciones,
                historialMovimientos: historialMovimientos
            });

            console.log("Datos iniciales enviados a Firebase.");
        }

        firebaseListo = true;
        escucharCambiosFirebase();

    } catch (error) {
        console.error("Error al iniciar Firebase:", error);
        firebaseListo = false;
        alert("No se pudo conectar con Firebase. El sistema funcionará con datos locales.");
    }
}

function escucharCambiosFirebase() {
    const referencia = obtenerReferenciaPrincipal();

    referencia.on("value", (snapshot) => {
        if (!snapshot.exists()) return;

        const datos = snapshot.val();

        aplicandoCambiosRemotos = true;

        mesas = datos.mesas || [];
        reservaciones = datos.reservaciones || [];
        historialMovimientos = datos.historialMovimientos || [];

        guardarDatosLocales();

        if (typeof actualizarSistema === "function") {
            actualizarSistema();
        }

        aplicandoCambiosRemotos = false;

        console.log("Cambios recibidos desde Firebase.");
    });
}

function guardarDatosFirebase() {
    if (!firebaseListo) {
        console.warn("Firebase todavía no está listo. Se guardó solo en localStorage.");
        return;
    }

    if (aplicandoCambiosRemotos) {
        return;
    }

    const referencia = obtenerReferenciaPrincipal();

    referencia.set({
        mesas: mesas,
        reservaciones: reservaciones,
        historialMovimientos: historialMovimientos
    }).then(() => {
        console.log("Datos guardados en Firebase.");
    }).catch((error) => {
        console.error("Error al guardar en Firebase:", error);
        alert("Hubo un problema al guardar en Firebase. Revisa la conexión o las reglas.");
    });
}