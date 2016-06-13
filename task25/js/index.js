// ===============================事件处理=============================
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler);
  }
  else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  }
  else {
    element["on" + type] = handler;
  }
}

// ===============================新建实例=============================
var tree = new Tree("前端大全");
document.getElementById("treeArea").appendChild(tree._root.treeElement)
tree.addChild('HTML5', tree._root);
tree.addChild('CSS3', tree._root);
tree.addChild('JavaScript', tree._root);

addEvent(tree._root.treeElement, "click", function (e) {
  var target = e.target || e.srcElement;

  var targetNode = target.parentNode.parentNode.fromNode;

  if (target.className == "add") {
    tree.addChild(prompt("请输入子结点的内容："), targetNode);
  }
  else if (target.className == "delete") {
    tree.removeChild(targetNode);
  }
});