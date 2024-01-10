import { getUserProfile, loginFunc, signOutFunc } from "./firebase.js";
import { authFunc, showText } from "./module.js";

const emailEl = document.getElementById("signIn-email");
const passwordEl = document.getElementById("signIn-password");
const infoArray = [emailEl, passwordEl];

const emailErr = document.getElementById("signIn-email");
const passwordErr = document.getElementById("signIn-pw-error");
const errorArray = [emailErr, passwordErr];

const resetError = () => {
  errorArray.forEach((el) => {
    removeText(el);
  });
};

infoArray.forEach((info, i) => {
  info.addEventListener("input", (e) => {
    console.log("haha");
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
    showText(emailErr, "이메일를 입력하세요");
    isAuth = false;
  }

  if (authFunc.isBlankText(password)) {
    showText();
  }

  if (password.length < 6) {
    return;
  }

  loginFunc(email, password, signIn, signOut);
});

document.getElementById("signOut").addEventListener("click", (event) => {
  signOutFunc(signOut);
});

const signIn = () => {
  console.log("signIn 하셨습니다.");
};

const signOut = () => {
  console.log("signout 하셨습니다.");
};
