// Returns all nodes in the order in which they were visited and
// Returns pointers to their previous node allowing us to compute the shortest path
//A* Search is weighted and guarantees the shortest path
//Modified Dijkstra
export function AStar(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  const unvisitedNodes = []; //open list
  const visitedNodesInOrder = []; //closed list
  startNode.distance = 0;
  unvisitedNodes.push(startNode);

  while (unvisitedNodes.length) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    const closestNode = unvisitedNodes.shift();
    
    if (closestNode === finishNode){
       return visitedNodesInOrder;
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    const neighbourNodes = getNeighbourNodes(closestNode, grid);
    for (let neighbourNode of neighbourNodes) {
      let distance = closestNode.distance + 1;
      //f = g + h
      if (neighbourNotInUnvisitedNodes(neighbourNode, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbourNode);
        neighbourNode.distance = distance;
        neighbourNode.totalDistance =distance + manhattanDistance(neighbourNode, finishNode);
        neighbourNode.previousNode = closestNode;
      } else if (distance < neighbourNode.distance) {
        neighbourNode.distance = distance;
        neighbourNode.totalDistance =
          distance + manhattanDistance(neighbourNode, finishNode);
        neighbourNode.previousNode = closestNode;
      }
    }
  }
  return visitedNodesInOrder;
}

function neighbourNotInUnvisitedNodes(neighbourNode, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbourNode.row && node.col === neighbourNode.col) {
      return false;
    }
  }
  return true;
}

function manhattanDistance(node, finishNode) {
  let x = Math.abs(node.row - finishNode.row);
  let y = Math.abs(node.col - finishNode.col);
  return x + y;
}

function getNeighbourNodes(node, grid) {
  const neighbourNodes = [];
  let { row, col } = node;
  if (row !== grid.length - 1) neighbourNodes.push(grid[row + 1][col]);
  if (col !== grid[0].length - 1) neighbourNodes.push(grid[row][col + 1]);
  if (row !== 0) neighbourNodes.push(grid[row - 1][col]);
  if (col !== 0) neighbourNodes.push(grid[row][col - 1]);
  return neighbourNodes.filter(
    (neighbourNode) => !neighbourNode.isWall && !neighbourNode.isVisited
  );
}

