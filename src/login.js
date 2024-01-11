import { loginFunc } from "./firebase.js";
import { authFunc, goToAnotherPage, removeText, showText } from "./module.js";

if (localStorage.getItem("userName")) {
  //goToAnotherPage("../sub/test");
}

const emailEl = document.getElementById("signIn-email");
const passwordEl = document.getElementById("signIn-password");
const infoArray = [emailEl, passwordEl];

const emailErr = document.getElementById("signIn-email-error");
const passwordErr = document.getElementById("signIn-pw-error");
const errorArray = [emailErr, passwordErr];

const resetError = () => {
  errorArray.forEach((el) => {
    removeText(el);
  });
};

infoArray.forEach((info, i) => {
  info.addEventListener("input", (e) => {
    e.target.value ? removeText(errorArray[i]) : "";
  });
});

document.getElementById("signIn-button").addEventListener("click", (event) => {
  event.preventDefault();
  resetError();
  const email = emailEl.value;
  const password = passwordEl.value;
  let isAuth = true;

  if (!authFunc.emailCheck(email)) {
    showText(emailErr, "유효하지 않은 이메일입니다.");
    isAuth = false;
  }

  if (authFunc.isBlankText(email)) {
    showText(emailErr, "이메일를 입력하세요.");
    isAuth = false;
  }

  if (password.length < 6) {
    showText(passwordErr, "길이는 6자 이상 입력해 주세요.");
    isAuth = false;
  }

  if (authFunc.isBlankText(password)) {
    showText(passwordErr, "비밀번호를 입력하세요.");
    isAuth = false;
  }

  isAuth ? loginFunc(email, password, successLogin, failLogin) : null;
});

// document.getElementById("signOut").addEventListener("click", (event) => {
//   signOutFunc(signOut);
// });

const successLogin = () => {
  console.log("signIn 하셨습니다.");
  goToAnotherPage("../sub/test");
};

const failLogin = () => {
  console.log("로그인에 실패 하셨습니다.");
  showText(passwordErr, "유효하지 않은 아이디입니다");
};
