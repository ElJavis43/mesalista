let firebaseListo = false;
let aplicandoCambiosRemotos = false;

function obtenerReferenciaPrincipal() {
    return database.ref("mesalista");
}

async function iniciarFirebaseDatos() {
    try {
        const referencia = obtenerReferenciaPrincipal();

        console.log("Intentando conectar con Firebase...");

        const snapshot = await referencia.once("value");

        if (snapshot.exists()) {
            const datos = snapshot.val();

            mesas = datos.mesas || [];
            reservaciones = datos.reservaciones || [];
            historialMovimientos = datos.historialMovimientos || [];

            guardarDatosLocales();

            console.log("Datos cargados desde Firebase.");
        } else {
            console.log("Firebase no tenía datos. Subiendo datos iniciales...");

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

async function guardarDatosFirebase() {
    if (!firebaseListo) {
        console.warn("Firebase todavía no está listo. Se guardó solo en localStorage.");
        return;
    }

    if (aplicandoCambiosRemotos) {
        console.log("No se guardó porque se están aplicando cambios remotos.");
        return;
    }

    try {
        const referencia = obtenerReferenciaPrincipal();

        console.log("Guardando datos en Firebase...");

        await referencia.set({
            mesas: mesas,
            reservaciones: reservaciones,
            historialMovimientos: historialMovimientos
        });

        console.log("Datos guardados correctamente en Firebase.");
    } catch (error) {
        console.error("Error al guardar en Firebase:", error);
        alert("Hubo un problema al guardar en Firebase. Revisa las reglas de la base de datos.");
    }
}

async function probarConexionFirebase() {
    try {
        const referencia = obtenerReferenciaPrincipal();

        await referencia.child("prueba").set({
            mensaje: "Firebase funciona correctamente",
            fecha: new Date().toLocaleString("es-MX")
        });

        console.log("Prueba enviada correctamente a Firebase.");
        alert("Prueba enviada correctamente a Firebase.");
    } catch (error) {
        console.error("Error en prueba de Firebase:", error);
        alert("No se pudo escribir en Firebase. Revisa las reglas.");
    }
}

async function forzarGuardadoFirebase() {
    await guardarDatosFirebase();
    alert("Se intentó guardar todo en Firebase. Revisa la consola y Firebase.");
}