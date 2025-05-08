document.addEventListener("DOMContentLoaded", function () {
    feather.replace();

    displayOrder();

    document
        .getElementById("confirm-order")
        .addEventListener("click", confirmOrder);
});

function displayOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsContainer = document.getElementById("order-items");
    const summaryItemsContainer = document.getElementById("summary-items");
    const orderTotal = document.getElementById("order-total");
    const summaryTotal = document.getElementById("summary-total");

    if (cart.length === 0) {
        document.querySelector("main").innerHTML = `
        <div class="text-center py-8">
            <p class="text-gray-600 mb-4">Giỏ hàng của bạn đang trống.</p>
            <a href="/products.html" class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md">Tiếp tục mua sắm</a>
        </div>
    `;
        return;
    }

    let total = 0;

    orderItemsContainer.innerHTML = "";
    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const orderItem = document.createElement("div");
        orderItem.className = "flex items-center py-4";
        orderItem.innerHTML = `
        <img src="${item.image}" alt="${
            item.name
        }" class="w-16 h-16 object-cover rounded-md mr-4">
        <div class="flex-1">
            <h3 class="font-medium text-gray-900">${item.name}</h3>
            <p class="text-sm text-gray-600">Màu sắc: ${item.color}</p>
            <p class="text-sm text-gray-600">Kích cỡ: ${item?.size?.toUpperCase()}</p>
            <p class="text-sm text-gray-600">Số lượng: ${item.quantity}</p>
            <p class="text-sm font-medium text-gray-900 mt-1">${formatPrice(
                itemTotal
            )}₫</p>
        </div>
    `;
        orderItemsContainer.appendChild(orderItem);

        const summaryItem = document.createElement("div");
        summaryItem.className = "flex justify-between text-sm text-gray-700";
        summaryItem.innerHTML = `
        <span>${item.name} (${item.quantity} x ${formatPrice(
            item.price
        )}₫)</span>
        <span>${formatPrice(itemTotal)}₫</span>
    `;
        summaryItemsContainer.appendChild(summaryItem);
    });

    orderTotal.textContent = `${formatPrice(total)}₫`;
    summaryTotal.textContent = `${formatPrice(total)}₫`;
}

function confirmOrder() {
    const fullName = document.getElementById("full-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
    ).value;

    let hasError = false;
    if (!fullName) {
        document.getElementById("full-name-error").style.display = "block";
        hasError = true;
    } else {
        document.getElementById("full-name-error").style.display = "none";
    }

    if (!phone || !/^\d{10,11}$/.test(phone)) {
        document.getElementById("phone-error").style.display = "block";
        hasError = true;
    } else {
        document.getElementById("phone-error").style.display = "none";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("email-error").style.display = "block";
        hasError = true;
    } else {
        document.getElementById("email-error").style.display = "none";
    }

    if (!address) {
        document.getElementById("address-error").style.display = "block";
        hasError = true;
    } else {
        document.getElementById("address-error").style.display = "none";
    }

    if (hasError) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    const existingCustomer = customers.find((c) => c.email === email);
    if (!existingCustomer) {
        customers.push({
            name: fullName,
            phone,
            email,
            address,
        });
        localStorage.setItem("customers", JSON.stringify(customers));
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = {
        id: Date.now(),
        customer: fullName,
        items: cart,
        total,
        paymentMethod,
        date: new Date().toISOString(),
        status: "Đã đặt",
    };
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("cart", JSON.stringify([]));

    showToast("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
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
