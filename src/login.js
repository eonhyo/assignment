import { loginFunc, loginWithGoogle, auth, onAuthStateChanged, loginWithGithub } from "./firebase.js";
import {
  validationChecker,
  goToAnotherPage,
  removeText,
  showText,
  setLocalStorage,
  getLocalStorage
} from "./module.js";

const addLoading = () => {
  console.log("loading...");
  const main = document.querySelector(".mainHolder");
  main.style.display = "none";
  const loading = document.querySelector(".loader");
  loading.style.display = "block";
};

const removeLoading = () => {
  const main = document.querySelector(".mainHolder");
  main.style.display = "block";
  const loading = document.querySelector(".loader");
  loading.style.display = "none";
};

if (getLocalStorage("login") === "true") {
  addLoading();
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // 사용자가 로그인한 경우
    console.log("사용자가 로그인함:", user.uid);
    goToAnotherPage("/");
  } else {
    console.log("사용자 로그인 안 했음");
    removeLoading();
  }
});

const emailEl = document.getElementById("signIn-email");
const passwordEl = document.getElementById("signIn-password");
const infoArray = [emailEl, passwordEl];

const emailErr = document.getElementById("signIn-email-error");
const passwordErr = document.getElementById("signIn-pw-error");
const errorArray = [emailErr, passwordErr];

//유효성 검사 에러 메세지 한번에 지우기
const resetErrorMsg = () => {
  errorArray.forEach((el) => {
    removeText(el);
  });
};

//인풋에 뭔가 입력할 땐 에러가 안 뜨게
infoArray.forEach((info, i) => {
  info.addEventListener("input", (e) => {
    e.target.value ? removeText(errorArray[i]) : "";
  });
});

//유효성 검사 로직
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

document.getElementById("signIn-button").addEventListener("click", (event) => {
  event.preventDefault();
  resetErrorMsg();
  const email = emailEl.value;
  const password = passwordEl.value;

  //내부로직에 의한 유효성검사가 끝나면 로그인 함수를 실행한다.
  validationCheck(email, password) ? loginFunc(email, password) : null;
});

//구글 로그인 함수
document.getElementById("google-login-btn").addEventListener("click", (event) => {
  {
    event.preventDefault();
    loginWithGoogle();
    addLoading();
    setLocalStorage("login", "true");
  }
});

//깃헙 로그인 함수. 현재 쓰지 않음
// document.getElementById("github-login-btn").addEventListener("click", (event) => {
//   {
//     event.preventDefault();
//     loginWithGithub();
//     addLoading();
//     setLocalStorage("login", "true");
//   }
// });
