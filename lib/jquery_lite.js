/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const NodeCollection = __webpack_require__(1);

window.$l = function _$l (selectors) {
  if (selectors instanceof HTMLElement) {
    selectors = Array.from(selectors);
  }
  const elementList = document.querySelectorAll(selectors);
  const elementArr = Array.from(elementList);
  const nodeCollection = new NodeCollection(elementArr);
  return nodeCollection;
};
//
// window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class NodeCollection {
  constructor(array) {
    this.elements = array;
  }
  html(string){
    if (string) {
      this.elements.forEach( (item) => {
        item.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }
  empty () {
    this.elements.forEach( (item) => {
      item.innerHTML = "";
    });
  }
  append(arg){
    let theThingtoAppend = "";
    if (arg instanceof NodeCollection) {
      arg.elements.forEach ( (item) => {
        theThingtoAppend += item.outerHTML;
      });
    } else if (arg instanceof HTMLElement) {
      theThingtoAppend = arg.outerHTML;
    }
    else {
      theThingtoAppend = arg;
    }
    this.elements.reverse().forEach((item) => {
      item.innerHTML += theThingtoAppend;
    });
  }
  attr (key, value) {
    if (typeof value === "string") {
      this.elements.forEach(item => item.setAttribute(key, value));
    } else {
      return this.elements[0].getAttribute(key);
    }
    return undefined;
  }
  addClass (string) {
    this.elements.forEach( (item) => {
      item.className += ` ${string}`;
    });
  }

  removeClass() {
    this.elements.forEach( (item) => {
      item.removeAttribute("class");
    });
  }

  children(){
    //get a flat array of all children elements and call class on each one and return list
    // console.log(this.elements);
    let childrenArr = [];
    this.elements.reverse().forEach((item) => {
      childrenArr = childrenArr.concat(Array.from(item.children));
    });
    // console.log(childrenArr);
    return new NodeCollection(childrenArr);
  }

  parent() {
    let parentArray = [];
    this.elements.reverse().forEach((item) => {
      parentArray = parentArray.concat(Array.from(item.parent));
    });
    // console.log(parentArray);
    return new NodeCollection(parentArray);
  }

  find(selector) {
    let resultsArr = [];
    this.elements.reverse().forEach( (item) => {
      resultsArr.push(item.querySelectorAll(selector));
    });
    return resultsArr;
  }

  remove() {
    this.empty();
    this.elements = [];
  }

  on(action, callback) {

    this.elements.forEach((item) => {
      item.addEventListener(action, callback);
      item.callback = callback;
    });

  }

  off(action) {

  }

}

module.exports = NodeCollection;


/***/ })
/******/ ]);