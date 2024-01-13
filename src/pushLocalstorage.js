import updateReviewList from "./statelist.js";

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

function getSelectedStars() {
  const checkedStar = document.querySelector(".getstar .star:checked");
  if (!checkedStar) {
    return "";
  }
  const score = parseInt(checkedStar.id.replace("star", ""), 10);
  let starImages = "";
  for (let i = 0; i < score / 2; i++) {
    starImages += '<img src="../assets/main/star-solid.svg" alt="star" />';
  }
  return starImages + ` ${score}점`;
}

function getSelectedAspects() {
  return Array.from(document.querySelectorAll(".aspects .aspect-item.active"))
    .map((el) => `#${el.textContent}`)
    .join(", ");
}

function getSelectedEmotions() {
  return Array.from(document.querySelectorAll(".emotions .emotion-item.active"))
    .map((el) => `#${el.textContent}`)
    .join(", ");
}

document.addEventListener("DOMContentLoaded", function () {
  const modalInstance = new Modal();
  const closeButton = new CloseButton(modalInstance);
  const personalInfo = new PersonalInfo();
  const submitButton = document.getElementById("submit");
  if (!submitButton) {
    console.error("Submit button not found");
    return;
  }
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (personalInfo.validateName() && personalInfo.validatePassword()) {
      saveReview();
    } else {
      alert("입력한 정보를 다시 확인해주세요.");
    }
  });
  function saveReview() {
    const reviewData = {
      movie_id: itemId,
      name: document.getElementById("name").value,
      password: document.getElementById("password").value,
      impressions: document.getElementById("impressions").value,
      stars: getSelectedStars(),
      aspects: getSelectedAspects(),
      emotions: getSelectedEmotions(),
      date: new Date().toLocaleDateString("ko-KR")
    };
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    updateReviewList(itemId);
    closeButton.closeModal();
  }
});
