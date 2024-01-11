// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setLocalStorage } from "./module.js";

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

const imgSrc = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.floor(Math.random() * 100)}`;

export const udpateUserProfile = (name, photo) => {
  updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
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
    await new signInWithRedirect(auth, provider);
    const result = await getRedirectResult(authService);
    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginWithGithub = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await new signInWithPopup(auth, provider);
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
