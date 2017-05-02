var numbers = [];
var operation = "";

function add(n1,n2){
	console.log(n1+n2);
}

function multiply(n1,n2){
	console.log(n1*n2);
}

function divide(n1,n2){
	console.log(n1/n2);
}

function subtract(n1,n2){
	console.log(n1-n2);
}

function save_num(number){
	if(numbers.length === 0){
		numbers[0] = number;
	} else {
		numbers[1] = number;
	}
	console.log(numbers);
}

function save_op(op){
	if(op === "equals"){
		calculate();
	} else {
		operation = op;
	}
	console.log(operation);
}

function calculate(){
	switch(operation){
		case 'add':
			add(numbers[0], numbers[1]);
			operation = "";
			numbers = [];
			break;
		case 'multiply':
			multiply(numbers[0], numbers[1]);
			operation = "";
			numbers = [];
			break;
		case 'divide':
			divide(numbers[0], numbers[1]);
			operation = "";
			numbers = [];
			break;
		case 'subtract':
			subtract(numbers[0], numbers[1]);
			operation = "";
			numbers = [];
			break;
	}
}