class StarRating {
  constructor() {
    this.stars = document.querySelectorAll(".getstar .star");
    this.starIcons = document.querySelectorAll(".getstar .staricon");
    this.initialize();
  }

  initialize() {
    this.stars.forEach((star, index) => {
      star.addEventListener("change", () => this.updateStars(index));
    });
  }

  updateStars(selectedIndex) {
    let score = 0;
    this.starIcons.forEach((icon, index) => {
      if (index <= selectedIndex) {
        icon.classList.add("filled");
        score += 2;
      } else {
        icon.classList.remove("filled");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const starRating = new StarRating();
});
