# Cánh Giấy

Website giới thiệu thương hiệu sách dành cho thiếu niên nhi đồng. Thiết kế điện ảnh với sách 3D, máy bay giấy, nền xanh đêm và nhận diện trên nền kem theo video.

## Nội dung

- Logo chữ do người dùng cung cấp, giữ nguyên màu sắc và nét chữ.
- Hình minh họa sách 3D được tạo riêng; ảnh chủ đề và ảnh động WebP trích từ video người dùng cung cấp.
- Video MP4 gốc dài 30 giây, giữ nguyên âm thanh và phụ đề trong hình.
- Bốn thế giới tương tác: cổ tích, khoa học, thiên nhiên và tình bạn.
- Responsive, menu điện thoại, điều khiển bàn phím, chế độ giảm chuyển động và nút tạm dừng ảnh động.
- Font Nunito và Lora lưu tại website; giấy phép OFL kèm trong assets.

## Chạy local

Chạy `python -m http.server 4173 --bind 127.0.0.1` trong thư mục dự án, sau đó mở `http://127.0.0.1:4173`.

## Build và triển khai

Chạy `node build.mjs` để tạo thư mục `dist/`. Không cần cài thư viện cho website.

Vercel đọc cấu hình `vercel.json` và xuất bản `dist/`. Bản build chỉ sao chép HTML, CSS, JavaScript và assets. Các tệp `.env*`, `.vercel/` và thông tin đăng nhập không được đưa vào Git hoặc bản build.

Website: https://canh-giay-lamprrro1234-2289.vercel.app

## Kiểm tra

Đã kiểm tra các cửa sổ khám phá, phát video và âm thanh, menu điện thoại, chế độ dừng chuyển động, tải ảnh và bố cục 390 / 768 / 1440 px. Không phát hiện lỗi JavaScript hoặc tài nguyên bị thiếu trong bản kiểm tra local.

## Nguồn tư liệu

- `assets/logo.png`: logo Cánh Giấy do người dùng cung cấp.
- `assets/canh-giay-30s.mp4`: video gốc do người dùng cung cấp, giữ nguyên nội dung.
- `assets/storybook-hero.webp`: minh họa tạo riêng cho dự án bằng công cụ tạo ảnh.
- Ảnh cảnh và ảnh động: trích từ video gốc, tối ưu cho web.

Đây là đồ án giới thiệu thương hiệu, không phải cửa hàng giao dịch. Tên và logo được dùng theo tư liệu người dùng cung cấp; chưa thực hiện kiểm tra đăng ký nhãn hiệu.
