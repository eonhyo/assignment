import { signOutFunc } from "./firebase.js";
import { goToAnotherPage } from "./module.js";

const signOut = document.getElementById("signOut");

signOut.addEventListener("click", () => {
  signOutFunc(goToAnotherPage("../sub/login"));
});

if (localStorage.getItem("userName")) {
  const userName = localStorage.getItem("userName");

  const welcome = document.querySelector(".welcome");
  welcome.textContent = `${userName}님 환영합니다`;
}
