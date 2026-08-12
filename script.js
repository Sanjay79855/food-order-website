// ===============================
// FOODIE CART SYSTEM
// ===============================

let cart = JSON.parse(localStorage.getItem("foodieCart")) || [];


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    openCart();
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {
    localStorage.setItem("foodieCart", JSON.stringify(cart));
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    let totalQuantity = 0;
    let total = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;
        total += item.price * item.quantity;

    });

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent = total;
    }


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty 🛒
            </p>
        `;

        return;
    }


    // Show cart items
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                🗑️

            </button>

        `;

        cartItems.appendChild(cartItem);

    });
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
    updateCart();
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
    updateCart();
}


// ===============================
// REMOVE ITEM
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    updateCart();
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    const cartSidebar = document.getElementById("cart-sidebar");

    if (cartSidebar) {
        cartSidebar.classList.add("active");
    }
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    const cartSidebar = document.getElementById("cart-sidebar");

    if (cartSidebar) {
        cartSidebar.classList.remove("active");
    }
}


// ===============================
// TOGGLE CART
// ===============================

function toggleCart() {

    const cartSidebar = document.getElementById("cart-sidebar");

    if (!cartSidebar) return;

    cartSidebar.classList.toggle("active");
}


// ===============================
// OPEN ORDER FORM
// ===============================

function openOrderForm() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    const orderModal = document.getElementById("order-modal");
    const orderTotal = document.getElementById("order-total");

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    if (orderTotal) {
        orderTotal.textContent = total;
    }

    if (orderModal) {
        orderModal.classList.add("active");
    }
}


// ===============================
// CLOSE ORDER FORM
// ===============================

function closeOrderForm() {

    const orderModal = document.getElementById("order-modal");

    if (orderModal) {
        orderModal.classList.remove("active");
    }
}


// ===============================
// PLACE ORDER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    updateCart();

    const orderForm = document.getElementById("order-form");

    if (!orderForm) return;


    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("customer-name").value;

        const phone =
            document.getElementById("customer-phone").value;

        const address =
            document.getElementById("customer-address").value;

        const city =
            document.getElementById("customer-city").value;


        alert(
            "🎉 Order Placed Successfully!\n\n" +
            "Thank you, " + name + "!\n" +
            "Your food will be delivered to:\n" +
            address + ", " + city
        );


        // Empty cart
        cart = [];

        saveCart();

        updateCart();


        // Close order form
        closeOrderForm();


        // Reset form
        orderForm.reset();

    });

});