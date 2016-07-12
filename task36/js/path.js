var Point = function(x,y) {
  if(this instanceof Point){
    this.init(x,y);
  }else{
    return new Point(x,y);
  }
}

Point.prototype = {
  init: function(x,y) {
    this.x = x;
    this.y = y;
  },
  parentPoint: null,
  F: 0,  //F=G+H
  G: 0,
  H: 0,
  x: 0,
  y: 0,
  calcF: function() {
    this.F = this.G + this.H;
  }
}

var Maze = function(maze){
  if(this instanceof Maze){
    this.init(maze);
  }else{
    return new Maze(maze);
  }
}

Maze.prototype = {
  init: function(maze) {
    this.MazeArray = maze;
    this.closeList = [];
    this.openList = [];
  },
  OBLIQUE: 14,
  STEP: 10,

  findPath: function(start, end, isIgnoreCorner) {
    this.openList.push(start);
    while (this.openList.length != 0) {
      var tempStart = this.minPoint(this.openList);
      this.closeList.push(tempStart);
      this.removePoint(this.openList, tempStart);

      var points = this.nextPoint(tempStart, isIgnoreCorner);
      for(var i = 0, len = points.length; i < len; i++) {
        var point = points[i];
        if(this.existIn(this.openList, point)) {
          this.findPoint(tempStart, point);
        } else {
          this.notFindPoint(tempStart, end, point);
        }
      }

      if(this.getPoint(this.openList, end) != null) {
        return this.getPoint(this.openList, end);
      }
    }
    return this.getPoint(this.openList, end);
  },

  canReaches: function(x,y) {
    if((x < 1) || (x > this.MazeArray[0].length))
    {
      return false;
    }

    if((y < 1) || (y > this.MazeArray.length))
    {
      return false;
    }

    return this.MazeArray[y-1][x-1] == 0;
  },

  canReach: function(start, point, isIgnoreCorner) {
    if(!this.canReaches(point.x, point.y) || this.existIn(this.closeList, point)) {
      return false;
    } else {
      if((Math.abs(point.x - start.x)) + (Math.abs(point.y - start.y)) == 1) {
        return true;
      }
      return false;
    }
  },

  notFindPoint: function(tempStart, end, point) {
    point.parentPoint = tempStart;
    point.G = this.calcG(tempStart, point);
    point.H = this.calcH(end, point);
    point.calcF();
    this.openList.push(point); 
  },

  findPoint: function(tempStart, point) {
    var G = this.calcG(tempStart, point);
    if(G < point.G) {
      point.parentPoint = tempStart;
      point.G = G;
      point.calcF();
    }
  },

  calcG: function(start, point)
  {
    var G = (Math.abs(point.x - start.x) + Math.abs(point.y - start.y)) == 2 ? this.OBLIQUE:this.STEP ;
    var parentG = point.parentPoint != null ? point.parentPoint.G : 0;
    return G + parentG;
  },

  calcH: function( end,  point)
  {
    var step = Math.abs(point.x - end.x) + Math.abs(point.y - end.y);
    return step * this.STEP;
  },

  nextPoint: function(point, isIgnoreCorner) {
    var nextPoints = [];
    if(this.canReach(point, Point(point.x-1,point.y), isIgnoreCorner)) {
      nextPoints.push(Point(point.x-1,point.y));
    }
    if(this.canReach(point, Point(point.x,point.y-1), isIgnoreCorner)) {
      nextPoints.push(Point(point.x,point.y-1));
    }
    if(this.canReach(point, Point(point.x+1,point.y), isIgnoreCorner)) {
      nextPoints.push(Point(point.x+1,point.y));
    }
    if(this.canReach(point, Point(point.x,point.y+1), isIgnoreCorner)) {
      nextPoints.push(Point(point.x,point.y+1));
    }

    return nextPoints;
  },

  existIn: function(points, point) {
    for(var i in points) {
      if((points[i].x == point.x) && (points[i].y == point.y)) {
        return true;
      }
    }
    return false;
  },

  minPoint: function(points) {
    var min = points[0];
    for(var i = 0, len = points.length; i < len - 1; i++) {
      if(points[i].F < points[i+1].F) {
        min = points[i];
      }
    }
    return min;
  },

  getPoint: function(points, point) {
    for(var i in points) {
      if((points[i].x == point.x) && (points[i].y == point.y)) {
        return points[i];
      }
    }
    return null;
  },

  removePoint: function(points, point) {
    for(var i = 0, len = points.length; i < len; i++) {
      if((points[i].x == point.x) && (points[i].y == point.y)) {
        return points.splice(i,1);
      }
    }
  }
}