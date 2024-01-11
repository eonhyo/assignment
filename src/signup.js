import { loginFunc, signUpFun } from "./firebase.js";
import { authFunc, goToAnotherPage, removeText, showText } from "./module.js";

const nameErr = document.getElementById("name-error");
const emailErr = document.getElementById("email-error");
const passwordErr = document.getElementById("pw-error");
const errorArray = [nameErr, emailErr, passwordErr];

const nameEl = document.getElementById("signUp-name");
const emailEl = document.getElementById("signUp-email");
const passwordEl = document.getElementById("signUp-password");
const infoArray = [nameEl, emailEl, passwordEl];

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

document.getElementById("signUp-button").addEventListener("click", (event) => {
  event.preventDefault();
  resetErrorMsg();
  const name = nameEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;

  let isAuth = true;
  if (authFunc.isBlankText(name)) {
    showText(nameErr, "이름을 입력하세요");
    isAuth = false;
  }
  if (!authFunc.emailCheck(email)) {
    showText(emailErr, "유효하지 않은 이메일입니다.");
    isAuth = false;
  }
  if (authFunc.isBlankText(email)) {
    showText(emailErr, "이메일을 입력하세요");
    isAuth = false;
  }

  if (password.length < 6) {
    showText(passwordErr, "길이는 6자 이상 입력해 주세요.");
    isAuth = false;
  }

  if (authFunc.isBlankText(password)) {
    showText(passwordErr, "패스워드를 입력하세요");
    isAuth = false;
  }

  isAuth ? signUpFun(email, password, name, successSignup, errorSignup) : null;
});

const successSignup = () => {
  const result = document.getElementById("signUp-result");
  //result.style.display = "block";
  //result.innerHTML = "회원가입에 성공했습니다";
  loginFunc(
    emailEl.value,
    passwordEl.value,
    () => {
      goToAnotherPage("../sub/test");
    },
    console.log("로그인에 실패하셨습니다.")
  );
};

const errorSignup = () => {
  const result = document.getElementById("signUp-result");
  //result.style.display = "block";
  //result.innerHTML = "회원가입에 실패했습니다";
};
