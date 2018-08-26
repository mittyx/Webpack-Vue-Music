"use strict";

module.exports = function (fontName, ttf) {
  return "@font-face {\n  font-style: normal;\n  font-weight: normal;\n  font-family: '" + fontName + "';\n  src: url('../icon/" + ttf + "') format('truetype');\n}\n";
};