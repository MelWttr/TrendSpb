'use strict';

(function () {
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
})();