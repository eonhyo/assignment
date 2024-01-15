import { loginFunc, loginWithGoogle, signUpFunc, onAuthStateChanged, auth } from "./firebase.js";
import {
  validationChecker,
  goToAnotherPage,
  removeText,
  showText,
  getLocalStorage,
  setLocalStorage
} from "../common/module.js";

//스토리지에 유저이름이 저장돼 있으면 홈으로 이동한다.
if (getLocalStorage("userName")) {
  console.log(getLocalStorage("userName"));
  goToAnotherPage("/");
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

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // 사용자가 로그인한 경우
//     console.log("사용자가 로그인함:", user.uid);
//     goToAnotherPage("/");
//   } else {
//     console.log("사용자 로그인 안 함");
//     removeLoading();
//   }
// });

const nameErr = document.getElementById("name-error");
const emailErr = document.getElementById("email-error");
const passwordErr = document.getElementById("pw-error");
const errorArray = [nameErr, emailErr, passwordErr];

const nameEl = document.getElementById("signUp-name");
const emailEl = document.getElementById("signUp-email");
const passwordEl = document.getElementById("signUp-password");
const infoArray = [nameEl, emailEl, passwordEl];

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

document.getElementById("signUp-button").addEventListener("click", (event) => {
  event.preventDefault();
  resetErrorMsg();
  const name = nameEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;

  //내부로직에 의한 유효성검사가 끝나면 회원가입 후 로그인한다.
  validationCheck(name, email, password)
    ? signUpFunc(email, password, name)
        .then((result) => {
          if (result) {
            loginFunc(email, password);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    : null;
});

document.getElementById("google-login-btn").addEventListener("click", (event) => {
  {
    event.preventDefault();
    loginWithGoogle();
    addLoading();
    setLocalStorage("login", "true");
  }
});
