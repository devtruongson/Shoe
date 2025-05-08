feather.replace();

const products = JSON.parse(localStorage.getItem("products")) || [];

const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
});
closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
});

const renderProduct = (product, container) => {
    const productCard = document.createElement("div");
    productCard.className =
        "relative bg-white rounded-lg shadow-md overflow-hidden";
    productCard.innerHTML = `
                <img src="${
                    product.images && product.images[0]
                        ? product.images[0]
                        : "https://via.placeholder.com/300"
                }" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold line-clamp-2">${
                        product.name
                    }</h3>
                    <p class="text-sm text-[#666] font-[400] line-clamp-2">${
                        product.description
                    }</h3>
                    <div class="flex items-center mt-2">
                        <p class="text-purple-600 font-bold">${formatCurrency(
                            product.onSale ? product.salePrice : product.price
                        )}</p>
                        ${
                            product.onSale
                                ? `<p class="text-gray-500 line-through ml-2">${formatCurrency(
                                      product.price
                                  )}</p>`
                                : ""
                        }
                    </div>
                    <div class="mt-4 flex space-x-2 justify-between">
                        <button class="bg-purple-600 text-white px-3 py-1 rounded text-sm w-[49%]" onclick="viewProductDetail(${
                            product.id
                        })">Xem chi tiết</button>
                        <button class="bg-green-600 text-white px-3 py-1 rounded text-sm  w-[49%]" onclick="addToCart(${
                            product.id
                        })">Thêm vào giỏ</button>
                    </div>
                </div>
            `;
    container.appendChild(productCard);
};

function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
}

const productListContainer = document.getElementById("productList");
products.forEach((product) => renderProduct(product, productListContainer));

window.viewProductDetail = function (id) {
    const product = products.find((p) => p.id === id);
    if (product) {
        window.location.href = `product-detail.html?id=${id}`;
    } else {
        alert("Sản phẩm không tồn tại!");
    }
};
