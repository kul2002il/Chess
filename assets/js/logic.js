/*
Основная логика приложения
*/

class Incrementer{
	constructor(){
		this.counter = 0;
	}
	get(){
		return this.counter++;
	}
}
let id = new Incrementer();

let allBoards = [];

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
		allBoards.push(this);
	}
	continue()
	{
		if(this.contunous)
		{
			//throw "Доску нельзя продолжить дважды.";
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
			allBoards.forEach(item => {
				if (minM > item.position.m) minM = item.position.m;
			});
			newBoard.position.m = minM - 1;
		}
		else
		{
			let maxM = -100000;
			allBoards.forEach(item => {
				if (maxM < item.position.m) maxM = item.position.m;
			});
			newBoard.position.m = maxM + 1;
		}
		this.tree.push(newBoard);
		return newBoard;
	}
	showBrance()
	{
		console.log(JSON.stringify(this));
	}
}

class Multiverse{
	constructor()
	{
		this.allBoards = allBoards;
	}
	start()
	{
		new Board();
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
