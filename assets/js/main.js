
let data = {
	messages: [
		{
			text: "Hello",
			color: "green",
			id: id.get(),
		},
		{
			text: "Error",
			color: "red",
			id: id.get(),
		},
	],
	allBoards: allBoards,
};

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
			}
		},
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
