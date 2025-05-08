// Dữ liệu danh mục
const cateData = JSON.parse(localStorage.getItem("categories")) || [];

// Dữ liệu sản phẩm
const productData = JSON.parse(localStorage.getItem("products")) || [];

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + "₫";
}

// Lấy ID danh mục từ URL
function getCategoryIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Hiển thị sản phẩm
function displayProducts(categoryId) {
    const productsContainer = document.getElementById("products-container");
    const loadingIndicator = document.getElementById("loading");
    const categoryTitle = document.getElementById("category-title");
    const categoryBreadcrumb = document.getElementById("category-breadcrumb");

    // Tìm danh mục tương ứng
    const category = cateData.find((cat) => cat.id.toString() === categoryId);

    if (!category) {
        categoryTitle.innerText = "Danh mục không tồn tại";
        categoryBreadcrumb.innerText = "Không tìm thấy";
        productsContainer.innerHTML = "<p>Không tìm thấy danh mục này.</p>";
        if (loadingIndicator) loadingIndicator.style.display = "none";
        return;
    }

    // Cập nhật tiêu đề và breadcrumb
    categoryTitle.innerText = category.name;
    categoryBreadcrumb.innerText = `${category.name}`;

    // Lọc sản phẩm theo danh mục
    const filteredProducts = productData.filter(
        (product) => product.category === category.name
    );

    // Hiển thị thông báo nếu không có sản phẩm nào
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML =
            '<p class="col-span-full text-center py-10">Không có sản phẩm nào trong danh mục này.</p>';
        if (loadingIndicator) loadingIndicator.style.display = "none";
        return;
    }

    // Xử lý sắp xếp sản phẩm
    const sortSelect = document.getElementById("sort-select");
    let sortedProducts = [...filteredProducts];

    // Hàm sắp xếp sản phẩm
    function sortProducts() {
        const sortValue = sortSelect.value;

        switch (sortValue) {
            case "price-asc":
                sortedProducts.sort(
                    (a, b) =>
                        (a.salePrice || a.price) - (b.salePrice || b.price)
                );
                break;
            case "price-desc":
                sortedProducts.sort(
                    (a, b) =>
                        (b.salePrice || b.price) - (a.salePrice || a.price)
                );
                break;
            case "name-asc":
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Mặc định không sắp xếp
                sortedProducts = [...filteredProducts];
        }

        renderProducts(sortedProducts);
    }

    // Thêm event listener cho select box sắp xếp
    sortSelect.addEventListener("change", sortProducts);

    // Hàm render sản phẩm
    function renderProducts(products) {
        // Xóa loading indicator
        if (loadingIndicator) loadingIndicator.style.display = "none";

        // Tạo HTML cho sản phẩm
        let productsHTML = "";

        products.forEach((product) => {
            const price = product.salePrice || product.price;
            const originalPrice = product.salePrice ? product.price : null;
            const image =
                product.images && product.images.length > 0
                    ? product.images[0]
                    : "/api/placeholder/400/320";

            productsHTML += `
                <div class="bg-white rounded-lg shadow-sm overflow-hidden product-card">
                    <div class="relative">
                        <img src="${image}" alt="${
                product.name
            }" class="w-full product-image">
                        ${
                            product.onSale
                                ? '<span class="sale-badge bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>'
                                : ""
                        }
                        ${
                            product.isNew
                                ? '<span class="new-badge bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>'
                                : ""
                        }
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${
                            product.name.length > 50
                                ? product.name.substring(0, 50) + "..."
                                : product.name
                        }</h3>
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <span class="text-red-600 font-bold">${formatCurrency(
                                    price
                                )}</span>
                                ${
                                    originalPrice
                                        ? `<span class="text-gray-500 line-through text-sm ml-2">${formatCurrency(
                                              originalPrice
                                          )}</span>`
                                        : ""
                                }
                            </div>
                            ${
                                product.isBestSeller
                                    ? '<div class="flex items-center"><span class="text-yellow-400">★★★★</span><span class="text-gray-300">★</span></div>'
                                    : ""
                            }
                        </div>
                        <div class="flex justify-between mt-4">
                            <button class="bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 px-4 rounded-md text-sm transition-colors" 
                                    onclick="viewProductDetail(${product.id})">
                                Xem chi tiết
                            </button>
                            <button class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                                    onclick="addToCart(${product.id})">
                                <i data-feather="shopping-cart" class="w-4 h-4 inline-block"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        productsContainer.innerHTML = productsHTML;

        // Cập nhật lại các icon Feather
        feather.replace();
    }

    // Ban đầu render sản phẩm mà không cần sắp xếp
    renderProducts(sortedProducts);
}

// Hàm xem chi tiết sản phẩm
function viewProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        cart[existingProductIndex].quantity += 1;
    } else {
        // Tìm thông tin sản phẩm
        const product = productData.find((p) => p.id === productId);

        if (product) {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            cart.push({
                id: product.id,
                name: product.name,
                price: product.salePrice || product.price,
                image:
                    product.images && product.images.length > 0
                        ? product.images[0]
                        : "/api/placeholder/400/320",
                quantity: 1,
            });
        }
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật số lượng sản phẩm trong giỏ hàng trên giao diện
    updateCartCount();

    // Hiển thị thông báo thành công
    showToast("Đã thêm sản phẩm vào giỏ hàng");
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Tính tổng số lượng sản phẩm
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Cập nhật giao diện
    if (cartCountElement) {
        cartCountElement.innerText = totalItems;
    }
}

// Hiển thị thông báo toast
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.innerText = message;
    toast.classList.add("show");

    // Tự động ẩn toast sau 3 giây
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Khởi tạo khi trang được load
document.addEventListener("DOMContentLoaded", function () {
    // Lấy ID danh mục từ URL
    const categoryId = getCategoryIdFromUrl();

    // Khởi tạo số lượng giỏ hàng
    updateCartCount();

    // Hiển thị sản phẩm theo danh mục
    if (categoryId) {
        displayProducts(categoryId);
    } else {
        // Nếu không có ID danh mục, hiển thị tất cả sản phẩm
        const productsContainer = document.getElementById("products-container");
        const loadingIndicator = document.getElementById("loading");
        const categoryTitle = document.getElementById("category-title");

        categoryTitle.innerText = "TẤT CẢ SẢN PHẨM";

        // Xóa loading indicator
        if (loadingIndicator) loadingIndicator.style.display = "none";

        // Hiển thị tất cả sản phẩm
        let allProductsHTML = "";

        productData.forEach((product) => {
            const price = product.salePrice || product.price;
            const originalPrice = product.salePrice ? product.price : null;
            const image =
                product.images && product.images.length > 0
                    ? product.images[0]
                    : "/api/placeholder/400/320";

            allProductsHTML += `
                <div class="bg-white rounded-lg shadow-sm overflow-hidden product-card">
                    <div class="relative">
                        <img src="${image}" alt="${
                product.name
            }" class="w-full product-image">
                        ${
                            product.onSale
                                ? '<span class="sale-badge bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>'
                                : ""
                        }
                        ${
                            product.isNew
                                ? '<span class="new-badge bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>'
                                : ""
                        }
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${
                            product.name.length > 50
                                ? product.name.substring(0, 50) + "..."
                                : product.name
                        }</h3>
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <span class="text-red-600 font-bold">${formatCurrency(
                                    price
                                )}</span>
                                ${
                                    originalPrice
                                        ? `<span class="text-gray-500 line-through text-sm ml-2">${formatCurrency(
                                              originalPrice
                                          )}</span>`
                                        : ""
                                }
                            </div>
                            ${
                                product.isBestSeller
                                    ? '<div class="flex items-center"><span class="text-yellow-400">★★★★</span><span class="text-gray-300">★</span></div>'
                                    : ""
                            }
                        </div>
                        <div class="flex justify-between mt-4">
                            <button class="bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 px-4 rounded-md text-sm transition-colors" 
                                    onclick="viewProductDetail(${product.id})">
                                Xem chi tiết
                            </button>
                            <button class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                                    onclick="addToCart(${product.id})">
                                <i data-feather="shopping-cart" class="w-4 h-4 inline-block"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        productsContainer.innerHTML = allProductsHTML;

        // Cập nhật lại các icon Feather
        feather.replace();
    }
});
