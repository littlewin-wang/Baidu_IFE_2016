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

// ==============================原型函数扩充============================
Tree.prototype.addChild = function(data, parent) {
  if (data) {
    var child = new Node(data);

    if (parent) {
      parent.children.push(child);
      child.parent = parent;
      parent.treeElement.appendChild(child.treeElement);
      parent.toggleFold(false);
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  }
};

Tree.prototype.removeChild = function(child) {
  if (child) {
    child.parent.treeElement.removeChild(child.treeElement);

    for(var i = 0, len = child.parent.children.length; i < len; i++) {
      if(child.parent.children[i] == child) {
        child.parent.children.splice(i, 1);
      }
    }
    if (child.parent.treeElement.childNodes.length == 1) {
      child.parent.treeElement.getElementsByClassName("arrow")[0].className = "arrow empty"; 
    }
  }
};

Node.prototype.toggleFold = function(isFolded) {
  var child = this.treeElement.childNodes;
  for(var i = 0, len = child.length; i < len; i++)
  {
    if (child[i].className == "treeNode") {
      child[i].style.display = isFolded ? "none" : "block" ;
    }
  }
  this.treeElement.getElementsByClassName("arrow")[0].className = isFolded ? "arrow right" : "arrow down"; 
};

// ===============================新建实例=============================
var tree = new Tree("前端大全");
document.getElementById("treeArea").appendChild(tree._root.treeElement)
tree.addChild('HTML5', tree._root);
tree.addChild('语义化', tree._root.children[0]);
tree.addChild('格式严谨', tree._root.children[0]);
tree.addChild('结构分离', tree._root.children[0]);
tree.addChild('CSS3', tree._root);
tree.addChild('盒模型', tree._root.children[1]);
tree.addChild('动画', tree._root.children[1]);
tree.addChild('2D/3D转换', tree._root.children[1]);
tree.addChild('JavaScript', tree._root);

addEvent(tree._root.treeElement, "click", function (e) {
  var target = e.target || e.srcElement;

  var targetNode = target.parentNode.parentNode.fromNode;

  if (target.className == "add") {
    tree.addChild(prompt("请输入子结点的内容："), targetNode);
  } else if (target.className == "delete") {
    tree.removeChild(targetNode);
  } else if (target.className == "arrow right") {
    targetNode.toggleFold(false);
  } else if (target.className == "arrow down") {
    targetNode.toggleFold(true);
  }
});

addEvent(document.getElementById("searchDF"), "click", function (e) {
  var text = document.getElementById("searchIn").value.trim();
  if (text == "") {
    document.getElementById("searchOut").innerHTML = "请输入查询内容！";
    return;
  }

  var hitCnt = 0;

  callback = function(node) {
    if (node.data === text) {
      node.treeElement.childNodes[0].style.color = "blue";
      node.parent.toggleFold(false);
      hitCnt++;
    } else {
      node.treeElement.childNodes[0].style.color = "black";
    }
  };

  tree.contains(callback,tree.traverseDF);
  document.getElementById("searchOut").innerHTML = "共发现" + hitCnt + "处";
});

addEvent(document.getElementById("searchBF"), "click", function (e) {
  var text = document.getElementById("searchIn").value.trim();
  if (text == "") {
    document.getElementById("searchOut").innerHTML = "请输入查询内容！";
    return;
  }

  var hitCnt = 0;

  callback = function(node) {
    if (node.data === text) {
      node.treeElement.childNodes[0].style.color = "blue";
      node.parent.toggleFold(false);
      hitCnt++;
    } else {
      node.treeElement.childNodes[0].style.color = "black";
    }
  };

  tree.contains(callback,tree.traverseBF);
  document.getElementById("searchOut").innerHTML = "共发现" + hitCnt + "处";
});