$(document).ready(function(){

$("#fullname").on("input", function(){
    $("#fullnameError").text("");
});

$("#email").on("input", function(){
    $("#emailError").text("");
});

$("#phone").on("input", function(){
    $("#phoneError").text("");
});

$("#password").on("input", function(){
    $("#passwordError").text("");
});

$("#confirm").on("input", function(){
    $("#confirmError").text("");
});

$("input[name='gender']").on("change", function(){
    $("#genderError").text("");
});

$("#terms").on("change", function(){
    $("#termsError").text("");
});

$("#registerForm").submit(function(e){

e.preventDefault();

let valid = true;

$(".error").text("");

let name = $("#fullname").val().trim();
let email = $("#email").val().trim();
let phone = $("#phone").val().trim();
let password = $("#password").val().trim();
let confirm = $("#confirm").val().trim();
let gender = $("input[name='gender']:checked").val();
let terms = $("#terms").is(":checked");
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let phonePattern = /^[0-9]{10}$/;
let namePattern = /^[a-zA-ZÀ-ỹ\s]+$/;
let passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

if(name === ""){
$("#fullnameError").text("Không được để trống họ tên");
valid = false;
}
else if(!namePattern.test(name)){
$("#fullnameError").text("Họ tên không hợp lệ");
valid = false;
}

if(email === ""){
$("#emailError").text("Vui lòng nhập email");
valid = false;
}
else if(!emailPattern.test(email)){
$("#emailError").text("Email không đúng định dạng");
valid = false;
}

if(phone === ""){
$("#phoneError").text("Vui lòng nhập số điện thoại");
valid = false;
}
else if(!phonePattern.test(phone)){
$("#phoneError").text("Số điện thoại phải 10 chữ số");
valid = false;
}

if(password === ""){
$("#passwordError").text("Vui lòng nhập mật khẩu");
valid = false;
}
else if(!passwordPattern.test(password)){
$("#passwordError").text("Mật khẩu phải có chữ hoa, số và ký tự đặc biệt");
valid = false;
}

if(confirm === ""){
$("#confirmError").text("Vui lòng xác nhận mật khẩu");
valid = false;
}

if(password !== confirm && confirm !== ""){
$("#confirmError").text("Mật khẩu không khớp");
valid = false;
}

if(!gender){
$("#genderError").text("Vui lòng chọn giới tính");
valid = false;
}

if(!terms){
$("#termsError").text("Bạn phải đồng ý điều khoản");
valid = false;
}

if(valid){
$("#successMessage").text("Đăng ký thành công!");
$("#registerForm")[0].reset();
}

});

});