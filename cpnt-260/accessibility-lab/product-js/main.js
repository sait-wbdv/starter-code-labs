import { initializeCart } from '../productJs/cart.js';
import { initializeProducts } from '../productJs/product.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    initializeCart();
});
