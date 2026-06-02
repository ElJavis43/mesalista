document.addEventListener("DOMContentLoaded", () => {
    actualizarSistema();
    activarNavegacion();
    activarBotones();
    activarFormularioNuevaReservacion();
    activarFormularioAsignarMesa();
    activarFormularioLiberarMesa();

    console.log("MesaLista cargado correctamente");
});

function activarNavegacion() {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();

            const screenId = item.dataset.screen;

            cambiarPantalla(screenId);

            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active");
            });

            item.classList.add("active");
        });
    });
}

function cambiarPantalla(screenId) {
    const screens = document.querySelectorAll(".screen");
    const pantallaSeleccionada = document.getElementById(screenId);

    if (!screenId) {
        console.error("No se recibió ningún ID de pantalla.");
        return;
    }

    if (!pantallaSeleccionada) {
        console.error("No existe una pantalla con este ID:", screenId);
        return;
    }

    screens.forEach((screen) => {
        screen.classList.remove("active-screen");
    });

    pantallaSeleccionada.classList.add("active-screen");

    console.log("Pantalla activa:", screenId);
}

function activarBotones() {
    const btnNuevaReservacion = document.getElementById("btn-ir-nueva-reservacion");
    const btnNuevaRapida = document.getElementById("btn-ir-nueva-rapida");
    const btnVolverReservaciones = document.getElementById("btn-volver-reservaciones");
    const btnCancelarNueva = document.getElementById("btn-cancelar-nueva");

    const btnAsignar = document.getElementById("btn-ir-asignar");
    const btnVolverDashboard = document.getElementById("btn-volver-dashboard");
    const btnCancelarAsignar = document.getElementById("btn-cancelar-asignar");

    const btnLiberarRapido = document.getElementById("btn-liberar-rapido");
    const btnVolverDashboardLiberar = document.getElementById("btn-volver-dashboard-liberar");
    const btnCancelarLiberar = document.getElementById("btn-cancelar-liberar");

    if (btnNuevaReservacion) {
        btnNuevaReservacion.addEventListener("click", () => {
            cambiarPantalla("pantalla-nueva-reservacion");
        });
    }

    if (btnNuevaRapida) {
        btnNuevaRapida.addEventListener("click", () => {
            cambiarPantalla("pantalla-nueva-reservacion");
        });
    }

    if (btnVolverReservaciones) {
        btnVolverReservaciones.addEventListener("click", () => {
            cambiarPantalla("pantalla-reservaciones");
        });
    }

    if (btnCancelarNueva) {
        btnCancelarNueva.addEventListener("click", () => {
            const form = document.getElementById("form-nueva-reservacion");

            if (form) {
                form.reset();
            }

            cambiarPantalla("pantalla-reservaciones");
        });
    }

    if (btnAsignar) {
        btnAsignar.addEventListener("click", () => {
            cambiarPantalla("pantalla-asignar");
        });
    }

    if (btnVolverDashboard) {
        btnVolverDashboard.addEventListener("click", () => {
            cambiarPantalla("pantalla-dashboard");
        });
    }

    if (btnCancelarAsignar) {
        btnCancelarAsignar.addEventListener("click", () => {
            const form = document.getElementById("form-asignar-mesa");

            if (form) {
                form.reset();
            }

            cambiarPantalla("pantalla-dashboard");
        });
    }

    if (btnLiberarRapido) {
        btnLiberarRapido.addEventListener("click", () => {
            cambiarPantalla("pantalla-liberar");
        });
    }

    if (btnVolverDashboardLiberar) {
        btnVolverDashboardLiberar.addEventListener("click", () => {
            cambiarPantalla("pantalla-dashboard");
        });
    }

    if (btnCancelarLiberar) {
        btnCancelarLiberar.addEventListener("click", () => {
            const form = document.getElementById("form-liberar-mesa");

            if (form) {
                form.reset();
            }

            cambiarPantalla("pantalla-dashboard");
        });
    }
}

function activarFormularioNuevaReservacion() {
    const form = document.getElementById("form-nueva-reservacion");
    const inputPersonas = document.getElementById("personas");

    if (form) {
        form.addEventListener("submit", guardarNuevaReservacion);
    }

    if (inputPersonas) {
        inputPersonas.addEventListener("input", actualizarSugerenciaMesa);
    }
}

function activarFormularioAsignarMesa() {
    const form = document.getElementById("form-asignar-mesa");
    const inputPersonas = document.getElementById("personas-asignar");

    if (form) {
        form.addEventListener("submit", guardarAsignacionMesa);
    }

    if (inputPersonas) {
        inputPersonas.addEventListener("input", actualizarSugerenciaAsignar);
    }
}

function activarFormularioLiberarMesa() {
    const form = document.getElementById("form-liberar-mesa");
    const selectMesa = document.getElementById("mesa-liberar");

    if (form) {
        form.addEventListener("submit", guardarLiberacionMesa);
    }

    if (selectMesa) {
        selectMesa.addEventListener("change", actualizarDetalleLiberar);
    }
}