const form = document.querySelector("form");

if (form) {
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const dataLogin = {
            email: inputEmail.value.trim(),
            password: inputPassword.value.trim(),
        };

        const user = users.find((user) => user.email === dataLogin.email);

        if (!user) {
            alert("Tài khoản không tồn tại trong hệ thống");
            return;
        }
        if (user.password !== dataLogin.password) {
            alert("Sai mật khẩu!");
            return;
        }

        localStorage.setItem("auth", JSON.stringify(user));
        alert("Bạn đã đăng nhập thành công");
        const role = user.role;
        setTimeout(() => {
            window.location.href =
                role === "user" ? "index.html" : "dashboard.html";
        }, 1000);
    });
}
