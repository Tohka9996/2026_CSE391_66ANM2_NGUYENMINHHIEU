$(document).ready(function(){

$("#fullname").on("input", function(){

let len = $(this).val().length;

$("#nameCount").text(len + "/50");

if(len >= 50){
$("#nameCount").css("color","red");
}else{
$("#nameCount").css("color","#666");
}

$("#fullnameError").text("");

});


$("#email").on("input", function(){
$("#emailError").text("");
});

$("#phone").on("input", function(){
$("#phoneError").text("");
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


$("#password").on("input", function(){

let pass = $(this).val();

$("#passwordError").text("");

let score = 0;

if(pass.length >= 6) score++;
if(/[A-Z]/.test(pass)) score++;
if(/[0-9]/.test(pass)) score++;
if(/[^A-Za-z0-9]/.test(pass)) score++;

if(score <= 1){

$("#strength").css({
width:"33%",
background:"red"
});

$("#strengthText").text("Mật khẩu yếu");

}
else if(score <= 3){

$("#strength").css({
width:"66%",
background:"orange"
});

$("#strengthText").text("Mật khẩu trung bình");

}
else{

$("#strength").css({
width:"100%",
background:"green"
});

$("#strengthText").text("Mật khẩu mạnh");

}

});


$("#togglePass").click(function(){

let type = $("#password").attr("type");

if(type === "password"){
$("#password").attr("type","text");
}else{
$("#password").attr("type","password");
}

});

$("#toggleConfirm").click(function(){

let type = $("#confirm").attr("type");

if(type === "password"){
$("#confirm").attr("type","text");
}else{
$("#confirm").attr("type","password");
}

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
else if(password !== confirm){
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
$("#nameCount").text("0/50");
$("#strength").css("width","0%");
$("#strengthText").text("");

}

});

});