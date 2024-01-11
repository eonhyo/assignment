import { loginFunc, loginWithGoogle, auth } from "./firebase.js";
import { validationChecker, goToAnotherPage, removeText, showText } from "./module.js";

//스토리지에 유저이름이 저장돼 있으면 홈으로 이동한다.
if (localStorage.getItem("userName")) {
  goToAnotherPage("../sub/test");
}

const emailEl = document.getElementById("signIn-email");
const passwordEl = document.getElementById("signIn-password");
const infoArray = [emailEl, passwordEl];

const emailErr = document.getElementById("signIn-email-error");
const passwordErr = document.getElementById("signIn-pw-error");
const errorArray = [emailErr, passwordErr];

const resetErrorMsg = () => {
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
  resetErrorMsg();
  const email = emailEl.value;
  const password = passwordEl.value;
  validationCheck(email, password) ? loginFunc(email, password, successLogin, failLogin) : null;
});

document.getElementById("google-login-btn").addEventListener("click", (event) => {
  {
    event.preventDefault();
    loginWithGoogle();
  }
});

const validationCheck = (email, password) => {
  let isAuth = true;

  if (!validationChecker.emailCheck(email)) {
    showText(emailErr, "유효하지 않은 이메일입니다.");
    isAuth = false;
  }

  if (validationChecker.isBlankText(email)) {
    showText(emailErr, "이메일를 입력하세요.");
    isAuth = false;
  }

  if (password.length < 6) {
    showText(passwordErr, "길이는 6자 이상 입력해 주세요.");
    isAuth = false;
  }

  if (validationChecker.isBlankText(password)) {
    showText(passwordErr, "비밀번호를 입력하세요.");
    isAuth = false;
  }
  return isAuth;
};

const successLogin = () => {
  console.log("로그인 하셨습니다");
  goToAnotherPage("../sub/test");
};

const failLogin = () => {
  console.log("로그인에 실패 하셨습니다.");
};
