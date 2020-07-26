
export default (function() {

  function title(str, maxLength = 20) {
    const regex = /^[a-z0-9]+([\s?\-?_?]?[a-z0-9]+)*$/i;
    return regex.test(str) && str.length <= maxLength;
  }

  return {
    title,
  };
})();

