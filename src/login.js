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
  // if (window.location.href.includes("/sub/test")) {
  //   return;
  // }

  if (user) {
    // 사용자가 로그인한 경우
    console.log("사용자가 로그인함:", user.uid);
    setLocalStorage("userName", user.displayName);
    setLocalStorage("userPhoto", user.photoURL);

    goToAnotherPage("/");
  } else {
    console.log("사용자가 로그아웃함");
    removeLoading();
  }
});

//스토리지에 유저이름이 저장돼 있으면 홈으로 이동한다.
if (localStorage.getItem("userName") !== "null") {
  // goToAnotherPage("/");
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
};

const failLogin = () => {
  console.log("로그인에 실패 하셨습니다.");
};

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
    addLoading();
    setLocalStorage("login", "true");
  }
});

document.getElementById("github-login-btn").addEventListener("click", (event) => {
  {
    event.preventDefault();
    loginWithGithub();
    addLoading();
    setLocalStorage("login", "true");
  }
});
