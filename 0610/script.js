// Product data (including image URL for each product)
const products = [
    { id: 1, name: 'Notebook', price: 5, category: 'Stationery', imageUrl: 'Notebook.jpg' },
    { id: 2, name: 'Pen', price: 1, category: 'Stationery',imageUrl:'pens.jpg'},
    { id: 3, name: 'Backpack', price: 20, category: 'Accessories', imageUrl: 'bag.jpg' },
    { id: 4, name: 'Math Book', price: 15, category: 'Books', imageUrl: 'textbook.jpg' },
    { id: 5, name: 'Eraser', price: 0.5, category: 'Stationery', imageUrl: 'eraser.jpg' },
    { id: 6, name: 'Pencil Case', price: 7, category: 'Accessories', imageUrl: 'pouch.jpg' },
    { id: 7, name: 'scales', price:5,category:'Accessories',imageUrl: 'scale.jpg'}
  ];
  
  // Cart array to hold selected items
  let cart = [];
  
  // Function to display products with images
  function displayProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products
  
    filteredProducts.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productItem);
    });
  }
  
  // Function to filter products by category
  function filterCategory(category) {
    if (category === '') {
      displayProducts(products);  // Display all products
    } else {
      const filtered = products.filter(product => product.category === category);
      displayProducts(filtered);
    }
  }
  
  // Function to add product to the cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity += 1;  // Increase quantity if already in cart
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
  
  // Function to remove product from the cart
  function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCart();
  }
  
  // Function to update the cart display
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';  // Clear existing cart items
  
    let totalPrice = 0;
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span class="item-quantity">x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });
  
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  
  // Function to clear the cart
  function clearCart() {
    cart = [];
    updateCart();
  }
  
  // Function to handle checkout process (for now, it just displays the order summary)
  function checkout() {
    const orderSummary = document.getElementById('order-summary');
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';  // Clear existing order details
  
    cart.forEach(item => {
      const orderItem = document.createElement('li');
      orderItem.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
      orderDetails.appendChild(orderItem);
    });
  
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItem = document.createElement('li');
    totalItem.textContent = `Total: $${totalPrice.toFixed(2)}`;
    orderDetails.appendChild(totalItem);
  
    document.querySelector('.cart-summary').style.display = 'none';
    orderSummary.style.display = 'block';
  }
  
  // Initialize the page by displaying all products
  displayProducts(products);
  
  // Attach event listeners
  document.getElementById('clear-cart-button').addEventListener('click', clearCart);
  document.getElementById('checkout-button').addEventListener('click', checkout);
  