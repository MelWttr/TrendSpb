'use strict';
const ESC_KEYCODE = 27;
var nav = document.querySelector(".navigation");
var navToggle = document.querySelector(".navigation__toggle");

nav.classList.remove("navigation--nojs");

navToggle.addEventListener("click", function () {
  nav.classList.toggle("navigation--closed", "navigation--opened");
  nav.classList.toggle("navigation--opened");
});

var questions = document.querySelectorAll(".questions__question");
var questionClickHandler = function (evt) {
  evt.target.classList.toggle("questions__question--active")
};

questions.forEach((question) => {
  question.addEventListener("click", questionClickHandler);
});

var forms = document.querySelectorAll("form");

var fieldValidation = function (input) {
  let invalidities = [];

  let validity = input.validity;
  let type = input.type;

  if (validity.patternMismatch) {
    switch (type) {
      case "text":
        invalidities.push("Допустимы только буквы и пробелы");
        break;
      case "tel":
        invalidities.push("Допустимы только цифры");
        break;
    }
  }

  if (validity.tooShort || validity.tooLong) {
    let min = input.minLength;
    let max = input.maxLength;
    invalidities.push("Поле должно содержать от " + min + " до " + max + " символов");
  }

  if (validity.valueMissing) {
    invalidities.push("Поле обязательно для заполнения");
  }


  return invalidities.join('. \n');
};

var checkValidity = function (form) {
  let fields = form.querySelectorAll("input:not(#checkbox-1)");
  let submit = form.querySelector("button[type='submit']");

  submit.addEventListener("click", function () {
    fields.forEach(field => {
      if (!field.validity.valid) {
        field.setCustomValidity(fieldValidation(field));
      }
    });
  });
}

forms.forEach(form => {
  checkValidity(form);
});

var popupOpenClose = function (modalName, openButtonName) {
  var openButton = document.querySelector("." + openButtonName);
  var modalToShow = document.querySelector("." + modalName);
  var overlay = modalToShow.querySelector(".modal__overlay");
  var closeBtn = modalToShow.querySelector(".popup__button");

  var openPopup = function () {
    modalToShow.classList.remove("hidden");
    document.addEventListener("keydown", onPopupEscPress)
  };

  var closePopup = function () {
    modalToShow.classList.add("hidden");
    document.removeEventListener("keydown", onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  openButton.addEventListener("click", openPopup);
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup)
};

popupOpenClose("modal--order", "promo__button");
popupOpenClose("modal--order", "price-list__button");
popupOpenClose("modal--question", "questions__button");
popupOpenClose("modal--callback", "navigation__link--call");
