const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");

btnHello.addEventListener("click", function () {
  statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";
});

document.body.style.backgroundColor = "lightblue";
document.body.style.fontSize = "20px";
btnRed.addEventListener("click", function () {
  document.body.style.backgroundColor = "red";
});

const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

nameInput.addEventListener("input", function () {
  const value = nameInput.value;
  greeting.textContent = "Xin chào, " + value + "!";
});

document.getElementById("btnHello").addEventListener("click", function () {
  alert("Hello from JS!");
});

$("#btnHello").on("click", function () {
  alert("Hello from jQuery!");
});
