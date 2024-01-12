import { loginFunc, loginWithGoogle, signUpFun, onAuthStateChanged, auth } from "./firebase.js";
import {
  validationChecker,
  goToAnotherPage,
  removeText,
  showText,
  getLocalStorage,
  setLocalStorage
} from "./module.js";

//스토리지에 유저이름이 저장돼 있으면 홈으로 이동한다.
if (getLocalStorage("userName")) {
  goToAnotherPage("../sub/test");
}

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

const validationCheck = (name, email, password) => {
  let isAuth = true;
  if (validationChecker.isBlankText(name)) {
    showText(nameErr, "이름을 입력하세요");
    isAuth = false;
  }
  if (!validationChecker.emailCheck(email)) {
    showText(emailErr, "유효하지 않은 이메일입니다.");
    isAuth = false;
  }
  if (validationChecker.isBlankText(email)) {
    showText(emailErr, "이메일을 입력하세요");
    isAuth = false;
  }

  if (password.length < 6) {
    showText(passwordErr, "길이는 6자 이상 입력해 주세요.");
    isAuth = false;
  }

  if (validationChecker.isBlankText(password)) {
    showText(passwordErr, "패스워드를 입력하세요");
    isAuth = false;
  }

  return isAuth;
};

const successSignup = () => {
  loginFunc(
    emailEl.value,
    passwordEl.value,
    () => {
      goToAnotherPage("/");
    },
    console.log("로그인에 실패하셨습니다.")
  );
};

const errorSignup = () => {
  console.log("회원가입에 실패하셨습니다.");
};

document.getElementById("signUp-button").addEventListener("click", (event) => {
  event.preventDefault();
  resetErrorMsg();
  const name = nameEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;
  validationCheck(name, email, password) ? signUpFun(email, password, name, successSignup, errorSignup) : null;
});

document.getElementById("google-login-btn").addEventListener("click", (event) => {
  {
    event.preventDefault();
    loginWithGoogle();
    addLoading();
    setLocalStorage("login", "true");
  }
});
