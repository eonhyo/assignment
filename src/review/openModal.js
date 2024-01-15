class OpenButton {
  constructor(modal) {
    this.openButton = document.getElementById("open");
    this.modal = modal;
    this.addEventListeners();
  }

  addEventListeners() {
    this.openButton.addEventListener("click", (event) => {
      this.openModal(event);
    });
  }

  openModal(event) {
    event.preventDefault();
    this.modal.showModal();
  }
}

class Modal {
  constructor() {
    this.modal = document.getElementById("myModal");
  }

  showModal() {
    this.modal.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modalInstance = new Modal();
  const openButtonInstance = new OpenButton(modalInstance);
});
