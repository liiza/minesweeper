import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';  
import { createStore } from 'redux';

import reducer from './reducer';
import { openTile } from './actions';

const store = createStore(reducer);

class Tile extends React.Component {
    constructor(props) {
      super(props);
      this.toString = this.toString.bind(this);
      this.openTile = this.openTile.bind(this);
    }
    toString() {
      return this.props.bomb ? 'X' : 'O';
    }
    openTile() {
      store.dispatch(this.props.openTile({ x: this.props.x, y: this.props.y }));
    }    
    render() {
      return (<button onClick={this.openTile}>
        {this.props.open ? this.toString() : ' '}
      </button>);
    } 
}

class Board extends React.Component {
  render() {
    const tiles = this.props.bricks.map((b, i ) => 
      (<li>
        {b.map((t, j) => <Tile
          bomb={t.bomb}
          open={t.open} 
          x={i}
          y={j}
          openTile={this.props.openTile}
        />)}
      </li>)
    );
    return (
      <div style={{textAlign: 'center'}}>
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = (state) => {  
  return {
    bricks: state.bricks
  }
}

const mapDispatchToProps = (dispatch) => {  
  return {
    openTile: ({x, y}) => dispatch(openTile({x, y}))
  }
}

Board = connect(mapStateToProps, mapDispatchToProps)(Board);

ReactDOM.render(
  <Provider store={store}>  
    <Board />
  </Provider>,
  document.getElementById('app')
);
