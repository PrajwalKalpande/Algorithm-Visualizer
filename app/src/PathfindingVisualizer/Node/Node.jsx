import React, { Component } from 'react';
import './Node.css';



class Node extends Component {
   //no state since it is a controlledcomponent(byPathfindingVisualizer)
    render() { 
        const {
            col,
            row,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        
           
          } = this.props;//extracted useful informnation using destructuring
        const extraClassName = isFinish ? 'node-finish': 
        isStart ? 'node-start' : 
        isWall ? 'node-wall': '';
      ;
        return (
            <td id={`node-${row}-${col}`}
              className={`node ${extraClassName}`}
              onMouseDown={() => onMouseDown(row, col)}
              onMouseEnter={() => onMouseEnter(row, col)}
              onMouseUp={() => onMouseUp()}> 
            </td>
          );
    }
}
 
export default Node;