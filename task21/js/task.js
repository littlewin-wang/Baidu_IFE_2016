function $(id) {
  return document.getElementById(id);
}

var tagIn = $("tagIn"),
    tagContainer = $("tagContainer"),
    hobbyIn = $("hobbyIn"),
    hobbyBtn = $("hobbyBtn"),
    hobbyContainer = $("hobbyContainer"),
    tagList = [];
    hobbyList = [];

function checkRepeat(item, list) {
  for (var i in list) {
    if (list[i] == item) {
      return true;
    }
  }
  return false;
}

function checkPress(keycode) {
  var KEYS = [32,13,188];
  for (var i in KEYS) {
    if (KEYS[i] === keycode) {
      return true;
    }
  }
  return false;
}

function addTag(event) {
  if (checkPress(event.keyCode)) {
    var text = tagIn.value;
    var regex = /[,，\s]+/;
    var tagContent,flag;
    if (regex.test(text)) {
      tagContent = text.slice(0,-1).trim();
    } else if ( event.keyCode === 13 ) {
      tagContent = text.trim();
    }
    if(tagContent) {
      if (!checkRepeat(tagContent, tagList)) {
        tagList.push(tagContent);
        var tagDiv = document.createElement("div");
        tagDiv.innerHTML = tagContent;
        if(tagContainer.children.length >= 10) {
          tagContainer.removeChild(tagContainer.children[0]);
        }
        tagContainer.appendChild(tagDiv);
        tagDiv.onclick = function () {
          this.parentNode.removeChild(this);
          var content = this.innerHTML;
          var index = content.indexOf(tagList);
          tagList.splice(index, 1);
        }
      }
    }
    tagIn.value = "";
  }
}

function addHobby() {
  var textList = hobbyIn.value.trim().split(/[\n,，、 　\t]+/);
  for(var i = 0; i < textList.length; i++) {
    if(textList[i]) {
      if (checkRepeat(textList[i], hobbyList)) {
        continue;
      } else {
        hobbyList.push(textList[i]);
        var hobbyDiv = document.createElement("div");
        hobbyDiv.innerHTML = textList[i];
        if(hobbyContainer.children.length >= 10) {
          hobbyContainer.removeChild(hobbyContainer.children[0]);
        }
        hobbyContainer.appendChild(hobbyDiv);
        hobbyDiv.onclick = function () {
          this.parentNode.removeChild(this);
          var content = this.innerHTML;
          var index = content.indexOf(hobbyList);
          hobbyList.splice(index, 1);
        }
      }
    }
  }
  hobbyIn.value = "";
}

tagIn.onkeyup = addTag;
hobbyBtn.onclick = addHobby;