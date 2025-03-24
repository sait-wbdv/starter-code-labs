export function initializeCart() {
  const cart = [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  document.addEventListener('productAddedToCart', (event) => {
      const product = event.detail;
      addToCart(product);
      updateCart();
  });

  function addToCart(product) {
      const existingProduct = cart.find(item => item.name === product.name);
      if (existingProduct) {
          existingProduct.quantity++;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
  }

  function updateCart() {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      cart.forEach(product => {
          const productTotal = product.price * product.quantity;
          total += productTotal;
          const cartItem = document.createElement('div');
          cartItem.textContent = `${product.name} - $${product.price.toFixed(2)} x ${product.quantity} = $${productTotal.toFixed(2)}`;
          cartItemsContainer.appendChild(cartItem);
      });
      cartTotalElement.textContent = total.toFixed(2);
  }

  document.getElementById('checkout').addEventListener('click', () => {
      alert('Checkout is not implemented yet.');
  });
}
