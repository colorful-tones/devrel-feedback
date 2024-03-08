import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/**
 * WordPress dependencies
 */

(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('devrelFeedback', {
  actions: {
    toggleForm() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const element = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      context.isSelected = !context.isSelected;
      context.isFormHidden = !context.isFormHidden;
      if (!context.isFormHidden) {
        context.currentlySelected = element.attributes['data-checked-value'];
      } else {
        context.currentlySelected = '';
      }
    },
    submitForm(event) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      event.preventDefault();
      const formData = new FormData(ref);
      formData.append('action', 'submit_feedback');
      formData.append('nonce', context.nonce);
      context.isFormProcessing = true;
      console.log('submitting form');
      submitHandler(formData, context.ajaxUrl).then(response => {
        console.log("SUCCESS", response);
        context.isSuccess = true;
        context.isFormProcessing = false;
      }).catch(error => {
        console.log("ERROR", error);
        context.isError = true;
        context.isFormProcessing = false;
      });
    }
  }
});
function submitHandler(formData, ajaxUrl) {
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  console.log(data);
  return new Promise((resolve, reject) => {
    fetch(ajaxUrl, {
      method: 'POST',
      body: new URLSearchParams(data).toString()
    }).then(response => {
      console.log("RESPONSE:", response);
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    }).catch(e => {
      reject(e);
    });
  });
}
;
})();


//# sourceMappingURL=view.js.map