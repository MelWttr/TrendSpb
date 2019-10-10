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
