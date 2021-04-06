/*
Основная логика приложения
*/

class Incrementer{
	constructor()
	{
		this.counter = 0;
	}
	get()
	{
		return this.counter++;
	}
}
let id = new Incrementer();

let allBoards = [];

class Piece{
	constructor(board, piece)
	{
		this.char = "♟";
		this.team = "white";
		this.position = {y:0, x:0};
		if (piece)
		{
			this.char = piece.char;
			this.team = piece.team;
			this.position = Object.assign({}, piece.position);
		}
		this.board = board;
		console.log(board);
		if(board)
		{
			//throw "При создании фигуры не задана доска."
		}
		this.board.setPiece(this);
	}
	isMovable(coord)
	{
		return coord in
			[
				{m:0, t:0, y:1, x:0},
				{m:1, t:0, y:0, x:0},
			];
	}
	isTakest(coord)
	{
		return coord in
			[
				{m:0, t:0, y:1, x:1},
				{m:0, t:0, y:1, x:-1},
				{m:1, t:1, y:0, x:0},
				{m:1, t:-1, y:0, x:0},
			];
	}
	move(coord)
	{
		if (this.isMovable(coord) || this.isTakest(coord) || 1)
		{
			let stepBoard = this.board.continue();
			stepBoard.getPiece(this.position.y, this.position.x).position = {
				y: coord.y,
				x: coord.x,
			};
		}
	}
}

class Board {
	constructor(board)
	{
		this.id = id.get();
		this.parent = board;
		this.tree = [];
		this.contunous = null;
		this.position = {
			m: 3,
			t: 2,
		};
		this.listPiece = [];
		if(board)
		{
			board.listPiece.forEach(piece=>
			{
				this.listPiece.push(new Piece(this));
			});
		}
		allBoards.push(this);
	}
	continue()
	{
		if(this.contunous)
		{
			return this.branche();
		}
		this.contunous = new Board(this);
		this.contunous.position.m = this.position.m;
		this.contunous.position.t = this.position.t + 1;
		return this.contunous;
	}
	branche()
	{
		let newBoard = new Board(this);
		newBoard.position.t = this.position.t + 1;
		if(newBoard.parent.position.t % 2)
		{
			let minM = 100000;
			allBoards.forEach(item =>
			{
				if (minM > item.position.m) minM = item.position.m;
			});
			newBoard.position.m = minM - 1;
		}
		else
		{
			let maxM = -100000;
			allBoards.forEach(item =>
			{
				if (maxM < item.position.m) maxM = item.position.m;
			});
			newBoard.position.m = maxM + 1;
		}
		this.tree.push(newBoard);
		return newBoard;
	}
	setPiece(piece)
	{
		this.listPiece.push(piece);
	}
	getPiece(y, x)
	{
		let out = undefined;
		this.listPiece.forEach(value =>
		{
			if (value.position.y == y &&
				value.position.y == y)
			{
				out = value;
			}
		});
		return out;
	}
}

class Multiverse{
	constructor()
	{
		this.allBoards = allBoards;
	}
	start()
	{
		let startBoard = new Board();
		new Piece(startBoard);
	}
}


class Game{
	constructor()
	{
		this.multiverse = new Multiverse();
		this.multiverse.start();
	}
}

let game = new Game();
