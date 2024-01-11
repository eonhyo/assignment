import { signOutFunc, udpateUserProfile } from "./firebase.js";
import { goToAnotherPage } from "./module.js";

const signOut = document.getElementById("signOut");

signOut.addEventListener("click", () => {
  signOutFunc(goToAnotherPage("../sub/login"));
  if (localStorage.getItem("userName")) {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");
  }
});

if (localStorage.getItem("userName")) {
  const userName = localStorage.getItem("userName");
  console.log(localStorage.getItem("userPhoto"));
  const welcome = document.querySelector(".welcome");
  welcome.textContent = `${userName}님 환영합니다`;
  const nameEl = document.querySelector("#name");
  nameEl.value = userName;
  const userImg = document.querySelector(".userImg");
  userImg.src = localStorage.getItem("userPhoto");
}

document.querySelector("#inputImage").addEventListener("change", (e) => {
  let selectFile = e.target.files;

  if (selectFile.length > 0) {
    const [imageFile] = selectFile;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const srcData = fileReader.result;
      console.log("base64", srcData);
      document.querySelector(".userImg").src = srcData;
      localStorage.setItem("userPhoto", srcData);
    };
    fileReader.readAsDataURL(imageFile);
    console.log();
    // document.querySelector(".userImg").src = fileReader.readAsDataURL(imageFile);
    // localStorage.setItem("userPhoto", fileReader.readAsDataURL(imageFile));
  }

  // const file = URL.createObjectURL(selectFile);
});

document.getElementById("confirm").addEventListener("click", () => {
  const userName = document.querySelector("#name").value;
  const userImg = document.querySelector(".userImg").src;
  udpateUserProfile(userName, userImg);
  localStorage.setItem("userName", userName);
  localStorage.setItem("userPhoto", userImg);
});
