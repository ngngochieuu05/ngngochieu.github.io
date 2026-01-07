# 📚 HƯỚNG DẪN TRIỂN KHAI WEBSITE CV

## 📋 Mục lục
1. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
2. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
3. [Cài đặt cơ sở dữ liệu](#cài-đặt-cơ-sở-dữ-liệu)
4. [Cấu hình backend](#cấu-hình-backend)
5. [Upload lên hosting](#upload-lên-hosting)
6. [Sử dụng admin panel](#sử-dụng-admin-panel)
7. [Xử lý sự cố](#xử-lý-sự-cố)

---

## 📂 Cấu trúc thư mục

```
Webside_CV_CaNhan/
├── index.html              # Trang chủ (file chính để hosting)
├── style.css               # File CSS (animations, styling)
├── script.js               # JavaScript (interactivity, API calls)
├── backend/
│   ├── config.php          # Cấu hình database
│   ├── database.sql        # Schema database
│   ├── submit_contact.php  # API nhận tin nhắn liên hệ
│   └── admin/
│       ├── login.php       # Trang đăng nhập admin
│       ├── dashboard.php   # Quản lý tin nhắn
│       └── logout.php      # Đăng xuất
└── README.md               # File này
```

---

## 🖥️ Yêu cầu hệ thống

### Hosting
- **PHP:** >= 7.4
- **MySQL/MariaDB:** >= 5.7
- **PDO Extension:** Phải được bật
- **mod_rewrite:** (Optional) Nếu dùng .htaccess

### Trình duyệt hỗ trợ
- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14

---

## 🗄️ Cài đặt cơ sở dữ liệu

### Bước 1: Tạo database
Đăng nhập vào **phpMyAdmin** hoặc MySQL CLI:

```sql
CREATE DATABASE cv_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Bước 2: Import schema
1. Mở file `backend/database.sql`
2. Copy toàn bộ nội dung
3. Paste vào phpMyAdmin > SQL tab
4. Nhấn **Go** để thực thi

### Bước 3: Kiểm tra
Xác nhận các bảng đã được tạo:
- `contacts` - Lưu tin nhắn liên hệ
- `admin_users` - Tài khoản admin

### Thông tin đăng nhập admin mặc định
```
Username: admin
Password: admin123
```

⚠️ **QUAN TRỌNG:** Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!

---

## ⚙️ Cấu hình backend

### Bước 1: Chỉnh sửa config.php
Mở `backend/config.php` và cập nhật thông tin database:

```php
private $host = 'localhost';       // Thường là localhost
private $db_name = 'cv_portfolio'; // Tên database bạn đã tạo
private $username = 'root';        // Username MySQL (hosting sẽ khác)
private $password = '';            // Password MySQL
```

**Lưu ý cho hosting:**
- Thông tin database thường được cung cấp trong control panel (cPanel, DirectAdmin)
- Host có thể là: `localhost`, `127.0.0.1`, hoặc URL cụ thể

### Bước 2: Bật báo lỗi (development)
Nếu đang test local, thêm vào đầu `config.php`:

```php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

⚠️ **Tắt báo lỗi trên production** để bảo mật!

---

## 🚀 Upload lên hosting

### Cách 1: FTP/SFTP (FileZilla, WinSCP)
1. Kết nối tới hosting qua FTP
2. Upload **TẤT CẢ FILE** vào thư mục `public_html` hoặc `www`
3. Đảm bảo cấu trúc thư mục giống local

### Cách 2: File Manager (cPanel)
1. Đăng nhập cPanel
2. Vào **File Manager**
3. Nén toàn bộ project thành `.zip`
4. Upload file zip
5. Extract vào `public_html`

### Kiểm tra quyền thư mục
Đặt quyền cho `backend/` nếu cần:
```bash
chmod 755 backend/
chmod 644 backend/*.php
```

---

## 🔐 Sử dụng Admin Panel

### Truy cập Admin
```
https://yourwebsite.com/backend/admin/login.php
```

### Chức năng Dashboard
1. **Xem tin nhắn:** Hiển thị tất cả liên hệ
2. **Lọc theo trạng thái:**
   - 🆕 **Mới** - Tin nhắn chưa đọc
   - 👁️ **Đã đọc** - Đã xem nhưng chưa trả lời
   - ✅ **Đã trả lời** - Đã xử lý xong
3. **Tìm kiếm:** Theo tên, email, hoặc chủ đề
4. **Hành động:**
   - **Xem:** Xem chi tiết tin nhắn (hiện modal)
   - **Đọc:** Đánh dấu là đã đọc
   - **Trả lời:** Đánh dấu là đã trả lời (sau khi email khách hàng)
   - **Xóa:** Xóa vĩnh viễn

### Thống kê Dashboard
- 📊 **Tổng tin nhắn**
- 🆕 **Tin nhắn mới**
- 👁️ **Đã đọc**
- ✅ **Đã trả lời**

### Đổi mật khẩu admin
Sử dụng MySQL để đổi:

```sql
UPDATE admin_users 
SET password_hash = '$2y$10$YOUR_NEW_HASH_HERE' 
WHERE username = 'admin';
```

**Tạo hash mới:** Dùng online tool hoặc PHP:
```php
echo password_hash('your_new_password', PASSWORD_DEFAULT);
```

---

## 🛡️ Bảo mật

### 1. Thay đổi mật khẩu mặc định
```sql
-- Tạo hash cho password mới
-- Ví dụ: password là "MySecurePass123"
UPDATE admin_users 
SET password_hash = '$2y$10$[HASH_FROM_PASSWORD_HASH_FUNCTION]'
WHERE username = 'admin';
```

### 2. Giới hạn rate limiting
File `submit_contact.php` đã có rate limiting:
- **5 tin nhắn / 1 IP / 1 giờ**
- Chống spam tự động

### 3. Ẩn thư mục backend
Tạo `.htaccess` trong `backend/`:

```apache
# Chặn truy cập trực tiếp vào backend (trừ admin và API)
<FilesMatch "^(config|database)\.php$">
    Order deny,allow
    Deny from all
</FilesMatch>

# Chỉ cho phép POST requests cho API
<Files "submit_contact.php">
    <Limit GET>
        Order deny,allow
        Deny from all
    </Limit>
</Files>
```

### 4. HTTPS
- **BẮT BUỘC** trên production
- Lấy SSL miễn phí: Let's Encrypt, CloudFlare

---

## 🧪 Test trước khi lên production

### Test local
1. Bật XAMPP/WAMP/MAMP
2. Tạo database local
3. Import `database.sql`
4. Chỉnh `config.php`
5. Truy cập: `http://localhost/Webside_CV_CaNhan/`

### Test contact form
1. Điền form liên hệ
2. Kiểm tra console (F12) có lỗi không
3. Xác nhận database có data mới:
   ```sql
   SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;
   ```

### Test admin panel
1. Vào `backend/admin/login.php`
2. Đăng nhập: `admin` / `admin123`
3. Xem tin nhắn vừa gửi
4. Thử các chức năng: Đọc, Trả lời, Xóa

---

## ❌ Xử lý sự cố

### Lỗi: "Connection failed: Access denied"
**Nguyên nhân:** Sai thông tin database trong `config.php`

**Giải quyết:**
1. Kiểm tra lại `host`, `db_name`, `username`, `password`
2. Xác nhận database tồn tại
3. Kiểm tra quyền user trong MySQL

### Lỗi: "Table 'contacts' doesn't exist"
**Nguyên nhân:** Chưa import schema

**Giải quyết:**
1. Vào phpMyAdmin
2. Chọn database `cv_portfolio`
3. Import file `database.sql`

### Lỗi 500 khi submit form
**Nguyên nhân:** Lỗi PHP hoặc file path sai

**Giải quyết:**
1. Bật error reporting trong `config.php`:
   ```php
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```
2. Kiểm tra console browser (F12 > Network tab)
3. Xem response từ `submit_contact.php`

### Form không gửi (không có thông báo)
**Nguyên nhân:** CORS hoặc đường dẫn API sai

**Giải quyết:**
1. Mở F12 > Console, xem lỗi
2. Kiểm tra đường dẫn trong `script.js`:
   ```javascript
   fetch('backend/submit_contact.php', {
   ```
3. Thử đường dẫn tuyệt đối nếu cần:
   ```javascript
   fetch('/backend/submit_contact.php', {
   ```

### Admin panel không load CSS
**Nguyên nhân:** CSS inline nên không có lỗi này, nhưng nếu có:

**Giải quyết:**
- CSS đã được nhúng trực tiếp vào HTML nên luôn hoạt động

---

## 📧 Tích hợp email notification (Optional)

Để nhận email khi có liên hệ mới, chỉnh trong `submit_contact.php`:

### 1. Bật hàm sendEmailNotification
Tìm dòng:
```php
// sendEmailNotification($name, $email, $subject, $message);
```

Bỏ comment:
```php
sendEmailNotification($name, $email, $subject, $message);
```

### 2. Cấu hình email nhận
Đổi `YOUR_EMAIL@gmail.com` thành email của bạn:
```php
$to = 'bimax12052005@gmail.com'; // Email của bạn
```

### 3. Test email
- Email có thể vào **Spam** lần đầu
- Dùng SMTP plugin tốt hơn (PHPMailer, SwiftMailer)

---

## 🎨 Tùy chỉnh giao diện

### Đổi màu chủ đạo
Trong `style.css`, tìm các biến màu:
```css
/* Màu gradient chính */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Đổi thành màu khác, ví dụ: */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Tắt hiệu ứng starfield
Trong `script.js`, comment dòng:
```javascript
// createStarfield();
```

---

## 📱 Responsive Design

Website đã tối ưu cho:
- 📱 **Mobile:** < 768px
- 💻 **Tablet:** 768px - 1024px
- 🖥️ **Desktop:** > 1024px

Test responsive:
- F12 > Toggle device toolbar (Ctrl + Shift + M)

---

## 🔄 Backup định kỳ

### Backup Database
```bash
# Từ MySQL CLI hoặc phpMyAdmin > Export
mysqldump -u username -p cv_portfolio > backup_$(date +%Y%m%d).sql
```

### Backup Files
- Nén toàn bộ thư mục project
- Lưu vào Google Drive/Dropbox

---

## 📞 Liên hệ hỗ trợ

Nếu gặp khó khăn, liên hệ:
- **Email:** bimax12052005@gmail.com
- **Phone:** [removed]
- **GitHub:** [hieudzvl125](https://github.com/hieudzvl125)

---

## ✅ Checklist triển khai

- [ ] Database đã tạo và import schema
- [ ] `config.php` đã cấu hình đúng thông tin
- [ ] Đã đổi mật khẩu admin mặc định
- [ ] Website chạy được trên local
- [ ] Form liên hệ gửi được tin nhắn
- [ ] Admin panel đăng nhập và xem được tin nhắn
- [ ] Đã upload lên hosting
- [ ] Đã test trên hosting (form + admin)
- [ ] SSL/HTTPS đã được bật
- [ ] Đã backup database và files

---

**🎉 Chúc bạn triển khai thành công!**
