
function getLocationElement(element)
{
	let elementPosition = element.getBoundingClientRect();
	let gamePosition = game.$html.getBoundingClientRect();
	return {
		x: elementPosition.x - gamePosition.x,
		y: elementPosition.y - gamePosition.y
	}
}


class Piece
{
	constructor()
	{
		this.$html = document.createElement("div");
		this.$html.classList.add("piece");
		this.setFigure("♟");
		this.square = undefined;
	}
	
	setFigure(simbol)
	{
		this.simbol = simbol;
		this.$html.innerText = simbol;
	}
	
	clone()
	{
		let out = new Piece(this.simbol);
		out.setFigure()
		return out;
	}
	
	setSquare(square)
	{
		this.buildupAnimationBefore();
		square.setPiece(this);
		this.buildupAnimationAfter();
		this.loopAnimation(this);
	}
	
	buildupAnimationBefore()
	{
		this.animationData = {
			start: getLocationElement(this.$html),
			end: undefined
		};
	}
	
	buildupAnimationAfter()
	{
		this.animationData.end = getLocationElement(this.$html);
		
		this.$html.classList.add("pieceMove");
		this.$html.style.left = this.animationData.x + "px";
		this.$html.style.top = this.animationData.y + "px";
	}
	
	loopAnimation(pieceAnimation)
	{
		let move = {
			x: pieceAnimation.animationData.end.x - pieceAnimation.animationData.start.x,
			y: pieceAnimation.animationData.end.y - pieceAnimation.animationData.start.y
		}
		
		let speed = 2;
		
		let len = Math.sqrt( move.x * move.x + move.y * move.y );
		if(len > speed)
		{
			let k = speed / len;
			move.x *= k;
			move.y *= k;
			pieceAnimation.animationData.start.x += move.x;
			pieceAnimation.animationData.start.y += move.y;
			pieceAnimation.$html.style.left = pieceAnimation.animationData.start.x + "px";
			pieceAnimation.$html.style.top = pieceAnimation.animationData.start.y + "px";
			requestAnimationFrame(()=>{pieceAnimation.loopAnimation(pieceAnimation);});
		}
		else
		{
			pieceAnimation.$html.classList.remove("pieceMove");
			pieceAnimation.$html.style.left = "0";
			pieceAnimation.$html.style.top = "0";
		}
	}
}

class Square
{
	constructor(board)
	{
		this.$html = document.createElement("td");
		this.board = board;
		this.piece = undefined;
	}
	
	setPiece(piece)
	{
		if(this.piece && this.piece != piece)
		{
			throw "Невохможно сходить на занятую фигурой клетку.";
		}
		this.piece = piece;
		if (this.piece)
		{
			this.$html.append(this.piece.$html);
			this.piece.getSquare = this;
		}
	}
	getPiece()
	{
		return this.piece;
	}
}

class Board
{
	constructor(t, m)
	{
		this.$html = document.createElement("table");
		
		this.location = {
			x: t || 0,
			y: m || 0,
			stepWhite: true
		};
		
		this.board = [];
		for(let i = 0; i < 8; i++)
		{
			this.board[i] = [];
			let row = document.createElement("tr");
			for(let j = 0; j < 8; j++)
			{
				this.board[i][j] = new Square(this);
				row.append(this.board[i][j].$html);
			}
			this.$html.append(row);
		}
		this.show();
	}
	
	clone()
	{
		let out = new Board(this.location.x, this.location.y);
		for(let i = 0; i < 8; i++)
		{
			for(let j = 0; j < 8; j++)
			{
				if (this.board[i][j].getFigure())
				{
					out.board[i][j].setFigure( this.board[i][j].getFigure().clone() );
				}
			}
		}
		return out;
	}
	
	show()
	{
		let position = {
			x: this.location.x * 400 + (!this.location.stepWhite) * 200,
			y: this.location.y * 200
		};
		
		if(this.location.stepWhite)
		{
			this.$html.classList.add("boardWhite");
		}
		if(this.getActive())
		{
			this.$html.classList.add("boardActive");
			this.$html.classList.remove("boardPassive");
			position.x += 10;
			position.y += 10;
		}
		else
		{
			this.$html.classList.remove("boardActive");
			this.$html.classList.add("boardPassive");
			position.x += 15;
			position.y += 15;
		}
		
		this.$html.style.left = position.x + "px";
		this.$html.style.top = position.y + "px";
		
		game.$html.append(this.$html);
	}
	
	getActive()
	{
		return true;
	}
	
	getSquare(x,y)
	{
		return this.board[y][x];
	}
}

class Timeline
{
	constructor(parent, start = 0)
	{
		this.parent = parent;
		this.start = start;
		this.time = [];
		
		if(this.parent)
		{
			let end = this.parent.time.length - 1;
			this.time = [new Board(this.parent.time[end])];
		}
		else
		{
			this.time = [new Board()];
		}
	}
}

class Move
{
	constructor()
	{
		;
	}
}

class History
{
	constructor()
	{
		this.moves = [];
	}
}

class Game
{
	constructor()
	{
		this.$html = document.getElementById("game");
		this.history = new History();
	}
	
	start()
	{
		this.timelines = {0: new Timeline()};
		
		let board = this.getBoard(0, 0);
		board.getSquare(0,0).setPiece(new Piece());
		debug["piece"] = board.getSquare(0,0).getPiece();
		debug["board"] = board;
	}
	
	getBoard(t, m)
	{
		if (t in this.timelines &&
		    m >= this.timelines[m].start &&
		    m <= this.timelines[m].start + this.timelines[t].time.length)
		{
			return this.timelines[m].time[t-this.timelines[m].start];
		}
	}
}

let debug = {};

let game = new Game();
game.start();




//tests

setTimeout(()=>{
	debug["piece"].setSquare(debug["board"].getSquare(4,3));
}, 1600);
setTimeout(()=>{
	debug.board.$html.style.left = "200px";
}, 1000);







