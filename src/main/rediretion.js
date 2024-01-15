const mask = document.querySelector(".mask");
const html = document.querySelector("html");

html.style.overflow = "hidden"; //로딩 중 스크롤 방지
window.addEventListener("load", function () {
  setTimeout(function () {
    html.style.overflow = "auto"; //스크롤 방지 해제
    mask.style.display = "none";
  }, 1000);
});
