export function openTile({x, y}) {  
  return { type: 'OPEN', payload: {x, y} };
}
