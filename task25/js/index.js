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
tree.add('HTML5', '前端大全', tree.traverseBF);
tree.add('语义化', 'HTML5', tree.traverseBF);
tree.add('结构和样式分离', 'HTML5', tree.traverseBF);
tree.add('CSS3', '前端大全', tree.traverseBF);
tree.add('JavaScript', '前端大全', tree.traverseBF);

addEvent(tree._root.treeElement, "click", function (e) {
  var target = e.target || e.srcElement;

  var targetItem = target.parentNode.getElementsByTagName("span")[0].innerHTML;
  var parentItem = target.parentNode.parentNode.getElementsByTagName("span")[0].innerHTML;

  if (target.className == "add") {
    tree.add(prompt("请输入子结点的内容："), targetItem, tree.traverseBF);
  }
  else if (target.className == "delete") {
    tree.remove(targetItem, parentItem, tree.traverseBF);
  }
});