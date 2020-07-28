import dom from "./dom";

export default (function() {

  function validate(form) {
    const inputs = form.querySelectorAll('input:not([type="submit"]');
    inputs.forEach(input => {
      if (input.validity.valueMissing) {
        return dom.showTip(input, "This field is required");
      }

      if (input.validity.tooLong) {
        const maxLength = input.getAttribute("maxLength");
        return dom.showTip(input, `${maxLength} characters is the limit`);
      }
    });
  }

  return {
    validate,
  };
})();