function Queue() {
  this.dataStore = [];
}

//向队末尾添加一个元素
Queue.prototype.enqueue = function(element) {
  this.dataStore.push(element)
}

//删除队首的元素
Queue.prototype.dequeue = function() {
  return this.dataStore.shift();
}

Queue.prototype.front = function() { //读取队首元素
  return this.dataStore[0];
}

Queue.prototype.back = function() { //读取队末元素
  return this.dataStore[this.dataStore.length - 1]
}

//显示队列内的所有元素
Queue.prototype.toString = function() {
  var retStr = "";
  for (var i = 0; i < this.dataStore.length; ++i ) {
    retStr += this.dataStore[i] + "\n";
  }
  return retStr
}

//队列是否为空
Queue.prototype.empty = function() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}

//队列个数
Queue.prototype.count = function() {
  return this.dataStore.length;
}