# MesaLista

**MesaLista** es un sistema web para la gestión de mesas y reservaciones de una cenaduría concurrida. El objetivo del proyecto es mejorar la organización del negocio mediante una interfaz visual que permita consultar el estado de las mesas, registrar reservaciones, ocupar mesas, liberar mesas y consultar reportes básicos.

## Datos del proyecto

**Materia:** Técnicas Inteligentes para Desarrollo de Software
**Nombre del equipo:** DX
**Integrante:** Javier Ramirez Medina
**Nombre del sistema:** MesaLista
**Tipo de sistema:** Aplicación web

## Descripción general

En una cenaduría con alta concurrencia, especialmente en horarios de mayor demanda, puede ser complicado llevar el control de las mesas disponibles, ocupadas y reservadas. Muchas veces este proceso se realiza de forma manual, usando libretas, notas o comunicación verbal entre el personal.

MesaLista busca resolver este problema mediante una página web funcional que permite administrar visualmente el estado de las mesas y las reservaciones del negocio.

El sistema puede abrirse desde cualquier dispositivo con acceso al link del proyecto, ya que está publicado con GitHub Pages y conectado a Firebase Realtime Database.

## Objetivo del sistema

Desarrollar una aplicación web que ayude al personal de una cenaduría a gestionar de forma rápida y sencilla las mesas y reservaciones, reduciendo errores de comunicación, mejorando la asignación de mesas y facilitando la consulta de disponibilidad.

## Funciones principales

* Visualizar un mapa de mesas.
* Identificar mesas disponibles, ocupadas y reservadas mediante colores.
* Registrar nuevas reservaciones.
* Consultar reservaciones registradas.
* Filtrar reservaciones por fecha, estado, cliente, teléfono o mesa.
* Asignar u ocupar mesas disponibles.
* Liberar mesas ocupadas.
* Agregar nuevas mesas.
* Editar información de mesas existentes.
* Eliminar mesas.
* Consultar reportes básicos.
* Ver historial de movimientos.
* Guardar información en Firebase Realtime Database.
* Mantener respaldo local mediante localStorage.

## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* Firebase Realtime Database
* Git
* GitHub
* GitHub Pages
* Visual Studio Code

## Paleta de colores

El diseño del sistema utiliza una paleta cálida relacionada con el ambiente de una cenaduría:

| Color            | Código  | Uso                 |
| ---------------- | ------- | ------------------- |
| Crema claro      | #FFF4E6 | Fondo principal     |
| Café oscuro      | #4A2C24 | Texto principal     |
| Rojo terracota   | #B84A39 | Botones principales |
| Verde olivo      | #6B8E4E | Mesas disponibles   |
| Amarillo mostaza | #D9A441 | Mesas reservadas    |
| Rojo suave       | #C94C4C | Mesas ocupadas      |
| Gris cálido      | #8C7A6B | Texto secundario    |

## Estados de mesas

El sistema utiliza tres estados principales:

* **Disponible:** la mesa puede ser ocupada.
* **Ocupada:** la mesa está siendo usada por clientes.
* **Reservada:** la mesa está apartada para una reservación.

## Estructura del proyecto

```text
mesalista/
│
├── index.html
├── README.md
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── ui.js
│   ├── firebase-config.js
│   └── firebase-service.js
│
└── assets/
    └── img/
```

## Pantallas principales

### Dashboard / Mapa de mesas

Muestra el resumen general del estado del negocio, incluyendo mesas disponibles, ocupadas, reservadas y tiempo estimado de espera.

### Reservaciones

Permite consultar las reservaciones registradas, filtrarlas por fecha, estado o búsqueda general.

### Nueva reservación

Permite registrar una reservación con nombre del cliente, teléfono, fecha, hora, número de personas y mesa asignada.

### Asignar / Ocupar mesa

Permite seleccionar una mesa disponible e indicar cuántas personas la ocuparán.

### Liberar mesa

Permite cambiar una mesa ocupada nuevamente a estado disponible.

### Administración de mesas

Permite agregar, editar o eliminar mesas según la distribución del negocio.

### Reportes e historial

Muestra indicadores básicos como ocupación promedio, reservaciones registradas, mesas disponibles y movimientos recientes.

## Funcionamiento de la base de datos

El sistema utiliza Firebase Realtime Database para guardar la información en la nube. Los datos principales que se almacenan son:

* Mesas
* Reservaciones
* Historial de movimientos

También se usa localStorage como respaldo local para mantener la información en caso de problemas de conexión.

## Publicación del proyecto

El proyecto está pensado para publicarse mediante GitHub Pages, permitiendo que el sistema pueda abrirse desde cualquier dispositivo con acceso al enlace.

## Cómo ejecutar el proyecto localmente

1. Descargar o clonar el repositorio.
2. Abrir la carpeta en Visual Studio Code.
3. Instalar la extensión Live Server.
4. Abrir el archivo `index.html`.
5. Ejecutar con Live Server.

## Cómo subir cambios a GitHub

Después de realizar cambios en el proyecto, se deben ejecutar los siguientes comandos:

```bash
git add .
git commit -m "Descripcion del cambio"
git push
```

## Conclusión

MesaLista representa una solución práctica para mejorar la gestión de mesas y reservaciones en una cenaduría. El sistema permite organizar mejor la atención a clientes, reducir confusiones y ofrecer una vista clara del estado actual del negocio.

Además, al estar desarrollado como aplicación web y conectado a Firebase, puede utilizarse desde diferentes dispositivos sin depender de un servidor local.
