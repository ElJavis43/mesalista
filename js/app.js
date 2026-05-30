document.addEventListener("DOMContentLoaded", () => {
    renderizarResumen();
    renderizarMesas();
    renderizarReservaciones();

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

            screens.forEach((screen) => {
                screen.classList.remove("active-screen");
            });

            document.getElementById(screenId).classList.add("active-screen");

            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active");
            });

            item.classList.add("active");
        });
    });
}