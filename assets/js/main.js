
class Incrementer{
	constructor(){
		this.counter = 0;
	}
	get(){
		return this.counter++;
	}
}

let id = new Incrementer();

let data = {
	messages: [
		{
			text: "Hello",
			color: "green",
			id: id.get()
		},
	],
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
	method:
	{
		close(){
			data.messages.splice(data.messages.indexOf(this.messages),1);
		},
	}
});

let app = new Vue({
	el: "#app",
	data: data,
});