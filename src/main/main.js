import { onAuthStateChanged, auth } from "../login/firebase.js";
import { goToAnotherPage, setLocalStorage } from "../common/module.js";

const API_KEY = "api_key=2f7ff395e001967bcd029e4d663de74c";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

//헤더 관련
const joinSection = document.querySelector(".joinWrap");
const profileSection = document.querySelector(".profileSection");

const showProfilePic = () => {
  profileSection.display = "flex";
  joinSection.style.display = "none";
};

const showJoinBtn = () => {
  joinSection.style.display = "flex";
  profileSection.style.display = "none";
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // 사용자가 로그인한 경우
    console.log("사용자가 로그인함:", user.uid);
    // 이름과 사진을 받아와서 스토리지에 저장
    setLocalStorage("userName", user.displayName);
    // 프로필 이미지에 뿌리기!
    setLocalStorage("userPhoto", user.photoURL);
    console.log(user.photoURL);
    const profileImg = document.querySelector(".profileImg");
    profileImg.src = user.photoURL;
    showProfilePic();
  } else {
    console.log("사용자가 로그아웃함");
    showJoinBtn();
  }
});

//편집 화면으로 이동
profileSection.addEventListener("click", () => {
  goToAnotherPage("../sub/profile");
});

getMovies(API_URL);

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    showMovies(data.results);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

// 이미지 슬라이드
const sliderContainer = document.querySelector(".slider-container");
let slideItems;
let currentSlide = 0;

const showMovies = (data) => {
  const clonedMovies = [...data];

  clonedMovies.slice(0, 6).forEach((movie) => {
    const { poster_path, title, vote_average } = movie;
    const slideItem = document.createElement("div");
    slideItem.classList.add("slide-item");

    const image = new Image();
    image.src = `${IMG_URL + poster_path}`;

    slideItem.appendChild(image);

    const slideImage = document.createElement("div");
    slideImage.classList.add("slide-image");
    slideItem.appendChild(slideImage);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");
    movieInfo.innerHTML = `<div class ="movieSimplyInfo">
    <div class="sliderMovie">
    <div class= "sprtaSeries"><span class="sparta">스파르타</span><span> 시리즈</span> </div>
    <div class= "movieTitle"><h3>${title}</h3></div>
    <div class="movieRating">
    <div class="star"><i class="fa-solid fa-star"></i><span>${vote_average}</span>
    </div>        
      </div>
    </div>
    </div>`;
    slideItem.appendChild(movieInfo);

    sliderContainer.appendChild(slideItem);

    lucide.createIcons();
  });

  slideItems = document.querySelectorAll(".slide-item");
  showSlide();
};

const showSlide = () => {
  const transformValue = -currentSlide * 100 + "%";
  sliderContainer.style.transform = `translateX(${transformValue})`;
};

const prevSlide = () => {
  currentSlide = currentSlide > 0 ? currentSlide - 1 : slideItems.length - 1;
  showSlide();
};

const nextSlide = () => {
  currentSlide = currentSlide < slideItems.length - 1 ? currentSlide + 1 : 0;
  showSlide();
};

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// 인기순, 이름순 정렬
const sortByRatingBtn = document.getElementById("sortByRating");
const sortByNameBtn = document.getElementById("sortByName");

sortByRatingBtn.addEventListener("click", () => {
  sortMoviesByRating();
});

sortByNameBtn.addEventListener("click", () => {
  sortMoviesByName();
});

let byRating = true;

function sortMoviesByRating() {
  const moviesContainer = document.getElementById("main");
  const movies = Array.from(moviesContainer.children);

  const sortedMovies = movies
    .map((movie) => ({
      element: movie,
      rating: Number(movie.querySelector(".green").textContent)
    }))
    .sort((a, b) => (byRating ? a.rating - b.rating : b.rating - a.rating))
    .map((movie) => movie.element);

  moviesContainer.innerHTML = "";
  sortedMovies.forEach((movie) => {
    moviesContainer.appendChild(movie);
  });
  byRating = !byRating;
}

let byName = true;

function sortMoviesByName() {
  const moviesContainer = document.getElementById("main");
  const movies = Array.from(moviesContainer.children);

  const sortedMovies = movies
    .map((movie) => ({
      element: movie,
      title: movie.querySelector(".movieinfo h3").textContent
    }))
    .sort((a, b) => (byName ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)))
    .map((movie) => movie.element);

  moviesContainer.innerHTML = "";
  sortedMovies.forEach((movie) => {
    moviesContainer.appendChild(movie);
  });
  byName = !byName;
}
