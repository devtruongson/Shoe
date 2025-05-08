// Khởi tạo Feather Icons
document.addEventListener("DOMContentLoaded", function () {
    feather.replace();

    // Khởi tạo lưu trữ sản phẩm nếu chưa tồn tại
    initializeStorage();

    // Lấy id sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Lấy sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id == productId);

    if (product) {
        // Hiển thị thông tin sản phẩm
        displayProduct(product);

        // Hiển thị sản phẩm liên quan
        displayRelatedProducts(products, product);

        // Lưu sản phẩm hiện tại vào danh sách đã xem
        saveCurrentProduct(product);

        // Hiển thị sản phẩm đã xem gần đây
        displayRecentlyViewed(productId);
    } else {
        document.querySelector("main").innerHTML =
            '<p class="text-center text-gray-600">Sản phẩm không tồn tại.</p>';
    }
});

// Hàm hiển thị thông tin sản phẩm
function displayProduct(product) {
    // Cập nhật breadcrumb
    document.getElementById("categoryLink").textContent = product.category;
    document.getElementById("subcategoryLink").textContent =
        product.subcategory;
    document.getElementById("productNameBreadcrumb").textContent = product.name;

    // Cập nhật tiêu đề và mô tả
    document.title = `Chi tiết sản phẩm - ${product.name}`;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDescription").textContent =
        product.description;

    // Cập nhật nhãn (Mới, Giảm giá)
    document.getElementById("newLabel").textContent = product.isNew
        ? "Mới"
        : "";
    document.getElementById("newLabel").style.display = product.isNew
        ? "inline-block"
        : "none";
    const discountPercent =
        product.onSale && product.salePrice
            ? Math.round(
                  ((product.price - product.salePrice) / product.price) * 100
              )
            : 0;
    document.getElementById("saleLabel").textContent =
        product.onSale && discountPercent ? `-${discountPercent}%` : "";
    document.getElementById("saleLabel").style.display =
        product.onSale && discountPercent ? "inline-block" : "none";

    // Cập nhật giá
    document.getElementById("originalPrice").textContent =
        product.onSale && product.salePrice
            ? formatPrice(product.price) + "₫"
            : "";
    document.getElementById("originalPrice").style.display =
        product.onSale && product.salePrice ? "inline-block" : "none";
    document.getElementById("currentPrice").textContent =
        formatPrice(
            product.onSale && product.salePrice
                ? product.salePrice
                : product.price
        ) + "₫";

    // Cập nhật hình ảnh
    const mainImage = document.getElementById("main-image");
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    const thumbnailsContainer = document.getElementById("thumbnails");
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = image;
        thumbnail.alt = `${product.name} - Góc ${index + 1}`;
        thumbnail.className = `img-thumbnail w-full h-24 object-cover rounded-md cursor-pointer border-2 ${
            index === 0 ? "border-purple-600 active" : "border-transparent"
        }`;
        thumbnail.dataset.src = image;
        thumbnail.addEventListener("click", () => {
            document.querySelectorAll(".img-thumbnail").forEach((thumb) => {
                thumb.classList.remove("active", "border-purple-600");
                thumb.classList.add("border-transparent");
            });
            thumbnail.classList.add("active", "border-purple-600");
            thumbnail.classList.remove("border-transparent");
            mainImage.src = thumbnail.dataset.src;
        });
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Cập nhật màu sắc (giống cách hiển thị kích cỡ)
    let selectedColor = null;
    const colorOptionsContainer = document.getElementById("colorOptions");
    product.colors.forEach((color, index) => {
        const button = document.createElement("button");
        button.className = `color-option w-12 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:border-purple-600 ${
            index === 0 ? "selected" : ""
        }`;
        button.dataset.color = color;
        button.textContent = color;
        button.addEventListener("click", () => {
            document
                .querySelectorAll(".color-option")
                .forEach((opt) => opt.classList.remove("selected"));
            button.classList.add("selected");
            selectedColor = color;
            document.getElementById(
                "selected-color"
            ).textContent = `Màu đã chọn: ${color}`;
        });
        colorOptionsContainer.appendChild(button);
    });
    selectedColor = product.colors[0]; // Mặc định chọn màu đầu tiên
    document.getElementById(
        "selected-color"
    ).textContent = `Màu đã chọn: ${product.colors[0]}`;

    // Cập nhật kích cỡ
    let selectedSize = null;
    const sizeOptionsContainer = document.getElementById("sizeOptions");
    product.sizes.forEach((size) => {
        const button = document.createElement("button");
        button.className =
            "size-option w-12 h-10voz border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:border-purple-600";
        button.dataset.size = size;
        button.textContent = size.toUpperCase();
        button.addEventListener("click", () => {
            document
                .querySelectorAll(".size-option")
                .forEach((opt) => opt.classList.remove("selected"));
            button.classList.add("selected");
            selectedSize = size;
            document.getElementById("size-error").classList.add("hidden");
        });
        sizeOptionsContainer.appendChild(button);
    });

    // Cập nhật số lượng tối đa
    document.getElementById("quantity").max = product.stock;
    document.getElementById(
        "quantity-error"
    ).textContent = `Số lượng phải từ 1 đến ${product.stock}`;

    // Cập nhật thông tin bổ sung
    document.getElementById("materialInfo").textContent = product.material;
    document.getElementById(
        "stockInfo"
    ).textContent = `Còn ${product.stock} sản phẩm`;

    // Cập nhật tab mô tả
    document.getElementById("descriptionTitle").textContent = product.name;
    document.getElementById("descriptionContent").textContent =
        product.description;
    const productFeatures = document.getElementById("productFeatures");
    const features = [
        `Chất liệu: ${product.material}`,
        `Màu sắc: ${product.colors.join(", ")}`,
        `Kích cỡ: ${product.sizes.map((s) => s.toUpperCase()).join(", ")}`,
    ];
    features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        productFeatures.appendChild(li);
    });

    // Cập nhật tab thông số kỹ thuật
    document.getElementById("sku").textContent = product.sku;
    document.getElementById("material").textContent = product.material;
    document.getElementById("colors").textContent = product.colors.join(", ");
    document.getElementById("sizes").textContent = product.sizes
        .map((s) => s.toUpperCase())
        .join(", ");

    // Định nghĩa biến selectedColor và selectedSize để sử dụng trong các hàm thêm giỏ hàng
    window.selectedColor = selectedColor;
    window.selectedSize = selectedSize;

    // Thêm sự kiện cho các nút kích cỡ để cập nhật selectedSize
    document.querySelectorAll(".size-option").forEach((option) => {
        option.addEventListener("click", () => {
            document
                .querySelectorAll(".size-option")
                .forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            window.selectedSize = option.getAttribute("data-size");
            document.getElementById("size-error").classList.add("hidden");
        });
    });

    // Thêm sự kiện cho các nút màu sắc để cập nhật selectedColor
    document.querySelectorAll(".color-option").forEach((option) => {
        option.addEventListener("click", () => {
            document
                .querySelectorAll(".color-option")
                .forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            window.selectedColor = option.getAttribute("data-color");
            document.getElementById(
                "selected-color"
            ).textContent = `Màu đã chọn: ${window.selectedColor}`;
        });
    });
}

// Hàm hiển thị sản phẩm liên quan
function displayRelatedProducts(products, currentProduct) {
    const relatedProductsContainer = document.getElementById("relatedProducts");
    const relatedProducts = products
        .filter(
            (p) =>
                p.category === currentProduct.category &&
                p.id !== currentProduct.id
        )
        .slice(0, 4);

    if (relatedProducts.length === 0) {
        relatedProductsContainer.parentElement.style.display = "none";
        return;
    }

    relatedProducts.forEach((product) => {
        const discountPercent =
            product.onSale && product.salePrice
                ? Math.round(
                      ((product.price - product.salePrice) / product.price) *
                          100
                  )
                : 0;
        const productCard = document.createElement("div");
        productCard.className = "bg-white rounded-lg shadow-sm overflow-hidden";
        productCard.innerHTML = `
        <div class="relative">
            <img src="${product.images[0]}" alt="${
            product.name
        }" class="w-full h-48 md:h-64 object-cover">
            ${
                product.isNew
                    ? `<div class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Mới</div>`
                    : ""
            }
            ${
                discountPercent
                    ? `<div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-${discountPercent}%</div>`
                    : ""
            }
        </div>
        <div class="p-4" onClick="handleDetailProduct(${product.id})">
            <h3 class="font-medium mb-1 text-gray-900">${product.name}</h3>
            <div class="flex items-center mb-1">
                <div class="flex text-yellow-400">
                    ${getRatingStars(0)}
                </div>
                <span class="text-xs text-gray-500 ml-1">(0)</span>
            </div>
            <div class="flex items-center">
                ${
                    product.onSale && product.salePrice
                        ? `<span class="text-gray-400 line-through text-sm mr-2">${formatPrice(
                              product.price
                          )}₫</span>`
                        : ""
                }
                <span class="font-bold">${formatPrice(
                    product.onSale && product.salePrice
                        ? product.salePrice
                        : product.price
                )}₫</span>
            </div>
        </div>
    `;
        relatedProductsContainer.appendChild(productCard);
    });
}

function handleDetailProduct(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

// Chức năng chuyển tab
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");
        tabButtons.forEach((btn) => {
            btn.classList.remove(
                "active",
                "border-purple-600",
                "text-purple-600"
            );
            btn.classList.add("border-transparent", "text-gray-500");
        });
        tabContents.forEach((content) => {
            content.classList.add("hidden");
        });
        button.classList.add("active", "border-purple-600", "text-purple-600");
        button.classList.remove("border-transparent", "text-gray-500");
        document.getElementById(tabId).classList.remove("hidden");
    });
});

// Chức năng điều chỉnh số lượng
const quantityInput = document.getElementById("quantity");
const decreaseBtn = document.getElementById("decrease-quantity");
const increaseBtn = document.getElementById("increase-quantity");
const quantityError = document.getElementById("quantity-error");

decreaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        quantityError.classList.add("hidden");
    }
});

increaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
        quantityError.classList.add("hidden");
    } else {
        quantityError.classList.remove("hidden");
    }
});

quantityInput.addEventListener("change", () => {
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    if (currentValue < 1) {
        quantityInput.value = 1;
    } else if (currentValue > maxValue) {
        quantityInput.value = maxValue;
        quantityError.classList.remove("hidden");
    } else {
        quantityError.classList.add("hidden");
    }
});

// Chức năng thêm vào giỏ hàng
const addToCartBtn = document.getElementById("add-to-cart");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
const sizeError = document.getElementById("size-error");

addToCartBtn.addEventListener("click", () => {
    if (!window.selectedSize) {
        sizeError.classList.remove("hidden");
        return;
    }

    const productId = new URLSearchParams(window.location.search).get("id");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id == productId);

    const cartProduct = {
        id: product.id,
        name: product.name,
        price:
            product.onSale && product.salePrice
                ? product.salePrice
                : product.price,
        color: window.selectedColor,
        size: window.selectedSize,
        quantity: parseInt(quantityInput.value),
        image: product.images[0],
    };

    addToCartDetail(cartProduct);
    toastMessage.textContent = "Sản phẩm đã được thêm vào giỏ hàng";
    showToast();
});

// Chức năng mua ngay
/*
const buyNowBtn = document.getElementById("buy-now");

buyNowBtn.addEventListener("click", () => {
    if (!window.selectedSize) {
        sizeError.classList.remove("hidden");
        return;
    }

    const productId = new URLSearchParams(
        window.location.search
    ).get("id");
    const products =
        JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id == productId);

    const cartProduct = {
        id: product.id,
        name: product.name,
        price:
            product.onSale && product.salePrice
                ? product.salePrice
                : product.price,
        color: window.selectedColor,
        size: window.selectedSize,
        quantity: parseInt(quantityInput.value),
        image: product.images[0],
    };

    addToCartDe(cartProduct);
    toastMessage.textContent = "Chuyển đến trang thanh toán";
    showToast();
});
*/

// Hiển thị thông báo
function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Chức năng lưu trữ sản phẩm
function initializeStorage() {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    if (!localStorage.getItem("recentlyViewed")) {
        localStorage.setItem("recentlyViewed", JSON.stringify([]));
    }

    // Đảm bảo sản phẩm được lưu vào localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productExists = products.some((p) => p.id === 1744899474067);
}

// Thêm sản phẩm vào giỏ hàng
function addToCartDetail(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
        (item) =>
            item.id === product.id &&
            item.color === product.color &&
            item.size === product.size
    );

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Lưu sản phẩm hiện tại vào danh sách đã xem
function saveCurrentProduct(product) {
    const currentProduct = {
        id: product.id,
        name: product.name,
        price:
            product.onSale && product.salePrice
                ? product.salePrice
                : product.price,
        originalPrice: product.onSale ? product.price : null,
        discount:
            product.onSale && product.salePrice
                ? Math.round(
                      ((product.price - product.salePrice) / product.price) *
                          100
                  )
                : 0,
        image: product.images[0],
        rating: 0,
        reviewCount: 0,
    };

    let recentlyViewed =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const existingProductIndex = recentlyViewed.findIndex(
        (item) => item.id === currentProduct.id
    );

    if (existingProductIndex !== -1) {
        recentlyViewed.splice(existingProductIndex, 1);
    }

    recentlyViewed.unshift(currentProduct);
    if (recentlyViewed.length > 8) {
        recentlyViewed = recentlyViewed.slice(0, 8);
    }

    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
}

// Hiển thị sản phẩm đã xem gần đây
function displayRecentlyViewed(currentProductId) {
    const recentlyViewed =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const container = document.getElementById("recently-viewed-container");
    const filteredProducts = recentlyViewed.filter(
        (product) => product.id != currentProductId
    );

    if (filteredProducts.length === 0) {
        container.parentElement.style.display = "none";
        return;
    }

    filteredProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className =
            "bg-white rounded-lg shadow-sm overflow-hidden";
        productElement.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${
            product.name
        }" class="w-full h-48 md:h-64 object-cover">
            ${
                product.discount
                    ? `<div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-${product.discount}%</div>`
                    : ""
            }
        </div>
        <div class="p-4">
            <h3 class="font-medium mb-1 text-gray-900">${product.name}</h3>
            <div class="flex items-center mb-1">
                <div class="flex text-yellow-400">
                    ${getRatingStars(product.rating)}
                </div>
                <span class="text-xs text-gray-500 ml-1">(${
                    product.reviewCount
                })</span>
            </div>
            <div class="flex items-center">
                ${
                    product.originalPrice
                        ? `<span class="text-gray-400 line-through text-sm mr-2">${formatPrice(
                              product.originalPrice
                          )}₫</span>`
                        : ""
                }
                <span class="font-bold">${formatPrice(product.price)}₫</span>
            </div>
        </div>
    `;
        container.appendChild(productElement);
    });
}

// Tạo HTML cho đánh giá sao
function getRatingStars(rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<i data-feather="star" class="w-4 h-4 ${
            i <= rating ? "fill-current" : ""
        }"></i>`;
    }
    return starsHTML;
}

// Định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
