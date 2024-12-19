// Selecciona el elemento de navegación usando el id "nav"
const navSelector = document.getElementById("nav");

// Define un array de opciones para los botones de navegación
const options = [
  { title: "Ofertas de la semana", linkTo: "./outlet.html", id: "ofertas" }, // Agregamos un id único para las ofertas
  { title: "Como comprar", linkTo: "https://www.youtube.com/watch?v=Oextk-If8HQ&ab_channel=KeaneVEVO" },
  { title: "Costos y Tarifas", linkTo: "https://www.youtube.com/watch?v=CTbhLH7jIjI&ab_channel=UltimoChannel" },
  { title: "Mis pedidos", linkTo: "https://www.youtube.com/watch?v=xy3AcmW0lrQ&ab_channel=DjoMusic" },
  { title: "Garantía", linkTo: "https://www.youtube.com/watch?v=a5uQMwRMHcs&ab_channel=DaftPunkVEVO" },
];

// Crea y agrega los elementos de navegación al navSelector
for (let option of options) {
  const anchor = document.createElement("a");
  anchor.className = "nav-button"; // Clase CSS para los botones de navegación
  anchor.textContent = option.title; // Texto del botón
  anchor.href = option.linkTo; // Enlace al que el botón dirigirá
  
  // Agregar un id a las "Ofertas de la semana" para identificarlas fácilmente
  if (option.id) {
    anchor.id = option.id;
  }

  navSelector.appendChild(anchor); // Agrega el botón al contenedor de navegación
}

// Obtener el enlace de "Ofertas de la semana" usando el id
const ofertasLink = document.getElementById('ofertas');

// Mostrar un mensaje (div) de forma única cuando se hace clic en "Ofertas de la semana"
if (ofertasLink) {
  ofertasLink.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace navegue a otra página inmediatamente
    
    // Si ya existe el mensaje, no crear uno nuevo
    let existingMessage = document.getElementById("ofertasMessage");
    if (!existingMessage) {
      const ofertasMessage = document.createElement("div");
      ofertasMessage.id = "ofertasMessage"; // Asignar id para evitar duplicados
      ofertasMessage.textContent = "NEMO ESTUVO ACA";  
      document.body.appendChild(ofertasMessage);
    }
    
    alert("¡¡NEMO ESTUVO ACA!!"); // Alerta con el mensaje
  });
}

// Cambiar el estilo de los botones de navegación
const navS = document.getElementsByClassName("nav-button");

for (let i = 0; i < navS.length; i++) {
  navS[i].style.color = "#ffffff"; // Cambia el color del texto a blanco
  navS[i].style.padding = "10px 20px"; // Cambia el padding para hacer los botones más grandes
  navS[i].style.textDecoration = "none"; // Elimina el subrayado del enlace
  navS[i].style.borderRadius = "5px"; // Redondea las esquinas de los botones
  navS[i].style.fontSize = "15px";
  navS[i].style.fontWeight = "bold"; // Hace que la fuente esté en negrita
}

// --------------------------------------------------------------------------------------
// Selecciona el elemento del pie de página usando el id "footer"
const footerSelector = document.getElementById("footer");

// Define las opciones para el pie de página, ahora con la propiedad "opts"
const options1 = [
  { title: "Categorías", linkTo: "https://github.com/Daoistnemo/", opts: ["Laptops", "Audio", "Auriculares"] },
  { title: "Compra", linkTo: "https://github.com/Daoistnemo/", opts: ["Formas de pago", "Envíos", "Devoluciones"] },
  { title: "Costos y Tarifas", linkTo: "https://github.com/Daoistnemo/", opts: ["Impuestos", "Facturación"] },
  { title: "Mis pedidos", linkTo: "https://github.com/Daoistnemo/", opts: ["Pedir nuevamente", "Lista de deseos"] },
  { title: "Garantía", linkTo: "https://github.com/Daoistnemo/", opts: ["Pide garantía"] },
];

for (const option of options1) {
  // Crear contenedor para cada columna
  const column = document.createElement("div");
  column.className = "footer-column"; 
  
  // Crear y añadir título
  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  titleLink.href = option.linkTo;
  titleLink.textContent = option.title;
  title.appendChild(titleLink);
  column.appendChild(title);
  
  // Crear y añadir opciones
  for (const opt of option.opts) {
    if (opt) { // Solo agregar opciones no vacías
      const item = document.createElement("p");
      const itemLink = document.createElement("a");
      itemLink.href = "https://github.com/Daoistnemo/";
      itemLink.textContent = opt;
      item.appendChild(itemLink);
      column.appendChild(item);
    }
  }
  
  // Agregar la columna al contenedor del pie de página
  footerSelector.appendChild(column);
}
