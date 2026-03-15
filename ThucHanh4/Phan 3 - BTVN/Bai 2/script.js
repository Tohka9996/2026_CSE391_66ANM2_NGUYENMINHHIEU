let steps = document.querySelectorAll(".step");
let current = 0;

function showStep(index){

steps.forEach(step => step.classList.remove("active"));
steps[index].classList.add("active");

document.getElementById("progressBar").style.width =
((index + 1) / steps.length) * 100 + "%";

}

function validateStep1(){

let name = document.getElementById("name").value.trim();
let birth = document.getElementById("birth").value;
let gender = document.getElementById("gender").value;

let valid = true;

if(name === ""){
document.getElementById("nameError").innerText="Vui lòng nhập họ tên!";
valid = false;
}else{
document.getElementById("nameError").innerText="";
}

if(birth === ""){
document.getElementById("birthError").innerText="Vui lòng chọn ngày sinh!";
valid = false;
}else{
document.getElementById("birthError").innerText="";
}

if(gender === ""){
document.getElementById("genderError").innerText="Vui lòng chọn giới tính!";
valid = false;
}else{
document.getElementById("genderError").innerText="";
}

return valid;

}

function validateStep2(){

let email = document.getElementById("email").value.trim();
let pass = document.getElementById("password").value;
let confirm = document.getElementById("confirm").value;

let valid = true;

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;

if(!emailRegex.test(email)){
document.getElementById("emailError").innerText="Email không hợp lệ!";
valid = false;
}else{
document.getElementById("emailError").innerText="";
}

if(!passRegex.test(pass)){
document.getElementById("passError").innerText="Mật khẩu phải có chữ hoa, số và kí tự đặc biệt!";
valid = false;
}else{
document.getElementById("passError").innerText="";
}

if(pass !== confirm){
document.getElementById("confirmError").innerText="Mật khẩu xác nhận không khớp!";
valid = false;
}else{
document.getElementById("confirmError").innerText="";
}

return valid;

}

/* NEXT STEP 1 */

document.getElementById("next1").onclick = function(){

if(validateStep1()){
current = 1;
showStep(current);
}

}

/* BACK STEP 1 */

document.getElementById("back1").onclick = function(){

current = 0;
showStep(current);

}

/* NEXT STEP 2 */

document.getElementById("next2").onclick = function(){

if(validateStep2()){

current = 2;
showStep(current);

/* Lấy dữ liệu */

let name = document.getElementById("name").value;
let birth = document.getElementById("birth").value;
let gender = document.getElementById("gender").selectedOptions[0].text;
let email = document.getElementById("email").value;

/* Hiển thị */

let summary = `
<p><b>Họ tên:</b> ${name}</p>
<p><b>Ngày sinh:</b> ${birth}</p>
<p><b>Giới tính:</b> ${gender}</p>
<p><b>Email:</b> ${email}</p>
`;

document.getElementById("summary").innerHTML = summary;

}

}

/* BACK STEP 2 */

document.getElementById("back2").onclick = function(){

current = 1;
showStep(current);

}

/* SELECT2 DROPDOWN CÓ ẢNH */

$(document).ready(function(){

function formatOption(option){

if(!option.id){
return option.text;
}

let img = $(option.element).data("img");

if(img){
return $(
'<span><img src="'+img+'" width="20" style="margin-right:8px;">'+option.text+'</span>'
);
}

return option.text;

}

$("#gender").select2({
templateResult: formatOption,
templateSelection: formatOption
});

});

document.getElementById("form").onsubmit = function(e){

e.preventDefault(); // không reload ngay

document.getElementById("successPopup").style.display = "flex";

}

document.getElementById("doneBtn").onclick = function(){

location.reload(); // reload trang

}