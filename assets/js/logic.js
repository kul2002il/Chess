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

let allBoards = []

class Board {
	constructor(board)
	{
		this.id = id.get();
		this.parent = board;
		this.tree = [];
		this.contunous = null;
		this.position = {
			m: 3,
			t: 0,
		};
		/*
		if(this.parent)
		{
			this.position.t = this.parent.position.t + 1;
			if(this.parent.contunous === this)
			{
			}
			else
			{
				if(this.parent.position.t % 2)
				{
					let maxM = -100000;
					allBoards.forEach((item, i) => {
						if (maxM < item.m) maxM = item.m;
					});
					this.position.m = maxM + 1;
				}
				else
				{
					let minM = 100000;
					allBoards.forEach((item, i) => {
						if (minM > item.m) minM = item.m;
					});
					this.position.m = minM - 1;
				}
			}
		}*/
		allBoards.push(this);
	}
	continue()
	{
		if(this.contunous)
		{
			throw "Доску нельзя продолжить дважды.";
		}
		this.contunous = new Board(this);
		this.contunous.position.m = this.position.m;
		this.contunous.position.t = this.position.t + 1;
		return this.contunous;
	}
	branche()
	{
		let newBoard = new Board(this)
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
