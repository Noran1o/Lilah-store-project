/* ======================================================
   0) Small helpers used everywhere
   ====================================================== */
const toastContainer = document.getElementById("toastContainer");

// Shows a small message at the bottom of the screen (Bootstrap Toast)
function showToast(message) {
    const toastEl = document.createElement("div");
    toastEl.className = "toast lilah-toast align-items-center border-0";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    toastEl.setAttribute("aria-atomic", "true");

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    toastEl.querySelector(".toast-body").textContent = message;   // textContent = safe

    toastContainer.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl, { delay: 2600 });
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
    toast.show();
}

// Updates a little number badge (hides it when the number is 0)
function updateBadge(badgeEl, number) {
    badgeEl.textContent = number;
    badgeEl.classList.toggle("d-none", number === 0);
}


/* ======================================================
   1) Navbar
   - shadow when you scroll
   - close the mobile menu after clicking a link
   (the highlighted link is done by Bootstrap Scrollspy,
    see data-bs-spy on the <body>)
   ====================================================== */
const siteNav = document.getElementById("siteNav");
const mainNav = document.getElementById("mainNav");

function closeMobileMenu() {
    if (mainNav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(mainNav, { toggle: false }).hide();
    }
}

mainNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});


/* ======================================================
   2) Scroll: navbar shadow + back to top button
   ====================================================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    siteNav.classList.toggle("scrolled", y > 10);
    backToTop.classList.toggle("d-none", y <= 300);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ======================================================
   3) Dark mode
   The theme is already set in <head> before the page draws.
   Here we only change it when the button is clicked.
   The icon (moon or sun) is switched by CSS.
   ====================================================== */
const darkModeBtn = document.getElementById("darkModeBtn");
const htmlEl = document.documentElement;

darkModeBtn.setAttribute("aria-pressed", htmlEl.getAttribute("data-bs-theme") === "dark");

darkModeBtn.addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-bs-theme", next);
    darkModeBtn.setAttribute("aria-pressed", next === "dark");
    try {
        localStorage.setItem("lilah-theme", next);
    } catch (e) { /* ignore */ }
});


/* ======================================================
   4) Shop: filter + sort + search + load more
   The products come from products.js
   ====================================================== */
const productsContainer = document.getElementById("productsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const resultCount = document.getElementById("resultCount");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const chips = document.querySelectorAll(".filter-chip");
const shopSection = document.getElementById("shop");

const FIRST_PAGE = 8;   // products shown at first
const STEP = 8;         // more products on every "Load more"

/* The page "state": what the visitor is looking at right now.
   Every button changes one of these, then calls render(). */
let currentCategory = "all";   // all, women, bags, dresses, shoes, or wishlist
let searchText = "";
let sortOrder = "default";
let visibleCount = FIRST_PAGE;

// Wishlist: saved product ids (kept after refresh)
let wishlist = [];
try {
    wishlist = JSON.parse(localStorage.getItem("lilah-wishlist")) || [];
} catch (e) {
    wishlist = [];
}
const wishlistCount = document.getElementById("wishlistCount");
updateBadge(wishlistCount, wishlist.length);


// Returns the products that match category + search, in the chosen order
function getFilteredProducts() {
    let list = products.filter((p) => {
        let matchCategory;
        if (currentCategory === "all") {
            matchCategory = true;
        } else if (currentCategory === "wishlist") {
            matchCategory = wishlist.includes(p.id);
        } else {
            matchCategory = p.category === currentCategory;
        }
        const matchSearch = p.name.toLowerCase().includes(searchText);
        return matchCategory && matchSearch;
    });

    if (sortOrder === "low") {
        list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
        list.sort((a, b) => b.price - a.price);
    }

    return list;
}


// Builds the HTML of ONE product card
function createCard(p) {
    const liked = wishlist.includes(p.id);

    return `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card product border-0 bg-transparent">
                <div class="product-img-wrap img-zoom rounded">
                    ${p.badge ? `<span class="product-badge ${p.badge === "Sale" ? "sale" : ""}">${p.badge}</span>` : ""}
                    <button class="wish-btn ${liked ? "active" : ""}" data-id="${p.id}" aria-label="Add to wishlist">
                        ${liked ? "♥" : "♡"}
                    </button>
                    <img src="${p.img}" class="card-img-top" alt="${p.name}"
                         style="object-position: ${p.pos || "center"}" loading="lazy">
                </div>
                <div class="card-body text-center px-0">
                    <h3 class="h5 card-title">${p.name}</h3>
                    <p class="card-text">
                        ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ""}
                        $${p.price.toFixed(2)}
                    </p>
                    <button class="btn btn-lilah-dark w-100 add-btn" data-id="${p.id}">Add to cart</button>
                </div>
            </div>
        </div>
    `;
}


// Marks the right chip as active (none is active in wishlist view)
function updateChips() {
    chips.forEach((chip) => {
        chip.classList.toggle("active", chip.dataset.category === currentCategory);
    });
}


// Draws the page: the ONLY function that changes the product list
function render() {
    const list = getFilteredProducts();
    const visible = list.slice(0, visibleCount);

    if (list.length === 0) {
        const message = currentCategory === "wishlist" && searchText === ""
            ? "Your wishlist is empty. Tap the heart on any product to save it."
            : "No products found.";
        productsContainer.innerHTML = `<p class="text-center py-4">${message}</p>`;
    } else {
        productsContainer.innerHTML = visible.map(createCard).join("");
    }

    resultCount.textContent = list.length === 0
        ? ""
        : `Showing ${visible.length} of ${list.length}`;

    // Hide "Load more" when everything is already visible
    loadMoreBtn.classList.toggle("d-none", visibleCount >= list.length);
}


function scrollToShop() {
    shopSection.scrollIntoView({ behavior: "smooth" });
}

// Changes the category (used by chips, category cards, footer links, wishlist)
function setCategory(category) {
    currentCategory = category;
    searchText = "";
    searchInput.value = "";
    visibleCount = FIRST_PAGE;
    updateChips();
    render();
}


/* ---------- Chips ---------- */
chips.forEach((chip) => {
    chip.addEventListener("click", () => setCategory(chip.dataset.category));
});

/* ---------- Category cards + footer links (any <a> with data-category) ---------- */
document.querySelectorAll("a[data-category]").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        setCategory(link.dataset.category);
        scrollToShop();
    });
});

/* ---------- Navbar "Collection" dropdown (buttons with data-nav-category) ---------- */
document.querySelectorAll("[data-nav-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
        setCategory(btn.dataset.navCategory);
        closeMobileMenu();
        scrollToShop();

        // hide the hover menu until the mouse leaves and comes back
        btn.closest(".has-submenu").classList.add("submenu-off");
        btn.blur();
    });
});

document.querySelectorAll(".has-submenu").forEach((item) => {
    item.addEventListener("mouseleave", () => item.classList.remove("submenu-off"));
});

/* ---------- Sort ---------- */
sortSelect.addEventListener("change", () => {
    sortOrder = sortSelect.value;
    visibleCount = FIRST_PAGE;
    render();
});

/* ---------- Load more ---------- */
loadMoreBtn.addEventListener("click", () => {
    visibleCount += STEP;
    render();
});

/* ---------- Search (results update while typing, Enter scrolls to them) ---------- */
searchInput.addEventListener("input", () => {
    searchText = searchInput.value.toLowerCase().trim();
    currentCategory = "all";
    visibleCount = FIRST_PAGE;
    updateChips();
    render();
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();        // stop the page from reloading
    closeMobileMenu();
    scrollToShop();
});


/* ======================================================
   5) Wishlist
   ====================================================== */
function saveWishlist() {
    try {
        localStorage.setItem("lilah-wishlist", JSON.stringify(wishlist));
    } catch (e) { /* ignore */ }
    updateBadge(wishlistCount, wishlist.length);
}

function toggleWishlist(id, heartBtn) {
    const product = products.find((p) => p.id === id);

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter((x) => x !== id);
        showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(id);
        showToast(`${product.name} saved to wishlist`);
    }
    saveWishlist();

    if (currentCategory === "wishlist") {
        render();   // the product should disappear from the wishlist view
    } else {
        heartBtn.classList.toggle("active", wishlist.includes(id));
        heartBtn.textContent = wishlist.includes(id) ? "♥" : "♡";
    }
}

// The heart icon in the navbar shows only the saved products
document.getElementById("wishlistBtn").addEventListener("click", () => {
    setCategory("wishlist");
    closeMobileMenu();
    scrollToShop();
});


/* ======================================================
   6) Cart (Bootstrap Offcanvas)
   cart = { productId: quantity }  saved in localStorage
   ====================================================== */
const cartItemsEl = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const cartTotalEl = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

let cart = {};
try {
    cart = JSON.parse(localStorage.getItem("lilah-cart")) || {};
} catch (e) {
    cart = {};
}

function saveCart() {
    try {
        localStorage.setItem("lilah-cart", JSON.stringify(cart));
    } catch (e) { /* ignore */ }
}

// Turns the cart object into a list of { product, qty }
function getCartLines() {
    return Object.keys(cart)
        .map((id) => {
            const product = products.find((p) => p.id === Number(id));
            return product ? { product: product, qty: cart[id] } : null;
        })
        .filter(Boolean);
}

// Draws the inside of the cart and updates the numbers
function renderCart() {
    const lines = getCartLines();
    const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
    const totalPrice = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);

    updateBadge(cartCount, totalQty);
    cartFooter.classList.toggle("d-none", lines.length === 0);

    if (lines.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="text-center py-5">
                <p class="fs-5 mb-1">Your cart is empty</p>
                <p class="text-body-secondary small mb-4">Add something you love and it will show up here.</p>
                <button type="button" class="btn btn-lilah-sand" data-bs-dismiss="offcanvas">CONTINUE SHOPPING</button>
            </div>
        `;
        return;
    }

    cartItemsEl.innerHTML = lines.map((l) => {
        const p = l.product;
        return `
            <div class="cart-item d-flex gap-3 py-3 border-bottom" data-id="${p.id}">
                <img src="${p.img}" alt="${p.name}" class="cart-thumb"
                     style="object-position: ${p.pos || "center"}">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between gap-2">
                        <h4 class="h6 mb-1">${p.name}</h4>
                        <button type="button" class="btn-close" data-action="remove" aria-label="Remove ${p.name}"></button>
                    </div>
                    <p class="small text-body-secondary mb-2">$${p.price.toFixed(2)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="qty-control">
                            <button type="button" data-action="minus" aria-label="Decrease quantity">−</button>
                            <span>${l.qty}</span>
                            <button type="button" data-action="plus" aria-label="Increase quantity">+</button>
                        </div>
                        <strong>$${(p.price * l.qty).toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
}

// + / - / remove buttons inside the cart (one listener for all rows)
cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const id = btn.closest(".cart-item").dataset.id;
    const action = btn.dataset.action;

    if (action === "plus") {
        cart[id]++;
    } else if (action === "minus") {
        cart[id]--;
        if (cart[id] <= 0) delete cart[id];
    } else if (action === "remove") {
        delete cart[id];
    }

    saveCart();
    renderCart();
});

document.getElementById("clearCartBtn").addEventListener("click", () => {
    cart = {};
    saveCart();
    renderCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    showToast("This is a demo store, checkout is coming soon.");
});


/* ---------- Heart and Add to cart buttons on the product cards ---------- */
productsContainer.addEventListener("click", (e) => {
    const wishBtn = e.target.closest(".wish-btn");
    const addBtn = e.target.closest(".add-btn");

    if (wishBtn) {
        toggleWishlist(Number(wishBtn.dataset.id), wishBtn);
    }

    if (addBtn) {
        const id = Number(addBtn.dataset.id);
        const product = products.find((p) => p.id === id);

        addToCart(id);
        showToast(`${product.name} added to cart`);

        addBtn.textContent = "Added ✓";
        setTimeout(() => { addBtn.textContent = "Add to cart"; }, 1000);
    }
});


/* ======================================================
   7) Lookbook gallery (Bootstrap Modal + Carousel)
   Clicking a picture opens the gallery on that picture.
   ====================================================== */
const lookbookModalEl = document.getElementById("lookbookModal");
const lookbookModal = new bootstrap.Modal(lookbookModalEl);
const lookbookSlides = lookbookModalEl.querySelectorAll(".carousel-item");
const lookbookDots = lookbookModalEl.querySelectorAll(".carousel-indicators button");

function openLookbook(index) {
    lookbookSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    lookbookDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        if (i === index) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
    lookbookModal.show();
}

document.querySelectorAll("[data-lookbook]").forEach((el) => {
    el.addEventListener("click", () => openLookbook(Number(el.dataset.lookbook)));
});


/* ======================================================
   8) Newsletter (Bootstrap form validation + Toast)
   ====================================================== */
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();   // never reload the page

    if (!newsletterForm.checkValidity()) {
        newsletterForm.classList.add("was-validated");   // shows the red message
        return;
    }

    showToast("Thanks for subscribing! Check your inbox soon.");
    newsletterForm.reset();
    newsletterForm.classList.remove("was-validated");
});


/* ======================================================
   9) Links that do not have a page yet
   (any link with the data-soon attribute)
   ====================================================== */
document.querySelectorAll("[data-soon]").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("This page is coming soon.");
    });
});


/* ======================================================
   First draw when the page loads
   ====================================================== */
render();
renderCart();
