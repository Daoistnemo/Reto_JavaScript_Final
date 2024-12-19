
// Función para crear una tarjeta de producto
function createCard(product) {
  return `
      <a class="product-card" href="./details.html?id=${product.id}">
          <img class="product-img" src="${product.imageSrc}" alt="${product.title}" />
          <div class="product-info">
              <span class="product-title">${product.title}</span>
              <span class="product-color">${product.colors}</span>
              <div class="product-price-block">
                  <span class="product-price">${product.price}</span>
                  <span class="product-discount">${product.discount}</span>
              </div>
              <div class="product-tax-policy">
                  Incluye impuesto País y percepción AFIP
              </div>
          </div>
            
      </a>
  `;
}

// Función para actualizar la vista de productos
function updateProductView(products) {
  const productsSelector = document.getElementById("products");
  if (productsSelector) {
      const productsTemplate = products.map(createCard).join('');
      productsSelector.innerHTML = productsTemplate;
  }
}
