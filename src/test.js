import { signOutFunc, udpateUserProfile } from "./firebase.js";
import { getLocalStorage, goToAnotherPage, removeLocalStorage, setLocalStorage } from "./module.js";

const signOut = document.getElementById("signOut");

//로그아웃 누르면 로컬스토리지 값 제거
signOut.addEventListener("click", () => {
  if (getLocalStorage("userName")) {
    removeLocalStorage("userName");
    removeLocalStorage("userPhoto");
  }

  signOutFunc(goToAnotherPage("../sub/login"));
});

//로그인해서 들어오면 로컬스토리지에 저장된 값 가져오기
if (getLocalStorage("userName")) {
  const nameEl = document.querySelector("#name");
  const userImg = document.querySelector(".userImg");
  nameEl.value = getLocalStorage("userName");
  userImg.src = getLocalStorage("userPhoto");
}

//사진 업로드 기능 구현중
document.querySelector("#inputImage").addEventListener("change", (e) => {
  let selectFile = e.target.files;
  if (selectFile.length > 0) {
    const [imageFile] = selectFile;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const srcData = fileReader.result;
      document.querySelector(".userImg").src = srcData;
      setLocalStorage("userPhoto", srcData);
    };
    fileReader.readAsDataURL(imageFile);
  }
});

//확인버튼 누르면 파이어베이스 유저 프로필 업데이트
document.getElementById("confirm").addEventListener("click", () => {
  const userName = document.querySelector("#name").value;
  const userImg = document.querySelector(".userImg").src;
  udpateUserProfile(userName, userImg);
  setLocalStorage("userName", userName);
  setLocalStorage("userPhoto", userImg);
});
