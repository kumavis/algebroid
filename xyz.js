var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

module.exports = {
  selectElement,
  moveElement,
  deselectElement,
}

function selectElement(evt) {
  selectedElement = evt.target;
  currentX = evt.clientX;
  currentY = evt.clientY;
  currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

  for(var i=0; i<currentMatrix.length; i++) {
    currentMatrix[i] = parseFloat(currentMatrix[i]);
  }
  
  selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
  selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
  selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
}
    
function moveElement(evt) {
  var dx = evt.clientX - currentX;
  var dy = evt.clientY - currentY;
  currentMatrix[4] += dx;
  currentMatrix[5] += dy;
  
  selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
  currentX = evt.clientX;
  currentY = evt.clientY;
}
    
function deselectElement(evt) {
  if(selectedElement != 0){
    selectedElement.removeAttributeNS(null, "onmousemove");
    selectedElement.removeAttributeNS(null, "onmouseout");
    selectedElement.removeAttributeNS(null, "onmouseup");
    selectedElement = 0;
  }
}

global.selectElement = module.exports.selectElement
global.moveElement = module.exports.moveElement
global.deselectElement = module.exports.deselectElement

function ipadClick(evt){
  var root = document.getElementById("root");
  var evtt = evt.touches[0];

  var rpos = root.createSVGRect();
  rpos.x = evtt.clientX;
  rpos.y = evtt.clientY;
  rpos.width = rpos.height = 1;
  var list = root.getIntersectionList(rpos, null);
  var maxItemId = list.length <= 0 ? "(no match)" : list[list.length - 1].id;

  document.getElementById("logTrace").innerHTML = "screen: (" + evtt.clientX + ", " + evtt.clientY + ") ? uu(" + maxItemId + "): (" + uupos.x.toFixed(0) + "," + uupos.y.toFixed(0) + ")";
}