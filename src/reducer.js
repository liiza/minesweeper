
const initialState = {  
	bricks: [
		[
			{ bomb: true, open: false },
			{ bomb: false, open: false }
		],
		[
			{ bomb: false, open: false },
			{ bomb: false, open: false },
		]
	]
};

export default function(state = initialState, action) {  
  switch (action.type) {
    case 'OPEN':
    	const { x, y } = action.payload;
    	const bricks = [ ...state.bricks ];
    	bricks[x][y].open = true;
      	return { bricks };
    default:
    	return state
  }
}
