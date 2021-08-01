
// Returns all nodes in the order in which they were visited and
// Returns pointers to their previous node allowing us to compute the shortest path
//Similar to Dijkstra 
//Greedy Best-first Search is weighted and does not guarantee the shortest path
export function GreedyBFS(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const queue = [];//we will sort this queue and make it like a priority queue which includes all unvisited nodes
  const visitedNodesInOrder = []; //closed list
  
  startNode.distance = 0;
  queue.push(startNode);

  while (queue.length)
   {
    queue.sort((a, b) => a.totalDistance - b.totalDistance);
    const closestNode = queue.shift();
        
    if(closestNode.isWall)continue;
    closestNode.isVisited=true;

    if (closestNode === finishNode) return visitedNodesInOrder;

  
    visitedNodesInOrder.push(closestNode);

    const neighbours = getNeighbourNodes(closestNode, grid);
    for (let neighbour of neighbours) {
      let distance = closestNode.distance + 1;
      //f = h
      if (neighbourNotInUnvisitedNodes(neighbour, queue)) {
        queue.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattanDistance(neighbour, finishNode);
        neighbour.previousNode = closestNode;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattanDistance(neighbour, finishNode);
        neighbour.previousNode = closestNode;
      }
    }
  }
  return visitedNodesInOrder;
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

function neighbourNotInUnvisitedNodes(neighbour, queue) {
  for (let node of queue) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
}