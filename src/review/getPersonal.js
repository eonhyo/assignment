class PersonalInfo {
  constructor() {
    this.nameInput = document.getElementById("name");
    this.passwordInput = document.getElementById("password");
    this.errorMessage = document.getElementById("required");
    this.initialize();
  }

  initialize() {
    this.nameInput.addEventListener("input", () => this.validateName());
    this.passwordInput.addEventListener("input", () => this.validatePassword());
  }

  validateName() {
    const nameRegex = /^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
    if (!this.nameInput.value.match(nameRegex)) {
      this.errorMessage.style.display = "block";
      return false; // 유효성 검사 실패
    } else {
      this.errorMessage.style.display = "none";
      return true; // 유효성 검사 성공
    }
  }

  validatePassword() {
    const passwordRegex = /^\d+$/;
    if (!this.passwordInput.value.match(passwordRegex)) {
      this.errorMessage.style.display = "block";
      return false; // 유효성 검사 실패
    } else {
      this.errorMessage.style.display = "none";
      return true; // 유효성 검사 성공
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const personalInfo = new PersonalInfo();
});
