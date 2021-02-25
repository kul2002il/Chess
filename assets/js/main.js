
class Piece
{
	constructor()
	{
		this.$html = document.createElement("div");
		this.setFigure("♟");
	}
	
	setFigure(str)
	{
		this.$html.innerText = str;
	}
}

class Square
{
	constructor(board, piece)
	{
		this.$html = document.createElement("td");
		this.board = board;
		setPiece(piece);
	}
	
	setPiece(piece)
	{
		this.piece = piece;
		if (this.piece)
		{
			this.$html.append(this.piece.$html);
		}
	}
}

class Board
{
	constructor(t, m, board)
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
		
		if (board)
		{
			this.location.stepWhite = !board.location.stepWhite;
			board; // todo: выполнить копирование
		}
		this.show();
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
		}
		else
		{
			this.$html.classList.add("boardPassive");
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
			let end = this.parent.time.length-1
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
		new Piece(board.getSquare(0,0));
		out["board"] = (board);
	}
	
	getBoard(t, m)
	{
		if( t in this.timelines &&
			m >= this.timelines[m].start &&
			m <= this.timelines[m].start + this.timelines[t].time.length)
		{
			return this.timelines[m].time[t-this.timelines[m].start];
		}
	}
}

let out = {};

let game = new Game();
game.start();










