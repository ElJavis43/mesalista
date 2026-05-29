console.log("MesaLista iniciado correctamente");

const mesas = document.querySelectorAll(".table");

mesas.forEach((mesa) => {
    mesa.addEventListener("click", () => {
        alert(`Seleccionaste la mesa ${mesa.textContent}`);
    });
});