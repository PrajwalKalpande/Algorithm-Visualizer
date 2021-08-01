
// Returns all nodes in the order in which they were visited and
// Returns pointers to their previous node allowing us to compute the shortest path
//Dijkstra's Algorithm is weighted and guarantees the shortest path
export function Dijkstra (grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    startNode.distance=0;
    const sptSet=[];
    const unvisitedNodes= getAllNodes(grid);
    

    while(unvisitedNodes.length!==0)
{

unvisitedNodes.sort((a,b)=>a.distance - b.distance);
const closestNode = unvisitedNodes.shift();

if(closestNode.isWall)continue;

//We have reached a dead end
if (closestNode.distance === Infinity) return sptSet;
//All required nodes processed
if (closestNode === finishNode) return sptSet;
closestNode.isVisited=true;
sptSet.push(closestNode);

updateUnvisitedNeighbourNodes(closestNode,grid);

}
}
function getAllNodes(grid)
{
  let allnodes = [];
  for (let row of grid) {
    for (let node of row) {
      allnodes.push(node);
    }
  }
  return allnodes;

}

function updateUnvisitedNeighbourNodes(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbourNodes(node, grid);
    for (const neighbour of unvisitedNeighbors) {
      neighbour.distance = node.distance + 1;
      neighbour.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbourNodes(node, grid) {
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

















