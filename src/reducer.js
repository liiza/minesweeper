const WIDTH = 10;
const HEIGHT = 10;
const BOMBS = parseInt((WIDTH * HEIGHT)/3);


const getNeighbours = ({x, y}) => {
	const neighbours = [];
	// UPPER LEFT
	if (x > 0 && y > 0) {
		neighbours.push({x: x - 1, y: y - 1});
	}	
	// UP
	if (y > 0) {
		neighbours.push({x, y: y - 1});
	}	
	// UPPER RIGHT
	if (x < (WIDTH - 1) && y > 0) {
		neighbours.push({x: x + 1, y: y - 1});
	}	
	// LEFT
	if (x > 0) {
		neighbours.push({x: x - 1, y});
	}	
	// RIGHT
	if (x < (WIDTH - 1)) {
		neighbours.push({x: x + 1, y});
	}	
	// LOWER LEFT
	if (x > 0 && y < 0) {
		neighbours.push({x: x - 1, y: y - 1});
	}	
	// LOWER MIDDLE
	if (y < (HEIGHT - 1)) {
		neighbours.push({x, y: y + 1});
	}	
	// LOWER RIGHT
	if (x < (WIDTH - 1) && y < (HEIGHT - 1)) {
		neighbours.push({x: x + 1, y: y + 1});
	}
	return neighbours;		
}

const generateBricks = () => {
	
	const bricks = [];
	const emptyCells = [];
	for (let i = 0; i < WIDTH; i++) {
		const row = [];
		bricks.push(row);
		for (let j = 0; j < HEIGHT; j++) {
			row.push({
				bomb: false, 
				open: false
			});
			emptyCells.push([i, j]);
		}
	}

	let bombs = 0;
	while (bombs < BOMBS) {
		// Select an random empty cell
		const nextBomb = Math.floor(Math.random() * emptyCells.length); 
		const [i, j] = emptyCells[nextBomb];
		const toRemove = emptyCells.indexOf([i, j]);
		emptyCells.splice(toRemove, 1);

		bricks[i][j].bomb = true;
		bombs++;
	}

	
	for (let i = 0; i < WIDTH; i++) {
		for (let j = 0; j < HEIGHT; j++) {
			const neighbours = getNeighbours({x:i, y:j})
			.filter(({x, y}) => bricks[x][y].bomb).length;
			console.log({ neighbours });
			bricks[i][j].number = neighbours;
		}
	}

	return bricks;
}

const initialState = {  
	bricks: generateBricks()
};

export default function(state = initialState, action) {  
  switch (action.type) {
    case 'OPEN':
    	const { x, y } = action.payload;
    	const bricks = [ ...state.bricks ];
    	bricks[x][y].open = true;
    	if (bricks[x][y].bomb) {
    		// Open them all
    		return {
    			bricks: bricks.map(row => {
	    			return row.map(b => {
	    				return {
	    					bomb: b.bomb,
	    					open: true,
	    					number: b.number
	    				}
	    			})
	    		})
    		};
    	}
      	return { bricks };
    default:
    	return state
  }
}
