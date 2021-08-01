let maze;
export function recursiveDivisionMaze(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  
  let horizontal = fill(grid.length);
  let vertical = fill(grid[0].length);
  maze = [];
  getWalls(vertical, horizontal, grid, startNode, finishNode);
  return maze;
}

function fill(len) {
  let filled = [];
  for (let i = 0; i < len; i++) {
    filled.push(i);
  }
  return filled;
}

//direction === 0 => Horizontal
//direction === 1 => Vertical

function getWalls(vertical, horizontal, grid, startNode, finishNode) {
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let direction;
  let num;
  if (vertical.length > horizontal.length) {
    direction = 1;
    num =  getRandomNum(vertical);
  }
  if (vertical.length <= horizontal.length) {
    direction = 2;
    num =  getRandomNum(horizontal);
  }

  if (direction === 1) {
    addWall(direction, num, vertical, horizontal, startNode, finishNode);
    getWalls(
      vertical.slice(0, vertical.indexOf(num)), horizontal,grid,startNode, finishNode);
    getWalls(
      vertical.slice(vertical.indexOf(num) + 1),horizontal, grid,startNode, finishNode);
  } else {
    addWall(direction, num, vertical, horizontal, startNode, finishNode);
    getWalls(
      vertical, horizontal.slice(0, horizontal.indexOf(num)), grid,startNode, finishNode);
    getWalls(
      vertical,horizontal.slice(horizontal.indexOf(num) + 1),grid,startNode, finishNode);
  }
}



//direction === 0 => Horizontal
//direction === 1 => Vertical

function addWall(direction, num, vertical, horizontal, startNode, finishNode) {
  let isStartFinish = false;
  let tempWalls = [];
  if (direction === 1) {
    if (horizontal.length === 2) return;
    for (let temp of horizontal) {
      if (
        (temp === startNode.row && num === startNode.col) ||
        (temp === finishNode.row && num === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([temp, num]);
    }
  } else {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
      if ((num === startNode.row && temp === startNode.col) ||(num === finishNode.row && temp === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([num, temp]);
    }
  }
  if (!isStartFinish) {
    tempWalls.splice(getRandInt(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    maze.push(wall);
  }
}
function getRandomNum(array) {
  let max = array.length - 1;
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return array[randomNum];
}


function getRandInt(max) {
  let randomInt =  Math.floor(Math.random() * (max / 3)) +
  Math.floor(Math.random() * (max / 3))+Math.floor(Math.random() * (max / 3));
  if (randomInt % 2 !== 0) {
    if (randomInt === max) {
      randomInt -= 1;
    } else {
      randomInt += 1;
    }
  }
  return randomInt;
}