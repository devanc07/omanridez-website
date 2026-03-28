window.onload = function () {
    updateNavbar();
    loadCart();
};

/* NAVBAR */
function updateNavbar() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = "Cart (" + cart.length + ")";
    }

    let auth = document.querySelector(".auth-links");
    let user = localStorage.getItem("user");
    let logged = localStorage.getItem("loggedIn");

    if (auth) {
        if (logged === "true") {
            auth.innerHTML = `Welcome, ${user} | <a href="#" onclick="logout()">Logout</a>`;
        } else {
            auth.innerHTML = `
                <a href="login.html">Login</a>
                <a href="signup.html">Sign Up</a>
            `;
        }
    }
}

/* LOGIN */
function loginUser() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === localStorage.getItem("user") && p === localStorage.getItem("pass")) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid login");
    }
}

/* SIGNUP */
function registerUser() {
    let name = document.getElementById("name").value;
    let pass = document.getElementById("password").value;

    localStorage.setItem("user", name);
    localStorage.setItem("pass", pass);

    alert("Registered successfully!");
    window.location.href = "login.html";
}

/* LOGOUT */
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

/* CART */
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbar();
    alert("Added to cart");
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let box = document.getElementById("cart-items");
    let totalBox = document.getElementById("total-price");

    if (!box || !totalBox) return;

    box.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        box.innerHTML = "<p>No items in cart</p>";
        totalBox.innerText = "";
        return;
    }

    cart.forEach((item, i) => {
        total += item.price;

        let div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-details">
                <span class="cart-name">${item.name}</span>
                <span class="cart-price">OMR ${item.price}</span>
            </div>
            <button onclick="removeItem(${i})">Remove</button>
        `;

        box.appendChild(div);
    });

    totalBox.innerText = "Total: OMR " + total;
}

function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateNavbar();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateNavbar();
}