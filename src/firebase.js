// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
console.log("hello world");

export const signUpFun = (email, password, name, success, error) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("성공");
      const user = userCredential.user;
      console.log("userInfo", user);
      updateProfile(auth.currentUser, { displayName: name });
      // success();
      // ...
    })
    .catch((error) => {
      console.log("error");
      const errorCode = error.code;
      const errorMessage = error.message;
      error();
      // ...
    });
};

export const loginFunc = (email, password, success, fail) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem("userName", user.displayName);
      success();
      // callback();

      //goToAnotherPage("/");
      // ...
    })
    .catch((error) => {
      fail();
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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
