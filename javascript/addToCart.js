let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
}

window.addToCart = function (id) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id === id);
    if (product) {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price:
                    product.onSale && product.salePrice
                        ? product.salePrice
                        : product.price,
                color: product.colors[0],
                size: product.sizes[0],
                quantity: 1,
                image: product.images[0],
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Đã thêm vào giỏ hàng!");
    }
};

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;
}

document.getElementById("cartBtn")?.addEventListener("click", (e) => {
    window.location.href = "cart.html";
});
updateCartCount();
