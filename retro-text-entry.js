
(function () {

  var firstRun = true;

  function setupStylesheets () {

    var style = document.createElement('style');

    document.head.appendChild(style);

    style.sheet.insertRule(
      'span.retro-text-entry-cursor {' +
      '  -webkit-animation: retro-text-entry-animation 330ms infinite;' +
      '  overflow: visible; width: 0px;' +
      '}'
    );

    style.sheet.insertRule(
      '@-webkit-keyframes retro-text-entry-animation {' +
      '   0% { opacity: 1; }' +
      '  50% { opacity: 1; }' +
      '  80% { opacity: 0; }' +
      '  95% { opacity: 0; }' +
      '}'
    );

  }

  window.retroTextEntry = function (element, opts, cb) {

    if (firstRun) {
      setupStylesheets();
      firstRun = false;
    }

    if ((element instanceof Element) === false) {
      throw new TypeError(element + ' is not a Element');
    }

    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    if (typeof opts === 'undefined') {
      opts = {};
    }

    if (typeof opts !== 'object') {
      throw new TypeError(opts + ' is not a Object');
    }

    var body = document.body;
    var cursorChar = opts.cursor || '\u258c';
    var input = opts.input || '';
    var maxLength = opts.maxLength || Infinity;
    var text = document.createElement('span');
    var cursor = document.createElement('span');

    var transformText = function (str) {

      if (opts.makeUpperCase) {
        str = str.toUpperCase();
      }

      return str;
    }

    var onKeyPress = function (e) {

      if (e.keyCode === 13) {
        return done();
      }

      if (e.keyCode === 8) {
        input = input.substring(0, input.length - 1);
      }

      if (input.length < maxLength) {

        if (e.keyCode >= 0x20 && e.keyCode <= 0x7e) {
          input += transformText(String.fromCharCode(e.keyCode));
        }

        if (e.keyCode >= 0x00a1 && e.keyCode <= 0x02af){
          input += transformText(String.fromCharCode(e.keyCode));
        }

      }

      text.textContent = input;

    };

    var done = function () {

      var tn = document.createTextNode(input);

      body.removeEventListener('keypress', onKeyPress);
      element.replaceChild(tn, text);
      element.removeChild(cursor);

      cb && cb(input);
    };

    text.className = 'retro-text-entry-text';
    cursor.className = 'retro-text-entry-cursor';

    text.textContent = input;
    cursor.textContent = cursorChar;

    element.appendChild(text);
    element.appendChild(cursor);

    body.addEventListener('keypress', onKeyPress);

  };

}());
