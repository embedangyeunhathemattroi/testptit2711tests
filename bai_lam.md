# BÀI LÀM – ĐÁNH GIÁ NĂNG LỰC FRONTEND (K24)

- **Mã đề:** 01
- **Họ tên:** Phạm Ngọc Linh
- **Lớp:** K24CNTT4
- **Link repository:** https://github.com/embedangyeunhathemattroi/testptit000
- **Hệ điều hành (Windows/macOS):** Windows
- **Mã commit P2 đã nộp trước phút 90:** Commit P2 là `276818b`. Chưa xác nhận việc nộp trên Portal trước phút 90.
- **Phiên bản Node.js:** `v22.18.0`

## 4.1. Giao diện danh sách sản phẩm

> Pha 1 – mức AI-0 theo đề. Đây là bản thực hành ôn tập có tham khảo AI, không xác nhận điều kiện AI-0 và thời gian làm bài.

- [x] 4.1.1. Bố cục trang
- [x] 4.1.2. Bảng sản phẩm
- [x] 4.1.3. Định dạng dữ liệu
- [ ] 4.1.4. Hiển thị trên điện thoại

## 4.2. Thêm, sửa, xoá sản phẩm qua API

> Pha 1 – mức AI-0 theo đề. Các chức năng được đánh dấu sau khi kiểm tra thực tế.

- [ ] 4.2.1. Tải danh sách
- [ ] 4.2.2. Form thêm sản phẩm
- [ ] 4.2.3. Gửi form
- [ ] 4.2.4. Sửa sản phẩm
- [ ] 4.2.5. Xoá sản phẩm

## 4.3. Tìm kiếm, lọc và phân trang

> Pha 2 – mức AI-2 (được dùng AI, ghi nhật ký ở Mục 4.3.5).

> Mục 4.3.1 đến 4.3.3 và ý c của Mục 4.3.4 chấm trực tiếp trên mã nguồn.

- [ ] 4.3.1. Tìm kiếm và lọc
- [ ] 4.3.2. Phân trang
- [ ] 4.3.3. Đồng bộ URL

### 4.3.4. Phản biện mã do AI sinh

#### a) Thao tác làm danh sách hiển thị sai

Các bước thao tác:

1. Chạy API ở chế độ chậm bằng lệnh `npm run api:cham`.
2. Sử dụng hook `useProductSearch_ai.js` để kiểm tra.
3. Nhập từ khoá `ban` vào ô tìm kiếm.
4. Đợi khoảng 500ms rồi đổi từ khoá thành `chuot`.
5. Chờ các request trả về và quan sát danh sách sản phẩm.

Kết quả hiển thị:

Theo phân tích mã nguồn, danh sách có thể hiển thị sản phẩm theo từ khoá `ban` mặc dù ô tìm kiếm đang chứa từ khoá `chuot`. Em chưa xác nhận kết quả tái hiện lỗi trên trình duyệt.

Kết quả đúng:

Danh sách phải hiển thị các sản phẩm phù hợp với từ khoá `chuot` vì đây là từ khoá được nhập sau cùng.

#### b) Vì sao hook hiển thị sai

Hook cũ chưa huỷ request khi người dùng thay đổi từ khoá. Request cũ có thể trả về sau request mới và ghi đè dữ liệu, làm danh sách hiển thị sai. Đây là lỗi race condition.

#### c) Hook đã sửa

> Chấm trực tiếp trên file src/hooks/useProductSearch.js và trang danh sách.

Hook mới sử dụng AbortController để huỷ request cũ khi tham số tìm kiếm thay đổi. Đồng thời kiểm tra trạng thái của signal trước khi cập nhật dữ liệu.

### 4.3.5. Nhật ký dùng AI (giữ – sửa – loại bỏ)

| Lần | Câu lệnh chính gửi cho AI | Đoạn mã hoặc ý AI đưa ra (file) | Quyết định (giữ/sửa/loại bỏ) | Lý do | Bằng chứng kiểm chứng (chạy thử gì, kết quả) |
|---|---|---|---|---|---|
| 1 | Hướng dẫn tiếp pha 2 cho t | useProductSearch.js, ProductFilters.jsx, Pagination.jsx | Giữ | Code dễ hiểu, có tìm kiếm debounce 400ms, lọc, phân trang và huỷ request cũ bằng AbortController. | Đã tham khảo và tích hợp code. Chưa xác nhận đầy đủ kết quả kiểm thử tìm kiếm, lọc và phân trang. |
| 2 | Gửi lại code chuẩn ProductList.jsx, ProductTable.jsx và App.css của cả hai pha | ProductList.jsx, ProductTable.jsx, App.css | Giữ | Thống nhất tên biến, props và CSS giữa các component, tránh bị trùng code. | Chạy npm run tu-kiem-tra, kết quả 3/3 test PASS. ProductTable hiển thị đủ 8 sản phẩm mẫu và nhãn trạng thái. |
| 3 | Kiểm tra lỗi ProductFormPage.jsx không có export default | ProductFormPage.jsx | Giữ nếu đã áp dụng | Bổ sung export default để component có thể được import trong App.jsx, khắc phục lỗi màn hình trắng. | Phát hiện lỗi bằng Console của trình duyệt. Cần tải lại trang để xác nhận kết quả sau khi sửa. |

## Ghi chú (không tính điểm)

- Sử dụng trim() để loại bỏ khoảng trắng ở đầu và cuối từ khoá tìm kiếm.
- Từ khoá chỉ chứa khoảng trắng được xử lý như từ khoá rỗng.
- Nếu page=-3 hoặc page không phải số nguyên dương thì sử dụng trang 1.
- Khi thay đổi từ khoá hoặc bộ lọc thì chuyển về trang 1.
- Sử dụng AbortController để huỷ request cũ khi tham số tìm kiếm thay đổi.
- Chưa xử lý đầy đủ trường hợp số trang vượt quá tổng số trang.
- Đã chạy lệnh npm run tu-kiem-tra, kết quả 3/3 test PASS.
- Bộ test kiểm tra component ProductTable, số lượng 8 sản phẩm mẫu và nhãn trạng thái sản phẩm.
- Không thay đổi các file cấu hình và bộ test gốc của đề.