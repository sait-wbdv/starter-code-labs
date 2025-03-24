export function initializeProducts() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const productElement = event.target.closest('.product');
          const productName = productElement.querySelector('h3').textContent;
          const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
          const product = { name: productName, price: productPrice };
          document.dispatchEvent(new CustomEvent('productAddedToCart', { detail: product }));
      });
  });
}
