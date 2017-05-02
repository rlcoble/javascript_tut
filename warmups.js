function my_max(numbers) {
	var max = 0;
	for(var i=0; i<numbers.length; i++){
		if(numbers[i] > max){
			max = numbers[i];
		}
	}
	return max;
}

console.log(my_max([10,7,9,22,11,5,6,1]));

function vowel_count(text){		//better way with regex
	var count = 0;
	for(var i=0; i<text.length; i++){
		switch(text[i]){
			case 'a':
				count+=1;
				break;
			case 'e':
				count+=1;
				break;
			case 'i':
				count+=1;
				break;
			case 'o':
				count+=1;
				break;
			case 'u':
				count+=1;
				break;
			case 'y':
				count+=1;
				break;
		}
	}
	return count;
}

console.log(vowel_count("the quick brown fox jumped over the lazy dog"));


function reverse(text){
	return text.split("").reverse().join("");
}

console.log(reverse("the quick brown fox jumped over the lazy dog"));
