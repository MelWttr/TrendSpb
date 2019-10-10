'use strict';

(function () {
  var reviewsContainer = document.querySelector(".reviews");
  var reviews = reviewsContainer.querySelectorAll(".review");
  var reviewsArray = Array.from(reviews);
  var paginationButtons = reviewsContainer.querySelectorAll(".pagination__button");

  var reviewBtnRight = reviewsContainer.querySelector(".reviews__button--right");
  var reviewBtnLeft = reviewsContainer.querySelector(".reviews__button--left");
  var animationInName = "";
  var animationOutName = "";

  var reviewBtnClickHandler = (evt) => {
    let activeReview = reviewsContainer.querySelector(".review--active");
    let index = reviewsArray.indexOf(activeReview);
    let newActiveReview;
    paginationButtons[index].classList.remove("pagination__button--selected");
    if (evt.target.classList.contains("reviews__button--right")) {
      if (index === reviews.length - 1) {
        index = -1;
      }
      index++;
      newActiveReview = reviews[index];
      animationInName = "fadeInRight";
      animationOutName = "fadeOutLeft";
    } else if (evt.target.classList.contains("reviews__button--left")) {
      if (index === 0) {
        index = reviews.length;
      }
      index--;
      newActiveReview = reviews[index];
      animationInName = "fadeInLeft";
      animationOutName = "fadeOutRight";
    }
    animationFinisher(activeReview, newActiveReview, animationInName, animationOutName);
    paginationButtons[index].classList.add("pagination__button--selected");
  }

  reviewBtnRight.addEventListener("click", reviewBtnClickHandler);
  reviewBtnLeft.addEventListener("click", reviewBtnClickHandler);

  var paginationBtnClick = function (paginationBtn, reviewItem) {
    let paginationBtnClickHandler = () => {
      if (!paginationBtn.classList.contains("pagination__button--selected")) {
        let activeReview = document.querySelector(".review--active");
        let selectedButton = document.querySelector(".pagination__button--selected");
        if (+selectedButton.dataset.id > +paginationBtn.dataset.id) {
          animationInName = "fadeInLeft";
          animationOutName = "fadeOutRight";
        } else if (+selectedButton.dataset.id < +paginationBtn.dataset.id) {
          animationInName = "fadeInRight";
          animationOutName = "fadeOutLeft";
        }
        animationFinisher(activeReview, reviewItem, animationInName, animationOutName);
        selectedButton.classList.remove("pagination__button--selected");
        paginationBtn.classList.add("pagination__button--selected");
      }
    };
    paginationBtn.addEventListener("click", paginationBtnClickHandler);
  };

  var animationFinisher = function (oldReview, newReview, animationIn, animationOut) {
    let animationEndHandler = () => {
      oldReview.classList.remove("review--active", animationOut);
      newReview.classList.add("review--active", animationIn);
      newReview.addEventListener("animationend", () => {
        newReview.classList.remove(animationIn);
      });
      oldReview.removeEventListener("animationend", animationEndHandler);
    };
    oldReview.classList.add(animationOut);
    oldReview.addEventListener("animationend", animationEndHandler);
  };

  for (let i = 0; i < paginationButtons.length; i++) {
    paginationBtnClick(paginationButtons[i], reviews[i]);
  }

})();