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
