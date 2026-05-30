document.addEventListener("DOMContentLoaded", () => {
    renderizarResumen();
    renderizarMesas();
    renderizarReservaciones();
    renderizarTablaReservaciones();

    activarNavegacion();

    console.log("MesaLista cargado correctamente");
});

function activarNavegacion() {
    const menuItems = document.querySelectorAll(".menu-item");
    const screens = document.querySelectorAll(".screen");

    menuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();

            const screenId = item.dataset.screen;

            if (!screenId) {
                console.warn("Este botón no tiene data-screen:", item);
                return;
            }

            screens.forEach((screen) => {
                screen.classList.remove("active-screen");
            });

            const pantallaSeleccionada = document.getElementById(screenId);

            if (!pantallaSeleccionada) {
                console.error("No existe una pantalla con el id:", screenId);
                return;
            }

            pantallaSeleccionada.classList.add("active-screen");

            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active");
            });

            item.classList.add("active");
        });
    });
}