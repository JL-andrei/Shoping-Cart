let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let ListProductHTML = document.querySelector('.ListProduct');
let ListCartHTML = document.querySelector('.ListCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let totalPriceDisplay = document.querySelector('#total-price');

let ListProduct = [];
let carts = [];

iconCart.addEventListener('click', () => { 
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => { 
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    ListProductHTML.innerHTML = '';
    if (ListProduct.length > 0) {
        ListProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">₱${product.price}</div>
                <button class="addCart">Add to Cart</button>
            `;
            ListProductHTML.appendChild(newProduct);
        });
    }
};

ListProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

const addToCart = (product_id) => {
    let product = ListProduct.find(item => item.id == product_id);
    if (product) {
        // Add the product to the cart (even if it's already there)
        carts.push(product);
        updateCartDisplay();
        updateCartIcon();
    }
};

const removeFromCart = (product_id, index) => {
    // Remove only the specific product by matching both the id and the index
    carts.splice(index, 1); // Remove the product at the specified index
    updateCartDisplay();
    updateCartIcon();
};

const updateCartDisplay = () => {
    ListCartHTML.innerHTML = '';
    let totalPrice = 0;

    if (carts.length > 0) {
        // Display each item in the cart, even if it's a duplicate
        carts.forEach((product, index) => {
            let newCartItem = document.createElement('div');
            newCartItem.classList.add('items');
            newCartItem.innerHTML = `
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="name">${product.name}</div>
                <div class="totalprice">₱${product.price}</div>
                <div class="remove">
                    <button onclick="removeFromCart(${product.id}, ${index})">REMOVE</button>
                </div>
            `;
            ListCartHTML.appendChild(newCartItem);
            totalPrice += parseFloat(product.price); // Add the product's price to the total
        });

        // Display total price
        totalPriceDisplay.textContent = `Total Price: ₱${totalPrice.toFixed(2)}`;
    } else {
        totalPriceDisplay.textContent = `Total Price: ₱0.00`;
    }
};

const updateCartIcon = () => {
    iconCartSpan.textContent = carts.length; // Display number of items in the cart (including duplicates)
};

const initApp = () => {
    // Clear the cart array to ensure it's empty
    carts = [];
    updateCartDisplay();  // Update the cart display to show an empty cart
    updateCartIcon();  // Update the cart icon to show 0 items

    // Get data from product.larry (make sure this file doesn't contain pre-loaded items)
    fetch('product.larry')
        .then(response => response.json()) // Make sure the response is parsed correctly
        .then(data => {
            ListProduct = data;
            addDataToHTML();
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
};

initApp();
