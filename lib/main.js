const NodeCollection = require('./dom_node_collection.js');

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
