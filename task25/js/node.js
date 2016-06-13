function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];

  var newNode = document.createElement("div");
  newNode.className = "item";
  var newArrow = document.createElement("div");
  newArrow.className = "arrow down";
  var newTitle = document.createElement("span");
  newTitle.className = "node-title";
  newTitle.innerHTML = data;
  var newTab = document.createElement("span");
  newTab.className = "Tab";
  newTab.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
  var newAdd = document.createElement("img");
  newAdd.className = "add";
  newAdd.src = "images/add.png";
  var newRemove = document.createElement("img");
  newRemove.className = "delete";
  newRemove.src = "images/remove.png";
  newNode.appendChild(newArrow);
  newNode.appendChild(newTitle);
  newNode.appendChild(newTab);
  newNode.appendChild(newAdd);
  newNode.appendChild(newRemove);

  var newTreeNode = document.createElement("div");
  newTreeNode.className = "treeNode";
  newTreeNode.appendChild(newNode);

  this.treeElement = newTreeNode;
  this.treeElement.fromNode = this;
}
 
function Tree(data) {
  var node = new Node(data);
  node.treeElement.lastChild.removeChild(node.treeElement.lastChild.lastChild);
  this._root = node;
}
 
Tree.prototype.traverseDF = function(callback) {
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);
};
 
Tree.prototype.traverseBF = function(callback) {
  var queue = new Queue();
  queue.enqueue(this._root);
  currentTree = queue.dequeue();

  while(currentTree){
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = queue.dequeue();
  }
};
 
Tree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};
 
Tree.prototype.add = function(data, toData, traversal) {
  var child = new Node(data),
  parent = null,
  callback = function(node) {
    if (node.data === toData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

Tree.prototype.addChild = function(data, parent) {
  if (data) {
    var child = new Node(data);

    if (parent) {
      parent.children.push(child);
      child.parent = parent;
      parent.treeElement.appendChild(child.treeElement);
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
  var tree = this,
      parent = null,
      childToRemove = null,
      index;

  var callback = function(node) {
    if (node.data === fromData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    index = findIndex(parent.children, data);

    if (index === undefined) {
      throw new Error('Node to remove does not exist.');
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error('Parent does not exist.');
  }

  return childToRemove;
};

Tree.prototype.removeChild = function(child) {
  if (child) {
    child.parent.treeElement.removeChild(child.treeElement);

    for(var i = 0, len = child.parent.children.length; i < len; i++) {
      if(child.parent.children[i] == child) {
        child.parent.children.splice(i, 1);
      }
    }
  }
};
 
function findIndex(arr, data) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].data === data) {
      index = i;
    }
  }

  return index;
}