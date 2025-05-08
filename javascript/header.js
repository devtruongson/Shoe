const cates = JSON.parse(localStorage.getItem("categories")) || [];
const htmlCate = cates.map(
    (item) => `<a
                        href="categories.html?id=${item.id}"
                        class="text-gray-800 hover:text-purple-600 font-medium"
                        >${item.name}</a>`
);

const cateWpRender = (document.querySelector("#cateRenderHeader").innerHTML =
    htmlCate.join(""));

const settings = JSON.parse(localStorage.getItem("settings")) || {};
const storeName = settings.storeName || "FASHIONSTORE";

if (document.getElementById("storeNameHeader")) {
    document.getElementById("storeNameHeader").textContent =
        storeName.split(" ")[0];
}

if (document.getElementById("storeNameMobile")) {
    document.getElementById("storeNameMobile").textContent =
        storeName.split(" ")[0];
}

if (document.getElementById("storeNameFooter")) {
    document.getElementById("storeNameFooter").textContent = storeName;
    document.getElementById("storeNameFooterBottom").textContent = storeName;
    document.getElementById("supportEmailFooter").textContent =
        settings.supportEmail || "info@fashionstore.com";
}

const headerBack = document.querySelector("#header_back");

if (headerBack) {
    headerBack.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

const headerAuth = document.querySelector("#auth_header");

console.log("check headerAuth: ", headerAuth)

if (headerAuth) {
    const checkAuth = JSON.parse(localStorage.getItem("auth") || "null");
    if (!checkAuth) {
        headerAuth.innerHTML = `
            <div class="flex gap-3 items-center">
                <a
                    href="login.html"
                    class="cursor-pointer hover:text-[#ee4d2d]"
                >
                Đăng nhập
                </a>
                <a
                    href="register.html"
                    class="cursor-pointer hover:text-[#ee4d2d]"
                >
                    Đăng ký
                </a>
            </div>
        `;
    } else {
        headerAuth.innerHTML = `
            <a href="#"
                class="cursor-pointer hover:text-[#ee4d2d] rounded-[10px] bg-[#eee] relative group"
                style="border: 1px solid #ee4d2d; padding: 6px 10px;"
            >
                Xin chào ${checkAuth.fullname}

                <div class="absolute bg-[#ccc] w-[100%] rounded-[10px] p-[10px] text-[#333] font-[600] top-[102%] hidden group-hover:block">
                    <ul>
                        <li onClick="handleLogOut()">Đăng xuất</li>
                        ${checkAuth.role === "admin"
                ? `<li onClick="handleDashBoard()" class="py-2">Trang quản trị</li>`
                : ``
            }
                    </ul>
                </div>
            </a>
          
        `;
    }
}

function handleLogOut() {
    const check = confirm("Bạn chắc chắn muốn đăng suất?");
    if (check) {
        localStorage.removeItem("auth");
        window.location.reload();
    }
}

function handleDashBoard() {
    window.location.href = "dashboard.html";
}
