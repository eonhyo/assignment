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

// const authStateSubscription = onAuthStateChanged(auth, (user) => {
//   if (window.location.href.includes("/sub/test")) {
//     return;
//   }
//   if (user) {
//     // 사용자가 로그인한 경우
//     console.log("사용자가 로그인함:", user.uid);
//     goToAnotherPage("../sub/test");
//   } else {
//     // 사용자가 로그아웃한 경우
//     console.log("사용자가 로그아웃함");
//   }
// });

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
    } catch (updateError) {
      console.error("Error updating user profile: ", updateError);
    }
  } catch (error) {
    console.error("Error uploading profile picture: ", error);
  }
};
const imgSrc = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.floor(Math.random() * 100)}`;

export const updateUserName = (name) => {
  updateProfile(auth.currentUser, { displayName: name })
    .then(() => {
      console.log("프로필 업데이트 성공");
    })
    .catch((error) => {
      console.log("error");
    });
};

export const signUpFun = (email, password, name, success, fail) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("성공");
      // const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name, photoURL: imgSrc }).then(() => {
        success();
      });

      // ...
    })
    .catch((error) => {
      console.log(error.message);
      fail();
      // ...
    });
};

export const loginFunc = (email, password, success, fail) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      setLocalStorage("userName", user.displayName);
      setLocalStorage("userPhoto", user.photoURL);
      success();
      // callback();

      //goToAnotherPage("/");
      // ...
    })
    .catch((error) => {
      if (fail) {
        fail();
      }
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
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

export const signOutFunc = (callback) => {
  auth
    .signOut()
    .then(() => {
      callback();
      console.log("로그아웃 성공");
    })
    .catch((error) => {
      console.log("로그아웃 실패");
    });
};
