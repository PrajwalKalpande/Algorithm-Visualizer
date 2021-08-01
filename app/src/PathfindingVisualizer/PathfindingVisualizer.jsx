import React, { Component } from 'react';
import './PathfindingVisualizer.css';
import Node from './Node/Node';
import './Node/Node.css';
import Toggle from './components/togglebutton';
import {dfs} from '../algorithms/dfs'
import {bfs} from '../algorithms/bfs'
import {AStar} from '../algorithms/astar';
import {Dijkstra} from '../algorithms/Dijkstra';
import {GreedyBFS} from '../algorithms/greedyBestFirstSearch';
import { recursiveDivisionMaze } from '../mazealgorithms/recursiveDivisionMaze';
import { Spiral } from '../mazealgorithms/spiral';
import { randomMaze } from '../mazealgorithms/randomMaze';
import { stair } from '../mazealgorithms/stair';
import {CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import { SocialIcon } from 'react-social-icons';

export default class PathfindingVisualizer extends Component {
    //Declaring basic properties which we will use throughout
    
        constructor(props) {
            // eslint-disable-next-line
            super(props);
            let row_count;
            row_count = Math.floor(window.innerHeight/26);
            let col_count;
            col_count = Math.floor(window.innerWidth/28);
            this.state = {
              grid: [],
              theme : "light",
              START_NODE_ROW: 7,
              FINISH_NODE_ROW: 7,
              START_NODE_COL: 6,
              FINISH_NODE_COL: 27,
              mouseIsPressed: false,
              ROW_COUNT: row_count,
              COLUMN_COUNT: col_count,
              isRunning: false,
              isGeneratingMaze: false,
              isStartNode: false,
              isFinishNode: false,
              isWallNode: false, 
              currRow: 0,
              currCol: 0,
              speed : 10,
              algorithm:"Algorithm",
              msg :`Visualize Algorithm`,
              
              
              
              
              

            };

          }
        
     
     //Declaring lifecycle hooks
     componentDidMount() {
    
       
        const grid = this.getInitialGrid();
        this.setState({grid});
        this.setState({msg:  `Visualize ${this.state.algorithm}`});
        console.log(grid[0][0]);
       
      
      }
  
     








      



      toggleIsRunning() {
        this.setState({isRunning: !this.state.isRunning});

      }
      toggleIsGeneratingMaze(){
        this.setState({isGeneratingMaze:!this.state.isGeneratingMaze});

      }
    //Setting up the initial grid
    getInitialGrid = (rowCount = this.state.ROW_COUNT,colCount = this.state.COLUMN_COUNT) =>
      { const initialGrid = [];
        for (let row = 0; row < rowCount; row++) {
          const currentRow = [];
          for (let col = 0; col < colCount; col++) {
            currentRow.push(this.createNode(row, col));
          }
          initialGrid.push(currentRow);
        }
        return initialGrid;
      };
      
    createNode = (row, col) => {
        return {row, col, isStart: row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
        isFinish: row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,
        distance: Infinity,
        distanceToFinishNode:
        Math.abs(this.state.FINISH_NODE_ROW - row)+Math.abs(this.state.FINISH_NODE_COL - col),
        isVisited: false,
        isWall: false,
        previousNode: null,
        isNode: true,
        animationstate: 'running',
        

        };
    };
    //Handling mouse events
    handleMouseDown(row, col) {
      if (!this.state.isRunning && !this.state.isGeneratingMaze) {
        if (this.isGridClear()) {
          if (document.getElementById(`node-${row}-${col}`).className ==='node node-start') 
          {
            this.setState({mouseIsPressed: true,
              isStartNode: true,
              currRow: row, currCol: col,
            });
          }
          else if (document.getElementById(`node-${row}-${col}`).className ==='node node-finish')
          {
            this.setState({mouseIsPressed: true,
              isFinishNode: true,
              currRow: row,currCol: col,
            });
          } else {
            const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({
              grid: newGrid,
              mouseIsPressed: true,
              isWallNode: true,
              currRow: row,
              currCol: col,
            });}
        } else {
          this.clearGrid();
        }
      }
    }
    //Create walls
    getNewGridWithWallToggled = (grid, row, col)=>{
      let newGrid = grid.slice();
      let node = newGrid[row][col];
      if (!node.isStart && !node.isFinish && node.isNode) {
        let newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
      }
      return newGrid;
    };
    
    //if animation hasn't yet started update walls and other features or 
    //move start and end nodes if mouse is pressed
    handleMouseEnter(row, col) {
      if (!this.state.isRunning && !this.state.isGeneratingMaze) {
        if (this.state.mouseIsPressed) {
          const nodeClassName = document.getElementById(`node-${row}-${col}`).className;
          if (this.state.isStartNode) {
            if (nodeClassName !== 'node node-wall') {
              const prevStartNode = this.state.grid[this.state.currRow][this.state.currCol];
              prevStartNode.isStart = false;
              document.getElementById(`node-${this.state.currRow}-${this.state.currCol}`).className ='node';
              this.setState({currRow: row, currCol: col});
              const currStartNode = this.state.grid[row][col];
              currStartNode.isStart = true;
              document.getElementById(`node-${row}-${col}`).className ='node node-start';
            }
            this.setState({START_NODE_ROW: row, START_NODE_COL: col});
          } else if (this.state.isFinishNode) {
            if (nodeClassName !== 'node node-wall') {
              const prevFinishNode = this.state.grid[this.state.currRow][this.state.currCol];
              prevFinishNode.isFinish = false;
              document.getElementById(`node-${this.state.currRow}-${this.state.currCol}`).className = 'node';
              this.setState({currRow: row, currCol: col});
              const currFinishNode = this.state.grid[row][col];
              currFinishNode.isFinish = true;
              document.getElementById(`node-${row}-${col}`).className =
                'node node-finish';
            }
            this.setState({FINISH_NODE_ROW: row, FINISH_NODE_COL: col});
          } else if (this.state.isWallNode) {
            const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({
              grid: newGrid,
              mouseIsPressed: true,
              isWallNode: true,
              currRow: row,
              currCol: col,
            });
          }
        }
      }
    }
  
  handleMouseUp(row, col) {
    if (!this.state.isRunning && !this.state.isGeneratingMaze) {
      this.setState({mouseIsPressed: false});
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        
        this.setState({isStartNode, START_NODE_ROW: row, START_NODE_COL: col});
      } 
      else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({isFinishNode, FINISH_NODE_ROW: row, FINISH_NODE_COL: col});
      }
      this.getInitialGrid();
    }
  }
  handleMouseLeave() {
    if (this.state.isStartNode) {
      const isStartNode = !this.state.isStartNode;
      this.setState({isStartNode, mouseIsPressed: false});

    }
    else if (this.state.isFinishNode) {
      const isFinishNode = !this.state.isFinishNode;
      this.setState({isFinishNode, mouseIsPressed: false});
    }
    else if (this.state.isWallNode) {
      const isWallNode = !this.state.isWallNode;
      this.setState({isWallNode, mouseIsPressed: false});
      this.getInitialGrid();
    }
  }
  //Checking if the grid initial layout hasn't been modified(by animation) 
  isGridClear() {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName === 'node node-visited-running' ||
          nodeClassName === 'node node-shortest-path'
        ) {
          return false;
        }
        else if(nodeClassName === 'node node-visited-paused'){
          return false;
        }
      }
    }
    return true;
  }
  
  //Clearing the grid during/after animation
  //Has no effect on walls
  clearGrid() {
    if (!this.state.isRunning && !this.state.isGeneratingMaze) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
          if (nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish' &&
            nodeClassName !== 'node node-wall')
          {
            document.getElementById(`node-${node.row}-${node.col}`).className ='node';
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
            Math.abs(this.state.FINISH_NODE_ROW - node.row) +
            Math.abs(this.state.FINISH_NODE_COL - node.col);
          }
          if (nodeClassName === 'node node-finish')
          {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === 'node node-start') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }
  //Clearing all the walls 
  clearWalls() {
    if (!this.state.isRunning ) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className ='node';
            node.isWall = false;
          }
        }
      }
    }
  }
  //Manage animation speed
  changeSpeed(speed){
    switch(speed){
      case 'Fast' : this.setState({
        speed : 1,
      });
      
      break;
      case 'Normal' :  this.setState({
        speed : 10,
        });      
        break;
      case 'Slow' : this.setState({
        speed : 50,
        });
        break;
      default :
        this.setState({
          speed : 10,
        });
        break;
      
    }

  }
  //Creating Animations
  visualize(algo) {
    if (!this.state.isRunning && !this.state.isGeneratingMaze) {
      this.clearGrid();
      this.toggleIsRunning();
      
      const {grid} = this.state;
      const startNode =grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode =grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
          visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
           
          break;
        case 'AStar':
          visitedNodesInOrder = AStar(grid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        case 'Dijkstra':
          visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
          break;
        case 'GreedyBFS':
          visitedNodesInOrder = GreedyBFS(grid, startNode, finishNode);
          break;
        default:
         
          break;
      }
      if(this.state.algorithm !=="Algorithm"){
      const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('finish');
      this.animate(visitedNodesInOrder,nodesInShortestPathOrder);
    }
    }
  }
 
 
//Animate the path
  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
 
    for (let i =0; i <= visitedNodesInOrder.length; i++) {
      
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {this.animateShortestPath(nodesInShortestPathOrder);}, this.state.speed* i);
        return;
      }
         
        setTimeout(() => {const node = visitedNodesInOrder[i];
        
       
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`,).className;
        if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish'){

          document.getElementById(`node-${node.row}-${node.col}`).className =`node node-visited`;
      
    
        }
       
      }, this.state.speed* i);
      
      
    } 
  
    }
  
   
    //Returns back the shortest path 
    getNodesInShortestPathOrder(finishNode) {
      const nodesInShortestPathOrder = [];
      let currentNode = finishNode;
      //when it will reach the start node, previous node will contain null
      while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }
      return nodesInShortestPathOrder;
    }
    //Animating the shortest path
    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (nodesInShortestPathOrder[i] === 'finish') {
          setTimeout(() => {this.toggleIsRunning();}, this.state.speed* i*5);
        }
        else {
          setTimeout(() => {const node = nodesInShortestPathOrder[i];
            
            const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`,).className;
            if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
              
              document.getElementById(`node-${node.row}-${node.col}`).className ='node node-shortest-path';
            }
          },this.state.speed* i*4);
        }
      }
    }
//Visualizing the maze generation
    visualizeMaze(mazealgo) {
      if (!this.state.isRunning && !this.state.isGeneratingMaze) {
        this.clearGrid();
        this.toggleIsGeneratingMaze();
        const {grid} = this.state;
        const startNode =grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const finishNode =grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
        let maze;
        switch (mazealgo) {
          case 'RecursiveDivisionMaze':
            maze = recursiveDivisionMaze(grid, startNode, finishNode);
            break;
          case 'SpiralMaze':
            maze = Spiral(grid, startNode, finishNode);
            console.log(maze);
            break;
          case 'RandomMaze':
            maze = randomMaze(grid, startNode, finishNode);
            break;
          case 'StairMaze':
            maze = stair(grid, startNode, finishNode);
            break;
       
          default:
           
            break;
        }
      
        this.animateMaze(maze);
     
      }
    }
//Animating the maze generation
    animateMaze(maze)  {
      for (let i = 0; i <= maze.length; i++) {
        if (i === maze.length) {
          setTimeout(() => {
            this.clearGrid();
            this.toggleIsGeneratingMaze();
           
            let newGrid = this.getNewGridWithMaze(this.state.grid, maze);
            this.setState({ grid: newGrid });
          }, i * this.state.speed);
         
          return;
        }
        let wall = maze[i];
        let node = this.state.grid[wall[0]][wall[1]];
        setTimeout(() => {
          //Walls
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
        }, i * this.state.speed);
      }
   
    }
  //Get new grid with maze in it
   getNewGridWithMaze = (grid, maze) => {
      let newGrid = grid.slice();
      for (let wall of maze) {
        let node = grid[wall[0]][wall[1]];
        let newNode = {
          ...node,
          isWall: true,
        };
        newGrid[wall[0]][wall[1]] = newNode;
      }
      return newGrid;
    };
    

//Toggle between dark and light themes
    
  changeTheme= () =>{
       
      if (this.state.theme === "light") {
        this.setState({theme : "dark"});
      } else {
        this.setState({theme : "light"});
      }
  }
 //insert icon based on the theme
  inserticon= ()=>{
          return (this.state.theme === "dark" ? <HiMoon size={40} /> : <CgSun size={40} />);
      

  }
  //Change the message on visualize button
  changealgorithm=(algo)=>{
  console.log(window.innerHeight,window.innerWidth);
  this.setState({algorithm : algo});
  
  this.setState({msg:  `Visualize ${algo}`});
          

  }



    render() { 
    
      const {grid, mouseIsPressed} = this.state;
      let navclass = "navbar mb-1 navbar-expand-lg fixed-top navbar-";
      navclass+= (this.state.theme==="dark")? "dark" : "light";
      let itemclass = "nav-item";
      itemclass += (this.state.theme==="dark")? "-dark" : "";
      let btnclass ="btn mr-2 btn-";
      btnclass+=(this.state.theme==="dark")? "success":"danger";
      let bgclass ="mb-3";
      bgclass+= (this.state.theme==="dark")?" text-white bg-dark":"text-dark bg-light";
      let visualizebtnclass ="mr-2 visualizebtnclass";
      visualizebtnclass+= (this.state.theme==="dark")?"dark":"light";
      
      let tableid =(this.state.theme==="dark")? "table-dark":"table-light";
       return (        
             <div>
            <div className={bgclass}>
        
<nav className={navclass} >
<a className="navbar-brand" href="#"><b>PathFinding Visualizer</b></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
 
 
  <div className="collapse navbar-collapse " id="navbarSupportedContent-555">
            <ul className="navbar-nav mr-auto">             
            <li className="nav-item dropdown ">
             <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-555" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"href="#">Algorithms
             <span className="caret"></span></a>
             <div className=" dropdown-menu text-center  mr-auto" aria-labelledby="navbarDropdownMenuLink-555">
               <li className={itemclass}>
                 <a className="nav-link " href="#" onClick={()=>this.changealgorithm("Dijkstra")}>Dijkstra's Algorithm</a></li>
               <li className={itemclass}>
                 <a className="nav-link " href="#" onClick={()=>this.changealgorithm("AStar")}>A* Search</a></li>
               <li className={itemclass}>
                 <a className="nav-link " href="#" onClick={()=>this.changealgorithm("GreedyBFS")}>Greedy Best-first Search</a></li>
               <li className={itemclass}>
                 <a className="nav-link "href="#" onClick={()=>this.changealgorithm("BFS")}>Breadth-first Search</a></li>
               <li  className={itemclass}>
                 <a className="nav-link " href="#" onClick={()=>this.changealgorithm("DFS")}>Depth-first Search</a></li>
             </div>
           </li>
           <button className={visualizebtnclass} onClick={()=>{
             if(this.state.algorithm!=='Algorithm')
             {this.visualize(this.state.algorithm);}
             else{
               this.setState({msg:"Select an Algorithm"});
              } }
            }>
                {this.state.msg}
            </button>
                       
            <li className="nav-item dropdown ">
             <a className="nav-link dropdown-toggle"  data-toggle="dropdown" href="#">Mazes
             <span className="caret"></span></a>
             <ul className=" dropdown-menu text-center mr-auto">
              
               <li  className={itemclass}>
                 <a className="nav-link" href="#" onClick={()=>this.visualizeMaze("RecursiveDivisionMaze")}>RecursiveDivisionMaze</a></li>
               <li  className={itemclass}>
                 <a className="nav-link" href="#" onClick={()=>this.visualizeMaze("SpiralMaze")}>Spiral Maze</a></li>
               <li  className={itemclass}>
                 <a className="nav-link" href="#" onClick={()=>this.visualizeMaze("RandomMaze")}>Random Maze</a></li>
               <li  className={itemclass}>
                 <a className="nav-link" href="#" onClick={()=>this.visualizeMaze("StairMaze")}>Stairs </a></li>
             </ul>
             </li>
             
           <button className={btnclass} onClick={()=>this.clearWalls()}>
                 Clear Walls               
            </button>
            <button className={btnclass} onClick={()=>this.clearGrid()}>
                 Clear Board               
            </button>
                     
            <li className="nav-item dropdown ">
             <a className="nav-link dropdown-toggle"  data-toggle="dropdown" href="#">Speed
             <span className="caret"></span></a>
             <ul className=" mr-auto dropdown-menu">
               <li className={itemclass} >
               <a className="nav-link"href="#" onClick={()=>this.changeSpeed('Fast')} >Fast</a></li>
               <li className={itemclass} >
               <a className="nav-link"href="#" onClick={()=>this.changeSpeed('Normal')} >Normal</a></li>
               <li className={itemclass} >
               <a className="nav-link"href="#" onClick={()=>this.changeSpeed('Slow')} >Slow</a></li>
               
            
            </ul>
            </li>
          
           <li >
              <Toggle onClick={this.changeTheme}>
                    {this.inserticon()}
              </Toggle>
              
              </li>
            
            </ul>
          </div>
            </nav>
          <div className="head d-inline-flex p-2 ">
          <div class="p-2" id="start"></div>
          <div class="p-2 itemclass">Start Node</div>
          <div class="p-2" id="finish"></div>
          <div class="p-2 itemclass">Finish Node</div>
          <div class="p-2" id="wall"></div>
          <div class="p-2 itemclass">Wall</div>
          <div class="p-2" id="node"></div>
          <div class="p-2 itemclass">Unvisited Node</div>
          <div class="p-2" id="shortest"></div>
          <div class="p-2 itemclass">Shortest Path Node</div>
          </div>
          
        <table 
          className="grid-container " id={tableid}
          onMouseLeave={() => this.handleMouseLeave()}>
    
    
  
          <tbody  className="grid">
          
            {grid.map((row, rowIdx) => {//Item indexes are used as keys in rows and nodes as well
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall,animationstate} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        animationstate = {animationstate}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp(row, col)}
                        row={row}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

              
        
<footer class="page-footer font-small special-color-dark pt-4">

  <div class="container">

    <ul class="list-unstyled list-inline text-center">
     
      <li class="list-inline-item">
        <a class="btn-floating  mx-1" href="https://github.com/PrajwalKalpande" >
        <SocialIcon bgColor="#3CB371"  target="_blank" url="https://github.com/PrajwalKalpande" />
        </a>
      </li>

      <li class="list-inline-item">
        <a class="btn-floating  mx-1" href="https://www.instagram.com/prajwalkalpande3/" >
        <SocialIcon target="_blank" url="https://www.instagram.com/prajwalkalpande3/" />
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn-floating  mx-1"  href="mailto:prajwalkalpande3@gmail.com">
        <SocialIcon target="_blank" url="https://mail.google.com/mail/u/0/#inbox" />
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn-floating  mx-1"  href="https://www.facebook.com/people/Prajwal-Kalpande/100016414006945/">
        <SocialIcon target="_blank" url="https://www.facebook.com/people/Prajwal-Kalpande/100016414006945/" />
        </a>
      </li>
    </ul>

  </div>

  <div class="footer-copyright text-center py-3">
  <div className= {bgclass} >
  © Made by Prajwal Kalpande  </div>
 
  </div>
  
</footer>

            </div>
            </div>
           
         
        );
              




    }
  }
