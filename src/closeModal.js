class CloseButton {
  constructor(modal) {
    this.closeButton = document.getElementById("close");
    this.modal = modal;
    this.addEventListeners();
  }

  addEventListeners() {
    this.closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.closeModal();
    });
  }

  closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";

    document.querySelectorAll(".getstar .star").forEach((star) => {
      star.checked = false;
    });

    document.getElementById("reviewform").reset();
    modal.querySelectorAll(".staricon.filled").forEach((icon) => {
      icon.classList.remove("filled");
    });
    modal.querySelectorAll(".aspect-item.active, .emotion-item.active").forEach((item) => {
      item.classList.remove("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modalInstance = new Modal();
  new CloseButton(modalInstance);
});
