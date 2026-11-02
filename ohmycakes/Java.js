

// Create an empty shopping cart
let cart = [];

// Wait until the HTML has loaded
document.addEventListener("DOMContentLoaded", function() {

    // ADD CAKES TO CART
    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach(button => {

        button.addEventListener("click", function(event) {

            event.preventDefault();

            let cakeName = this.dataset.name;
            let cakePrice = Number(this.dataset.price);

            cart.push({
                name: cakeName,
                price: cakePrice
            });

            displayCart();

            alert(cakeName + " added to cart!");

        });

    });


    // ORDER NOW BUTTON
    const orderButton = document.getElementById("orderNow");

    if (orderButton) {
        orderButton.addEventListener("click", function() {
            window.location.href = "our cakes.html";
        });
    }


    // CAKE CATEGORIES
    const categoryButtons = document.querySelectorAll(".category-btn");
    const products = document.querySelectorAll(".cake-item");

    categoryButtons.forEach(button => {

        button.addEventListener("click", function() {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const selectedCategory = this.dataset.category;

            products.forEach(product => {

                if (
                    selectedCategory === "all" ||
                    product.dataset.category === selectedCategory
                ) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }

            });

        });

    });

    // Display the empty cart when page loads
    displayCart();

});


// DISPLAY SHOPPING CART
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal) return;

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is empty.";

    }

    cart.forEach(cake => {

        let li = document.createElement("li");

        li.textContent = cake.name + " - R" + cake.price.toFixed(2);

        cartItems.appendChild(li);

        total += cake.price;

    });

    cartTotal.textContent = total.toFixed(2);

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}


// OPEN AND CLOSE SHOPPING CART
function toggleCart() {

    document.getElementById("cartDropdown")
        .classList.toggle("active");

}


// CLEAR SHOPPING CART
function clearCart() {

    cart = [];

    displayCart();

}
 // FAQ ACCORDION

document.querySelectorAll(".accordion-btn").forEach(button => {

    button.addEventListener("click", function() {

        let content = this.nextElementSibling;

        content.classList.toggle("show");

        let symbol = this.querySelector("span");

        symbol.textContent =
            content.classList.contains("show") ? "-" : "+";

    });

});

// CAKE DETAILS AND QUANTITY POPUP

let selectedCake = {};
let selectedQuantity = 1;

const cakeModal = document.getElementById("cakeModal");

// Open popup when Add to Cart is clicked

document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", function() {

        selectedCake = {
            name: this.dataset.name,
            price: Number(this.dataset.price),
            image: this.dataset.image,
            description: this.dataset.description
        };

        selectedQuantity = 1;

        document.getElementById("modalCakeName").textContent =
            selectedCake.name;

        document.getElementById("modalCakeImage").src =
            selectedCake.image;

        document.getElementById("modalCakeDescription").textContent =
            selectedCake.description;

        document.getElementById("modalCakePrice").textContent =
            "Price: R" + selectedCake.price;

        document.getElementById("cakeQuantity").value = 1;

        cakeModal.classList.add("show");;

    });

});

// Increase quantity

document.getElementById("increaseQty").addEventListener("click", function() {

    selectedQuantity++;

    document.getElementById("cakeQuantity").value =
        selectedQuantity;

});

// Decrease quantity

document.getElementById("decreaseQty").addEventListener("click", function() {

    if (selectedQuantity > 1) {

        selectedQuantity--;

        document.getElementById("cakeQuantity").value =
            selectedQuantity;

    }

});

// Allow customers to type quantity

document.getElementById("cakeQuantity").addEventListener("change", function() {

    selectedQuantity = Math.max(1, parseInt(this.value) || 1);

    this.value = selectedQuantity;

});

// Confirm adding cake to cart

document.getElementById("confirmAddToCart").addEventListener("click", function() {

    let quantity = selectedQuantity;

    cart.push({
        name: selectedCake.name,
        price: selectedCake.price,
        quantity: quantity
    });

    displayCart();

   

    alert(quantity + " x " + selectedCake.name + " added to cart!");

});
let total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
}, 0);

// Close popup

document.querySelector(".close-modal").addEventListener("click", function() {

   cakeModal.classList.remove("show"); 

});

// Close popup when clicking outside

cakeModal.addEventListener("click", function(event) {

    if (event.target === cakeModal) {
        cakeModal.classList.remove("show");
    }

});
// ENQUIRY FORM SUBMISSION

document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you for contacting Oh My Cake! Your enquiry has been sent successfully.");

            enquiryForm.reset();

        });

    }

});
// CAKE IMAGE LIGHTBOX

document.addEventListener("DOMContentLoaded", function () {

    const cakeImages = document.querySelectorAll(".cake.card img");

    const lightbox = document.getElementById("imageLightbox");
    const expandedImage = document.getElementById("expandedImage");
    const imageCaption = document.getElementById("imageCaption");
    const closeLightbox = document.getElementById("closeLightbox");

    // Check if all elements exist
    if (!lightbox || !expandedImage || !closeLightbox) {
        console.error("Lightbox elements are missing from HTML.");
        return;
    }

    // Open larger image
    cakeImages.forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {

            expandedImage.src = this.src;
            expandedImage.alt = this.alt;

            if (imageCaption) {
                imageCaption.textContent = this.alt;
            }

            lightbox.classList.add("active");

        });

    });

    // Close button
    closeLightbox.addEventListener("click", function () {

        lightbox.classList.remove("active");

    });

    // Close when clicking outside image
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        }

    });

    // Close using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            lightbox.classList.remove("active");
        }

    });

});
   // ENQUIRY FORM SUBMISSION

document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.querySelector(".message-form");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you for contacting Oh My Cake! Your enquiry has been sent successfully.");

            enquiryForm.reset();

        });

    }

});