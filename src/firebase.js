// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { goToAnotherPage, setLocalStorage } from "./module.js";
import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT-GYhfxoM2RBEi0kR1b8j_QoBZqr5rWc",
  authDomain: "teamprj1-movie.firebaseapp.com",
  projectId: "teamprj1-movie",
  storageBucket: "teamprj1-movie.appspot.com",
  messagingSenderId: "128531997875",
  appId: "1:128531997875:web:0b9d7c1d2ab00a2c377cc6",
  measurementId: "G-2FFV7FX67J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("auth", auth);

export { onAuthStateChanged };

export const uploadProfileImg = async (file) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, "profilePictures/" + auth.currentUser.uid);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    // 업로드 완료 후 파일의 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);
    // 사용자 프로필 업데이트
    try {
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });
      console.log("User profile updated successfully");
      return true;
    } catch (updateError) {
      console.error("Error updating user profile: ", updateError);
      return false;
    }
  } catch (error) {
    console.error("Error uploading profile picture: ", error);
  }
  return false;
};
const imgSrc = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.floor(Math.random() * 100)}`;

export const updateUserInfo = async (name, profile) => {
  try {
    if (profile) {
      await updateProfile(auth.currentUser, { displayName: name, photoURL: profile });
    } else {
      await updateProfile(auth.currentUser, { displayName: name });
    }

    console.log("success");
    return true;
  } catch (error) {
    console.log("error");
    return false;
  }
};

export const signUpFunc = async (email, password, name, success, fail) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    updateUserInfo(name, imgSrc);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginFunc = async (email, password, success, fail) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setLocalStorage("userName", auth.currentUser.displayName);
    setLocalStorage("userPhoto", auth.currentUser.photoURL);
    goToAnotherPage("/");
    //success();
  } catch (error) {
    console.log(error.message);
    alert("유효하지 않은 아이디입니다");
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    // Google 로그인 페이지로 리디렉션
    await signInWithRedirect(auth, provider);

    // 로그인 결과 얻기
    const result = await getRedirectResult(auth);

    if (result.user) {
      console.log("Google 로그인 성공:", result.user);
    } else {
      console.log("Google 로그인 실패:", result);
    }
  } catch (error) {
    console.error("Google 로그인 오류:", error);
  }
};

export const loginWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    await new signInWithRedirect(auth, provider);

    const result = await getRedirectResult(auth);
    if (result.user) {
      console.log("Githb 로그인 성공:", result.user);
    } else {
      console.log("Github 로그인 실패:", result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const signOutFunc = async (callback) => {
  try {
    await auth.signOut();
    callback();
    console.log("로그아웃 성공");
  } catch (error) {
    console.log("로그아웃 실패");
  }
};
