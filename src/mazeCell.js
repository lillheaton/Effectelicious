
/**
 * @param  {int} i - x in two dimensional array
 * @param  {int} j - y in two dimensional array
 * @return {object} - Grid cell
 */
export default function cell(i, j){
	return {
		x: i, 
		y: j, 
		walls: ['N', 'S', 'E', 'W'],
		breakWall: function(w) {
			let i = this.walls.indexOf(w);
			if(i > -1) {
				this.walls.splice(i, 1);
			}
		},
		breakWallBetween: function(cell) {
			if(this.x < cell.x){
				this.breakWall('E');
				cell.breakWall('W');
			}

			if(this.x > cell.x){
				this.breakWall('W');
				cell.breakWall('E');
			}

			if(this.y < cell.y){
				this.breakWall('S');
				cell.breakWall('N');
			}

			if(this.y > cell.y){
				this.breakWall('N');
				cell.breakWall('S');
			}
		}
	};
};