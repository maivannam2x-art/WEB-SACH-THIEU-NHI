# Cánh Giấy

Website giới thiệu thương hiệu sách dành cho thiếu niên nhi đồng. Thiết kế điện ảnh với sách 3D, máy bay giấy, nền xanh đêm và nhận diện trên nền kem theo video.

## Nội dung

- Logo chữ do người dùng cung cấp, giữ nguyên màu sắc và nét chữ.
- Toàn bộ hình minh họa hero, bốn thế giới và cảnh gia đình được tạo riêng theo phong cách mô hình giấy 3D; không trích khung hình từ video.
- Banner chữ chạy liên tục có nhóm bạn nhỏ chuyển động; card phản hồi theo chuột, con trỏ máy bay giấy và truyện ngắn tương tác lật trang 3D.
- Truyện nguyên bản “Mây và Thành phố Những Trang Sách Ngủ Quên” gồm bốn chương minh họa, lời thoại và hoạt ảnh riêng; không lặp lại nội dung bốn tủ sách phía trên.
- Video MP4 gốc dài 30 giây, giữ nguyên âm thanh và phụ đề trong hình.
- Bốn thế giới tương tác: cổ tích, khoa học, thiên nhiên và tình bạn.
- Responsive, menu điện thoại, điều khiển bàn phím, chế độ giảm chuyển động và nút tạm dừng ảnh động.
- Font Nunito và Lora lưu tại website; giấy phép OFL kèm trong assets.

## Chạy local

Chạy `python -m http.server 4173 --bind 127.0.0.1` trong thư mục dự án, sau đó mở `http://127.0.0.1:4173`.

## Build và triển khai

Chạy `node build.mjs` để tạo thư mục `dist/`. Không cần cài thư viện cho website.

Vercel đọc cấu hình `vercel.json` và xuất bản `dist/`. Bản build chỉ sao chép HTML, CSS, JavaScript và assets. Các tệp `.env*`, `.vercel/` và thông tin đăng nhập không được đưa vào Git hoặc bản build.

Website: https://canh-giay.vercel.app

## Kiểm tra

Đã kiểm tra các cửa sổ khám phá, phát video và âm thanh, menu điện thoại, chế độ dừng chuyển động, tải ảnh và bố cục 390 / 768 / 1440 px. Không phát hiện lỗi JavaScript hoặc tài nguyên bị thiếu trong bản kiểm tra local.

## Nguồn tư liệu

- `assets/logo.png`: logo Cánh Giấy do người dùng cung cấp.
- Video giới thiệu: Cloudinary CDN (URL được khai báo trực tiếp trong `index.html`).
- `assets/storybook-hero.webp`: minh họa tạo riêng cho dự án bằng công cụ tạo ảnh.
- Các ảnh `*-v2.webp`, `banner-runners-v3.webp` và `banner-readers-v5.webp`: minh họa gốc được tạo riêng, tối ưu cho web. Banner gồm nhóm chạy có nhịp chuyển động và hai bạn ngồi đọc sách.
- Các ảnh `story-*-v1.webp`: bốn cảnh nguyên bản của truyện Mây và Cánh Giấy, được tạo đồng bộ nhân vật và tối ưu cho từng trang sách.
- Video giới thiệu được phân phối từ Cloudinary để tận dụng CDN và giảm tải cho Vercel.

Đây là đồ án giới thiệu thương hiệu, không phải cửa hàng giao dịch. Tên và logo được dùng theo tư liệu người dùng cung cấp; chưa thực hiện kiểm tra đăng ký nhãn hiệu.
