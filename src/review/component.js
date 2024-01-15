class StarRating {
  constructor() {
    this.stars = document.querySelectorAll(".getstar .star");
    this.starIcons = document.querySelectorAll(".getstar .staricon i");
    this.initialize();
  }
  initialize() {
    // 별점
  }
}

class AspectPoints {
  constructor() {
    this.aspects = document.getElementById("aspects");
    // 감상포인트
  }
}

class EmotionPoints {
  constructor() {
    this.emotions = document.getElementById("emotions");
  }
}

class PersonalInfo {
  constructor() {
    this.nameInput = document.getElementById("name");
    this.passwordInput = document.getElementById("password");
    this.ref = document.getElementById("required");
  }
}

class Modal {
  constructor() {
    this.modal = document.getElementById("myModal");
  }
}

class Impressions {
  constructor() {
    this.impressionsInput = document.getElementById("impressions");
  }
}

class ReviewList {
  constructor() {
    this.reviewList = document.getElementById("reviewlist");
    // 리뷰 목록
  }
}

class OpenButton {
  constructor() {
    this.openButton = document.getElementById("open");
  }
}

class SubmitButton {
  constructor() {
    this.submitButton = document.getElementById("submit");
  }
}

class CloseButton {
  constructor() {
    this.closeButton = document.getElementById("close");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const starRating = new StarRating();
  const aspectPoints = new AspectPoints();
  const emotionPoints = new EmotionPoints();
  const personalInfo = new PersonalInfo();
  const modal = new Modal();
  const impressions = new Impressions();
  const reviewList = new ReviewList();
  const openButton = new OpenButton();
  const submitButton = new SubmitButton();
  const closeButton = new CloseButton();
});
