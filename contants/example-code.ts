export const noReview = {
  html: `
  <!DOCTYPE html>
<html>

<head>
  <title>Hello Project</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
  <div class="login-page">
  <div class="form">
    <form class="register-form">
      <input type="text" placeholder="name"/>
      <input type="password" placeholder="password"/>
      <input type="text" placeholder="email address"/>
      <button>create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    <form class="login-form">
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button>login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
    </form>
  </div>
</div>
  <script src="/index.js"></script>
</body>

</html>
  `.trim(),
  css: `
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  `.trim(),
  javascript: `const a = 1;
console.log('Hello, world!');`.trim(),
};

export const reviewedCode = {
  html: `<!DOCTYPE html>
<!-- Khai báo loại tài liệu là HTML5 -->
<html>
  <!-- Thẻ mở đầu của tài liệu HTML -->
  <head>
    <!-- Thẻ chứa các thông tin meta và liên kết đến các tài nguyên -->
    <title>Hello Project</title>
    <!-- Tiêu đề của trang web -->
    <meta charset="UTF-8" />
    <!-- Đặt mã hóa ký tự là UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Đặt viewport để trang web hiển thị tốt trên các thiết bị di động -->
    <link rel="stylesheet" href="/styles.css" />
    <!-- Liên kết đến file CSS -->
  </head>
  <!-- Đóng thẻ head -->

  <body>
    <!-- Thẻ chứa nội dung chính của trang web -->
    <div class="login-page">
      <!-- Thẻ div chứa toàn bộ trang đăng nhập -->
      <div class="form">
        <!-- Thẻ div chứa các form đăng nhập và đăng ký -->
        <form class="register-form">
          <!-- Form đăng ký -->
          <input type="text" placeholder="name" />
          <!-- Ô nhập tên -->
          <input type="password" placeholder="password" />
          <!-- Ô nhập mật khẩu -->
          <input type="text" placeholder="email address" />
          <!-- Ô nhập địa chỉ email -->
          <button>create</button>
          <!-- Nút tạo tài khoản -->
          <p class="message">Already registered? <a href="#">Sign In</a></p>
          <!-- Thông báo và liên kết đến trang đăng nhập -->
        </form>
        <!-- Đóng form đăng ký -->
        <form class="login-form">
          <!-- Form đăng nhập -->
          <input type="text" placeholder="username" />
          <!-- Ô nhập tên đăng nhập -->
          <input type="password" placeholder="password" />
          <!-- Ô nhập mật khẩu -->
          <button>login</button>
          <!-- Nút đăng nhập -->
          <p class="message">
            Not registered? <a href="#">Create an account</a>
            <!-- Thông báo và liên kết đến trang đăng ký -->
          </p>
        </form>
        <!-- Đóng form đăng nhập -->
      </div>
      <!-- Đóng thẻ div chứa các form -->
    </div>
    <!-- Đóng thẻ div chứa toàn bộ trang đăng nhập -->
    <script src="/index.js"></script>
    <!-- Liên kết đến file JavaScript -->
  </body>
  <!-- Đóng thẻ body -->
</html>
<!-- Đóng thẻ html -->

<!--
Đây là file HTML chính của project. Nội dung của file gồm các thẻ HTML cơ bản để tạo ra một trang web đăng nhập và đăng ký.
Thẻ <head> chứa các meta tags và link đến file CSS.
Thẻ <body> chứa các thẻ HTML để tạo ra một form đăng nhập và đăng ký.
Cuối cùng là thẻ <script> để gọi file JavaScript.
-->

<!-- Đề xuất cải thiện:
1. Thêm thuộc tính 'type' cho các nút button để tránh hành vi mặc định của nút submit.
2. Thêm thuộc tính 'required' cho các ô input để đảm bảo người dùng nhập dữ liệu.
3. Sử dụng thẻ <label> để cải thiện khả năng truy cập và liên kết với các ô input.
4. Thay đổi placeholder của ô nhập email từ 'text' thành 'email' để hỗ trợ kiểm tra định dạng email.
-->
`.trim(),
  css: `@import url(https://fonts.googleapis.com/css?family=Roboto:300); /* Import font Roboto từ Google Fonts */

.login-page {
  width: 360px; /* Đặt chiều rộng cho trang đăng nhập */
  padding: 8% 0 0; /* Đặt khoảng cách trên và dưới */
  margin: auto; /* Canh giữa trang */
}

.form {
  position: relative; /* Đặt vị trí tương đối */
  z-index: 1; /* Đặt thứ tự xếp chồng */
  background: #ffffff; /* Đặt màu nền trắng */
  max-width: 360px; /* Đặt chiều rộng tối đa */
  margin: 0 auto 100px; /* Canh giữa và đặt khoảng cách dưới */
  padding: 45px; /* Đặt khoảng cách bên trong */
  text-align: center; /* Canh giữa văn bản */
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); /* Đặt bóng cho hộp */
}

.form input {
  font-family: "Roboto", sans-serif; /* Đặt font chữ Roboto */
  outline: 0; /* Bỏ viền khi focus */
  background: #f2f2f2; /* Đặt màu nền */
  width: 100%; /* Chiều rộng 100% */
  border: 0; /* Bỏ viền */
  margin: 0 0 15px; /* Đặt khoảng cách dưới */
  padding: 15px; /* Đặt khoảng cách bên trong */
  box-sizing: border-box; /* Bao gồm viền và padding trong chiều rộng và chiều cao */
  font-size: 14px; /* Đặt kích thước font chữ */
}

.form button {
  font-family: "Roboto", sans-serif; /* Đặt font chữ Roboto */
  text-transform: uppercase; /* Chuyển chữ thành chữ hoa */
  outline: 0; /* Bỏ viền khi focus */
  background: #4caf50; /* Đặt màu nền */
  width: 100%; /* Chiều rộng 100% */
  border: 0; /* Bỏ viền */
  padding: 15px; /* Đặt khoảng cách bên trong */
  color: #ffffff; /* Đặt màu chữ trắng */
  font-size: 14px; /* Đặt kích thước font chữ */
  -webkit-transition: all 0.3 ease; /* Đặt hiệu ứng chuyển đổi cho Webkit */
  transition: all 0.3 ease; /* Đặt hiệu ứng chuyển đổi */
  cursor: pointer; /* Đặt con trỏ chuột */
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047; /* Đặt màu nền khi hover, active, focus */
}

.form .message {
  margin: 15px 0 0; /* Đặt khoảng cách trên */
  color: #b3b3b3; /* Đặt màu chữ */
  font-size: 12px; /* Đặt kích thước font chữ */
}

.form .message a {
  color: #4caf50; /* Đặt màu chữ cho liên kết */
  text-decoration: none; /* Bỏ gạch chân */
}

.form .register-form {
  display: none; /* Ẩn form đăng ký */
}

.container {
  position: relative; /* Đặt vị trí tương đối */
  z-index: 1; /* Đặt thứ tự xếp chồng */
  max-width: 300px; /* Đặt chiều rộng tối đa */
  margin: 0 auto; /* Canh giữa */
}

.container:before,
.container:after {
  content: ""; /* Đặt nội dung rỗng */
  display: block; /* Hiển thị dưới dạng khối */
  clear: both; /* Xóa float */
}

.container .info {
  margin: 50px auto; /* Đặt khoảng cách trên và dưới, canh giữa */
  text-align: center; /* Canh giữa văn bản */
}

.container .info h1 {
  margin: 0 0 15px; /* Đặt khoảng cách dưới */
  padding: 0; /* Bỏ padding */
  font-size: 36px; /* Đặt kích thước font chữ */
  font-weight: 300; /* Đặt độ đậm font chữ */
  color: #1a1a1a; /* Đặt màu chữ */
}

.container .info span {
  color: #4d4d4d; /* Đặt màu chữ */
  font-size: 12px; /* Đặt kích thước font chữ */
}

.container .info span a {
  color: #000000; /* Đặt màu chữ cho liên kết */
  text-decoration: none; /* Bỏ gạch chân */
}

.container .info span .fa {
  color: #ef3b3a; /* Đặt màu chữ cho font awesome */
}

body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141, 194, 111); /* Đặt màu nền */
  background: linear-gradient(
    90deg,
    rgba(141, 194, 111, 1) 0%,
    rgba(118, 184, 82, 1) 50%
  ); /* Đặt gradient màu nền */
  font-family: "Roboto", sans-serif; /* Đặt font chữ Roboto */
  -webkit-font-smoothing: antialiased; /* Làm mịn font chữ cho Webkit */
  -moz-osx-font-smoothing: grayscale; /* Làm mịn font chữ cho Firefox */
}

/* Đề xuất cải thiện:
1. Sử dụng biến CSS để dễ dàng thay đổi màu sắc và font chữ.
2. Thêm thuộc tính 'required' cho các ô input để đảm bảo người dùng nhập dữ liệu.
3. Sử dụng các class CSS để tránh lặp lại các thuộc tính giống nhau.
4. Kiểm tra tính tương thích của các thuộc tính CSS trên các trình duyệt khác nhau.
*/
`.trim(),
  javascript: `
// Khai báo biến a với giá trị là 1
const a = 1;
// In ra console
console.log(a);
`.trim(),
};
