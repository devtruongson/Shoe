document.addEventListener("DOMContentLoaded", function () {
    feather.replace();
    displayCart();
});

function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartSummary = document.getElementById("cart-summary");
    const cartTotal = document.getElementById("cart-total");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.classList.add("hidden");
        cartSummary.classList.add("hidden");
        emptyCartMessage.classList.remove("hidden");
        document.getElementById("clear-cart").classList.add("hidden");
        return;
    }

    cartItemsContainer.classList.remove("hidden");
    cartSummary.classList.remove("hidden");
    emptyCartMessage.classList.add("hidden");
    document.getElementById("clear-cart").classList.remove("hidden");
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className =
            "cart-item flex flex-col md:flex-row items-center py-4";
        cartItem.innerHTML = `
            <div class="flex items-center w-full md:w-2/3">
                <img src="${item?.image}" alt="${
            item.name
        }" class="w-24 h-24 object-cover rounded-md mr-4">
                <div class="flex-1">
                    <h3 class="font-medium text-gray-900">${item.name}</h3>
                    <p class="text-sm text-gray-600">Màu sắc: ${item.color}</p>
                    <p class="text-sm text-gray-600">Kích cỡ: ${item?.size?.toUpperCase()}</p>
                    <p class="text-sm font-medium text-gray-900 mt-1">${formatPrice(
                        item.price
                    )}₫</p>
                </div>
            </div>
            <div class="flex items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
                <div class="flex items-center">
                    <button class="decrease-quantity px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200" data-index="${index}">
                        Giảm
                    </button>
                    <input type="number" style="height: 42px;" class="quantity-input border-t border-b border-gray-300 text-center focus:outline-none focus:ring-purple-600 focus:border-purple-600" value="${
                        item.quantity
                    }" min="1" data-index="${index}">
                    <button class="increase-quantity px-3 py-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200" data-index="${index}">
                       Tăng
                    </button>
                </div>
                <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-900 mr-4">${formatPrice(
                        itemTotal
                    )}₫</span>
                    <button class="remove-item text-red-600 hover:text-red-700" data-index="${index}">
                        <i data-feather="trash-2" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `${formatPrice(total)}₫`;

    // Gắn sự kiện cho các nút tăng/giảm số lượng
    document.querySelectorAll(".increase-quantity").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            updateQuantity(index, 1);
        });
    });

    document.querySelectorAll(".decrease-quantity").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            updateQuantity(index, -1);
        });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", () => {
            const index = input.getAttribute("data-index");
            const newQuantity = parseInt(input.value);
            if (newQuantity < 1) {
                input.value = 1;
                updateQuantity(index, 0, 1);
            } else {
                updateQuantity(index, 0, newQuantity);
            }
        });
    });

    // Gắn sự kiện cho nút xóa sản phẩm
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            removeItem(index);
        });
    });

    // Gắn sự kiện cho nút xóa toàn bộ giỏ hàng
    document.getElementById("clear-cart").addEventListener("click", clearCart);

    // Gắn sự kiện cho nút thanh toán
    document.getElementById("checkout-button").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
}

function updateQuantity(index, change, newQuantity = null) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart[index];
    if (newQuantity !== null) {
        item.quantity = newQuantity;
    } else {
        item.quantity = Math.max(1, item.quantity + change);
    }
    cart[index] = item;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    showToast("Đã cập nhật số lượng sản phẩm");
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    showToast(`Đã xóa sản phẩm "${removedItem.name}" khỏi giỏ hàng`);
}

function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    displayCart();
    showToast("Đã xóa toàn bộ giỏ hàng");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
