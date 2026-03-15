const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000,
"Áo + Quần":350000,
"Áo + Quần + Giày":850000
};

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const delivery = document.getElementById("delivery");
const address = document.getElementById("address");
const note = document.getElementById("note");

const total = document.getElementById("total");
const charCount = document.getElementById("charCount");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");

const success = document.getElementById("success");


function showError(id,msg){
document.getElementById(id).textContent = msg;
}

function clearError(id){
document.getElementById(id).textContent="";
}


function calcTotal(){

const p = product.value;
const q = Number(quantity.value);

if(prices[p] && q>0){
let sum = prices[p] * q;
total.textContent = sum.toLocaleString("vi-VN");
}else{
total.textContent = "0";
}

}


product.addEventListener("change",calcTotal);
quantity.addEventListener("input",calcTotal);


product.addEventListener("change",()=>clearError("productError"));
quantity.addEventListener("input",()=>clearError("quantityError"));
delivery.addEventListener("change",()=>clearError("deliveryError"));
address.addEventListener("input",()=>clearError("addressError"));

document.querySelectorAll("input[name='pay']").forEach(el=>{
el.addEventListener("change",()=>clearError("payError"));
});


note.addEventListener("input",function(){

let len = note.value.length;

charCount.textContent = len + "/200";

if(len > 200){

charCount.style.color = "red";
showError("noteError","Ghi chú tối đa 200 ký tự");

}else{

charCount.style.color = "black";
clearError("noteError");

}

});


document.getElementById("orderForm").addEventListener("submit",function(e){

e.preventDefault();

let valid = true;


if(product.value === ""){
showError("productError","Hãy chọn sản phẩm");
valid=false;
}else clearError("productError");


let q = Number(quantity.value);

if(!Number.isInteger(q) || q < 1 || q > 99){
showError("quantityError","Số lượng 1-99");
valid=false;
}else clearError("quantityError");


let today = new Date();
today.setHours(0,0,0,0);

if(delivery.value === ""){
showError("deliveryError","Chọn ngày giao hàng");
valid=false;
}else{

let parts = delivery.value.split("-");
let d = new Date(parts[0], parts[1]-1, parts[2]);

let max = new Date(today);
max.setDate(today.getDate()+30);

if(d < today || d > max){
showError("deliveryError","Ngày giao không hợp lệ");
valid=false;
}else{
clearError("deliveryError");
}

}


if(address.value.trim().length < 10){
showError("addressError","Địa chỉ ≥10 ký tự");
valid=false;
}else clearError("addressError");


let pay = document.querySelector("input[name='pay']:checked");

if(!pay){
showError("payError","Chọn phương thức thanh toán");
valid=false;
}else clearError("payError");


if(valid){

let parts = delivery.value.split("-");
let dateVN = parts[2] + "/" + parts[1] + "/" + parts[0];

summary.innerHTML =
"Sản phẩm: " + product.value +
"<br>Số lượng: " + quantity.value +
"<br>Tổng tiền: " + total.textContent + " VNĐ" +
"<br>Ngày giao: " + dateVN;

confirmBox.style.display = "block";

}

});


document.getElementById("confirmBtn").onclick = function(){

success.style.display = "block";
confirmBox.style.display = "none";

}


document.getElementById("cancelBtn").onclick = function(){

confirmBox.style.display = "none";

}