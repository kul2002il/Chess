
let data = {
	messages: [],
	allBoards: allBoards,
	square:
	{
		m:undefined,
		t:undefined,
		y:undefined,
		x:undefined,
	},
};

function message(text, color = "green"){
	data.messages.push({
		text: text,
		color: color,
		id: id.get(),
	});
}

Vue.component("message",{
	props: ["message"],
	template: document.getElementById("messageTemplate").innerHTML,
	computed:
	{
		styleObject(){
			return{
				border: "1px solid " + this.message.color,
			}
		}
	},
	methods:
	{
		closeMessage(){
			data.messages.splice(data.messages.indexOf(this.messages),1);
		},
	},
});

Vue.component("board",{
	props: ["board"],
	template: document.getElementById("boardTemplate").innerHTML,
	computed:
	{
		classObject(){
			return{
				boardActive: this.board.contunous === null,
				boardPassive: this.board.contunous !== null,
				boardWhite: this.board.position.t % 2 - 1,
				boardBlack: this.board.position.t % 2,
			};
		},
		styleObject(){
			return{
				left: (this.board.position.t * 200) + "px",
				top: (this.board.position.m * 200) + "px",
			};
		},
		boardSnap(){
			let out = [
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null],
			];

			this.board.listPiece.forEach(piece=>{
				out[piece.position.y][piece.position.x] = piece;
			});

			return out;
		}
	},
	methods:
	{
	},
});

Vue.component("square",{
	props:
	[
		"board",
		"square",
		"piece",
	],
	template: document.getElementById("squareTemplate").innerHTML,
	computed:
	{
		styleObject(){
			return {};
		}
	},
	methods:
	{
		selectSquare()
		{
			if(data.square.m !== undefined)
			{
				let piece = this.board.getPiece(data.square.y, data.square.x);
				if (piece)
				{
					piece.move(
					{
						m: this.board.position.m,
						t: this.board.position.t,
						y: this.square.y,
						x: this.square.x,
					});
					data.square.m = undefined;
					data.square.t = undefined;
					data.square.y = undefined;
					data.square.x = undefined;
				}
			}
			data.square.m = this.board.position.m;
			data.square.t = this.board.position.t;
			data.square.y = this.square.y;
			data.square.x = this.square.x;
		}
	},
});

Vue.component("piece",{
	props: ["piece"],
	template: document.getElementById("pieceTemplate").innerHTML,
	computed:
	{
		styleObject(){
			return {};
		}
	},
	methods:
	{
	},
});

let app = new Vue({
	el: "#app",
	data: data,
	methods:
	{
	},
});



document.getElementById("template").remove();
