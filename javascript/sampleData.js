
if (!localStorage.getItem("products")) {
    const sampleProducts = [
        {
            id: 1745216916786,
            name: "Giày Sneaker Cao Cấp Unisex Form Thoáng Mát",
            category: "Giày Sneaker",
            subcategory: "Thời Trang",
            sku: "GSN01",
            price: 999000,
            salePrice: 799000,
            stock: 1000,
            material: "Da tổng hợp, Cao su",
            description:
                "Giày Sneaker Cao Cấp Unisex Form Thoáng Mát\n\nChất liệu da tổng hợp cao cấp kết hợp đế cao su chống trượt, mang lại độ bền cao, thoáng khí, thấm hút mồ hôi. Thiết kế trẻ trung, năng động, dễ phối đồ, phù hợp cho cả nam và nữ, đi học, dạo phố, du lịch, hoặc các buổi hẹn hò.\n\nPHƯƠNG CHÂM SHOP 'BÁN HÀNG ONLINE LÀ BÁN NIỀM TIN'\n\nHỗ trợ đổi size trong 7 ngày nếu không vừa. Vui lòng liên hệ qua support@shoestore.com để được tư vấn.\n\n#giay_sneaker #sneaker_unisex #giay_thoang_mat #giay_nam_nu #giay_thoi_trang",
            colors: ["Trắng", "Đen", "Xám"],
            sizes: ["36", "37", "38", "39", "40", "41", "42"],
            tags: ["giày sneaker", "unisex", "thời trang"],
            onSale: true,
            isNew: true,
            isBestSeller: true,
            featured: true,
            images: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyxv3y9qxqjl34.webp",
                "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvkawarj304ib6.webp",
            ],
        },
        {
            id: 1745217174920,
            name: "Giày Công Sở Nữ Cao Gót 5cm Form Chuẩn",
            category: "Giày Công Sở",
            subcategory: "Thời Trang",
            sku: "GCS01",
            price: 799000,
            salePrice: 599000,
            stock: 100,
            material: "Da thật, Cao su",
            description:
                "Giày Công Sở Nữ Cao Gót 5cm Form Chuẩn\n\nSHOESTORE mang đến giá trị 'Chân - Thiện - Mỹ' với đôi giày cao gót 5cm, chất liệu da thật cao cấp, đế cao su chống trượt, không phai màu, thoáng khí, thấm hút mồ hôi. Thiết kế thanh lịch, tối giản, che khuyết điểm chân, phù hợp cho môi trường công sở hoặc sự kiện.\n\nCó thể phối với quần âu, chân váy, hoặc váy maxi để tạo phong cách ấn tượng. Màu sắc đa dạng: Trắng, Đen, Be. Hỗ trợ đổi size trong 7 ngày nếu không vừa. Liên hệ support@shoestore.com để được tư vấn.\n\n#giay_cong_so #giay_cao_got #giay_nu #giay_thoi_trang #giay_da_that",
            colors: ["Trắng", "Đen", "Be"],
            sizes: ["35", "36", "37", "38", "39", "40"],
            tags: ["giày công sở", "giày cao gót", "nữ"],
            onSale: true,
            isNew: true,
            isBestSeller: true,
            featured: true,
            images: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsbdy6wse2mce9.webp",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsbdy6wsgvr890.webp",
            ],
        },
        {
            id: 1745217305006,
            name: "Giày Thể Thao Nam Form Dáng Chuẩn",
            category: "Giày Thể Thao",
            subcategory: "Thể Thao",
            sku: "GTT01",
            price: 899000,
            salePrice: 699000,
            stock: 190,
            material: "Vải lưới, Cao su",
            description:
                "Giày Thể Thao Nam Form Dáng Chuẩn\n\nThiết kế độc quyền bởi SHOESTORE, giày thể thao nam sử dụng chất liệu vải lưới thoáng khí kết hợp đế cao su êm ái, chống trượt. Phù hợp cho các hoạt động chạy bộ, tập gym, hoặc dạo phố. Phong cách năng động, trẻ trung, dễ phối với quần jeans, quần short.\n\nKích cỡ: 39-43. Màu sắc: Đen, Trắng, Xám. Hỗ trợ đổi size trong 7 ngày nếu không vừa. Liên hệ support@shoestore.com để được tư vấn.\n\n#giay_the_thao #giay_nam #giay_chay_bo #giay_thoi_trang",
            colors: ["Đen", "Trắng", "Xám"],
            sizes: ["39", "40", "41", "42", "43"],
            tags: ["giày thể thao", "nam", "chạy bộ"],
            onSale: true,
            isNew: true,
            isBestSeller: true,
            featured: true,
            images: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lynbk7ibe7xd01.webp",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltdstu90e7d02f.webp",
            ],
        },
        {
            id: 1745217491780,
            name: "Giày Sneaker Ống Thấp Nữ Form Chuẩn Ulzzang",
            category: "Giày Sneaker",
            subcategory: "Thời Trang",
            sku: "GSN02",
            price: 699000,
            salePrice: 499000,
            stock: 198,
            material: "Da tổng hợp, Cao su",
            description:
                "Giày Sneaker Ống Thấp Nữ Form Chuẩn Ulzzang\n\nChất liệu da tổng hợp cao cấp, đế cao su chắc chắn, chống trượt. Thiết kế ống thấp thời trang, phong cách Ulzzang, dễ phối với quần jeans, váy, hoặc quần short. Đường may chuẩn chỉnh, tỉ mỉ, mang lại độ bền cao.\n\nKích cỡ: 35-39. Màu sắc: Trắng, Đen, Xanh. Hỗ trợ đổi size trong 7 ngày nếu không vừa. Liên hệ support@shoestore.com để được tư vấn.\n\n#giay_sneaker #giay_nu #giay_ulzzang #giay_thoi_trang",
            colors: ["Trắng", "Đen", "Xanh"],
            sizes: ["35", "36", "37", "38", "39"],
            tags: ["giày sneaker", "nữ", "ulzzang"],
            onSale: true,
            isNew: false,
            isBestSeller: true,
            featured: true,
            images: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m6hup3gf2n2093.webp",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m6hupu1e917c60.webp",
            ],
        },
        {
            id: 1745217784992,
            name: "Giày Bít Mũi Nữ Cao 5cm Phối Nơ Da Thật",
            category: "Giày Cao Gót",
            subcategory: "Thời Trang",
            sku: "ASM07",
            price: 1200093,
            salePrice: 878887,
            stock: 23,
            material: "Da thật, Cao su",
            description:
                "Giày Bít Mũi Nữ Cao 5cm Phối Nơ Da Thật, Giày Slingback Cao Gót Mũi Nhọn Đế Vuông NUDDO N5555\n\nHƯỚNG DẪN CHỌN SIZE: Giày cao gót nữ SHOESTORE sản xuất theo tiêu chuẩn size giày Việt Nam, bạn chọn như size giày thường mang. Hỗ trợ đổi size trong 30 ngày nếu không vừa.\n\nHƯỚNG DẪN BẢO QUẢN: Vệ sinh bằng vải sạch thấm nước xà bông loãng, lau khô, phơi nơi thoáng mát, tránh nắng gắt. Không giặt trực tiếp bằng nước lạnh.\n\nTÍNH ỨNG DỤNG: Phối với váy công sở, quần vải, quần jeans, chân váy xòe, váy maxi. Phù hợp cho công sở, sự kiện, hoặc phong cách thanh lịch.\n\nSHOESTORE CAM KẾT: Sản phẩm chính hãng, hình ảnh thực tế 100%, bảo hành 12 tháng. Liên hệ support@shoestore.com để được hỗ trợ.\n\n#giay_cao_got #giay_nu #giay_cong_so #giay_da_that",
            colors: ["Đen", "Trắng", "Be"],
            sizes: ["35", "36", "37", "38", "39"],
            tags: ["giày cao gót", "nữ", "công sở"],
            onSale: true,
            isNew: false,
            isBestSeller: true,
            featured: true,
            images: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8d1b6vvlthjb9.webp",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m876qhflszgn25.webp",
            ],
        },
    ];
    localStorage.setItem("products", JSON.stringify(sampleProducts));
}
if (!localStorage.getItem("categories")) {
    const sampleCategories = [
        { id: 1745217996593, name: "Áo Sơ Mi Nữ", description: "Áo Sơ Mi Nữ" },
        {
            id: 1745218004892,
            name: "Giày Sneaker",
            description: "Giày Sneaker",
        },
        {
            id: 1745218010993,
            name: "Giày Công Sở",
            description: "Giày Công Sở",
        },
        { id: 1745218023257, name: "Giày Thể Thao", description: "Giày Thể Thao" },
        { id: 17452180232574, name: "Giày Cao Gót", description: "Giày Cao Gót" },
    ];
    localStorage.setItem("categories", JSON.stringify(sampleCategories));
}
if (!localStorage.getItem("orders")) {
    const sampleOrders = [
        {
            id: 1,
            customer: "Nguyễn Văn A",
            total: 300000,
            status: "Đã Đặt",
            date: "2023-10-01",
        },
    ];
    localStorage.setItem("orders", JSON.stringify(sampleOrders));
}
if (!localStorage.getItem("customers")) {
    const sampleCustomers = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "nva@example.com",
            phone: "0909123456",
            totalOrders: 5,
        },
    ];
    localStorage.setItem("customers", JSON.stringify(sampleCustomers));
}
if (!localStorage.getItem("settings")) {
    const sampleSettings = {
        storeName: "Fashion Store",
        supportEmail: "support@fashionstore.com",
    };
    localStorage.setItem("settings", JSON.stringify(sampleSettings));
}

if (!localStorage.getItem("users")) {
    const users = [
        {
            fullname: "admin",
            email: "admin@gmail.com",
            password: "admin",
            role: "admin",
            phone: "0869224813",
        },
        {
            fullname: "Trường Sơn",
            email: "truongsonpt.80@gmail.com",
            password: "123456",
            role: "user",
            phone: "0869224814",
        },
    ];
    localStorage.setItem("users", JSON.stringify(users));
}
