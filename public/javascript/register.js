const form = document.querySelector("form");

if (form) {
    const inputFullname = document.querySelector("#fullname");
    const inputEmail = document.querySelector("#email");
    const inputPhone = document.querySelector("#phone");
    const inputPassword = document.querySelector("#password");
    const inputConfirmPassword = document.querySelector("#confirm-password");
    const inputTerms = document.querySelector("#terms");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu nhập vào
        if (!inputFullname.value.trim()) {
            alert("Vui lòng nhập họ và tên");
            return;
        }

        if (!inputEmail.value.trim()) {
            alert("Vui lòng nhập email");
            return;
        }

        if (!inputPhone.value.trim()) {
            alert("Vui lòng nhập số điện thoại");
            return;
        }

        if (!inputPassword.value.trim()) {
            alert("Vui lòng nhập mật khẩu");
            return;
        }

        if (inputPassword.value !== inputConfirmPassword.value) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp");
            return;
        }

        if (!inputTerms.checked) {
            alert("Vui lòng đồng ý với điều khoản sử dụng");
            return;
        }

        // Lấy danh sách người dùng từ localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = users.find(
            (user) => user.email === inputEmail.value.trim()
        );
        if (existingUser) {
            alert("Email này đã được đăng ký. Vui lòng sử dụng email khác.");
            return;
        }

        // Tạo đối tượng người dùng mới
        const newUser = {
            fullname: inputFullname.value.trim(),
            email: inputEmail.value.trim(),
            phone: inputPhone.value.trim(),
            password: inputPassword.value.trim(),
            role: "user",
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("auth", JSON.stringify(newUser));

        alert("Đăng ký tài khoản thành công!");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    });
}
