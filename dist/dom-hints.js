!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DomHints=t()}(this,(function(){"use strict";return{install:function(e,t){var n=(void 0===t?{}:t).attributeName,i=void 0===n?"__vue__":n,o=!1;e.mixin({mounted:function(){o||(console.info("[vue-dom-hints] 💁‍♀️ Inspect an element with the `"+i+"` attribute and enter `$0.__vue__` in your console to inspect the view model"),o=!0);var e=this.$el,t=this.$options.__file||this.$options.name;if(t||this.$parent||(t="App root"),t){var n=function(e,t){var n;return 1===e.nodeType?n=e.getAttribute(t):8===e.nodeType&&(n=e.textContent),n?JSON.parse(n):[]}(e,i);n.includes(t)||n.push(t),function(e,t,n){n=JSON.stringify(n),1===e.nodeType?e.setAttribute(t,n):8===e.nodeType&&(e.textContent=n)}(e,i,n)}}})}}}));