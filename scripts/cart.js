// Función para cargar productos del carrito desde localStorage
function loadCartProducts() {
  const cartItems = localStorage.getItem("cart");
  return cartItems ? JSON.parse(cartItems) : [];  // Devuelve el carrito si existe, si no, un array vacío
}

// Función para crear la carta del producto en el carrito
function createCartCard(product) {
  // Ruta de las imágenes en formato webp y JPG
  const imageSrcWebp = `../assets/${product.id}.webp`;
  const imageSrcJpg = `../assets/${product.id}.jpg`;

  return `
      <div class="product-card">
          <picture>
              <source srcset="${imageSrcWebp}" type="image/webp">  <!-- Imagen en formato webp -->
              <img class="product-img" src="${imageSrcJpg}" alt="${product.title}" />  <!-- Imagen en formato JPG -->
          </picture>
          <div class="product-info">
              <span class="product-title">${product.title}</span>
              <span class="product-color">${product.color || 'Color no disponible'}</span>
              <div class="product-description">
                  <span class="product-label">Descripción</span>
                  <p>${product.description || 'Descripción no disponible'}</p>
              </div>
              <div class="product-price-block">
                  <span class="product-price">${product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                  <span class="product-discount">${product.discount}</span>
              </div>
              <div class="product-tax-policy">
                  Incluye impuesto País y percepción AFIP
              </div>
              <div class="Quantity">
                  <span class="Quantity-product">Cantidad: </span>
                  <input type="number" name="quantity" min="1" id="${product.id}" value="${product.quantity}" onchange="changeQuantity(event)">
              </div>
          </div>
      </div>
  `;
}

// Función para actualizar la vista del carrito con los productos
function updateCartView() {
  const cartProducts = loadCartProducts();
  const cartProductsContainer = document.getElementById("cartproducts");

  if (cartProductsContainer) {
    const productCardsHTML = cartProducts.map(createCartCard).join("");
    cartProductsContainer.innerHTML = productCardsHTML;

    // Agregar eventos de "Agregar a Favoritos" a cada producto
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    favoriteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const productId = parseInt(button.getAttribute("data-product-id"), 10);
        addToFavorites(productId);
      });
    });
  } else {
    console.error('Elemento con id "cartproducts" no encontrado.');
  }
}

// Función para agregar un producto a la lista de favoritos
function addToFavorites(productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Verificar si el producto ya está en favoritos
  const productExists = favorites.some(product => product.id === productId);

  if (!productExists) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = cart.find(product => product.id === productId);

    if (productToAdd) {
      favorites.push(productToAdd);
      localStorage.setItem('favorites', JSON.stringify(favorites));  // Guardar los favoritos
      alert("Producto agregado a favoritos");
      renderFavorites();  // Renderizar los productos favoritos
    }
  } else {
    alert("Este producto ya está en tus favoritos");
  }
}

// Función para renderizar la lista de productos favoritos
function renderFavorites() {
  const favoritesContainer = document.getElementById('favoritesContainer');
  favoritesContainer.innerHTML = '';  // Limpiar el contenedor de favoritos

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No tienes productos favoritos.</p>";
    return;
  }

  favorites.forEach(product => {
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favorite-card');

    // Añadir la imagen y detalles del producto favorito
    favoriteCard.innerHTML = `
       <img class="favorite-image" src="${product.imageSrc || `./assets/products/${product.id}.webp`}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Precio: $${product.price}</p>
    `;

    favoritesContainer.appendChild(favoriteCard);
  });
}

// Función para renderizar las cartas de productos en el carrito
function renderCartProducts(products) {
  const cartContainer = document.getElementById('cartproducts');
  cartContainer.innerHTML = '';  // Limpiar el contenedor del carrito

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Crear una carta para cada producto en el carrito
    productCard.innerHTML = `
<img class="product-img" 
     src="${product.imageSrc ? `./assets/${product.imageSrc}.webp` : `./assets/${product.id}.webp`}" 
     alt="${product.title}">
    <h3>${product.title}</h3>
    <p>Precio: $${product.price}</p>
    <button class="remove-btn" data-product-id="${product.id}">Eliminar</button>
    <button class="favorite-btn" data-product-id="${product.id}">Agregar a Favoritos</button>
  `;

    // Evento de eliminación del producto
    const removeButton = productCard.querySelector('.remove-btn');
    removeButton.addEventListener('click', () => {
      removeProductFromCart(product.id);
    });

    // Evento para agregar el producto a favoritos
    const favoriteButton = productCard.querySelector('.favorite-btn');
    favoriteButton.addEventListener('click', () => {
      addToFavorites(product.id);
    });

    cartContainer.appendChild(productCard);
  });
}

// Función para eliminar un producto del carrito
function removeProductFromCart(productId) {
  let cartProducts = loadCartProducts();
  cartProducts = cartProducts.filter(product => product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cartProducts));  // Actualizar el carrito en localStorage
  renderCartProducts(cartProducts);  // Renderizar el carrito actualizado
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(event) {
  const input = event.target;
  const productId = parseInt(input.id, 10);
  const newQuantity = parseInt(input.value, 10);

  // Validar la cantidad
  if (isNaN(newQuantity) || newQuantity < 1) {
    input.value = 1;  // Restablecer al mínimo permitido
    return;
  }

  // Obtener productos del carrito y actualizar la cantidad
  let cartProducts = loadCartProducts();
  cartProducts = cartProducts.map(product => 
    product.id === productId ? { ...product, quantity: newQuantity } : product
  );

  // Guardar los productos actualizados en localStorage
  localStorage.setItem("cart", JSON.stringify(cartProducts));
  renderCartProducts(cartProducts);  // Renderizar el carrito actualizado
}

// Llamadas para renderizar los productos en el carrito y los favoritos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const cartProducts = loadCartProducts();
  renderCartProducts(cartProducts);  // Renderizar los productos del carrito
  renderFavorites();  // Mostrar productos favoritos al cargar la página
});
