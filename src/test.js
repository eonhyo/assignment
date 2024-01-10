import { signOutFunc } from "./firebase.js";
import { goToAnotherPage } from "./module.js";

const signOut = document.getElementById("signOut");

signOut.addEventListener("click", () => {
  signOutFunc(goToAnotherPage("../sub/login"));
  if (localStorage.getItem("userName")) {
    localStorage.removeItem("userName");
  }
});

if (localStorage.getItem("userName")) {
  const userName = localStorage.getItem("userName");
  console.log(localStorage.getItem("userPhoto"));
  const welcome = document.querySelector(".welcome");
  welcome.textContent = `${userName}님 환영합니다`;
  const userImg = document.querySelector(".userImg");
  userImg.src = localStorage.getItem("userPhoto");
}
