//declare variables first
var array = ["&#xf09a","&#xf09a","&#xf427","&#xf427",
'&#xf421','&#xf421','&#xf16d','&#xf16d',
'&#xf167','&#xf167','&#xf099','&#xf099',
'&#xf5be','&#xf5be','&#xf1a0','&#xf1a0',
'&#xf17a','&#xf17a','&#xf179','&#xf179']


var moves = 10
var memValues = [] //the value of each selected card
var memId = [] //the actual id of each card
var selCard = 0 //number of cards that have been selected
var win = new Audio("assets/Win.mp3")
var miss = new Audio("assets/Miss.mp3")
var audio = new Audio("assets/flip.mp3")
// var begin = new Audio("assets/Beginning.mp3")
Array.prototype.shuffle = function(){ //use Fisher-Yates shuffle method for card randomization
	var i = array.length, j, k
	while(i) {
		k = Math.floor(Math.random() * i--)
		j = array[i]
		array[i] = array[k]
		array[k] = j //random cards selected from array and placed at back of the array, until stack is complete
	}
}
document.getElementById("startscreen").addEventListener("click", function(event){
	var begin = new Audio("assets/Beginning.mp3")
	begin.play()
}, {once: true})
window.addEventListener("keyup", ev => {
  if (ev.keyCode === 80) {
    document.getElementById("startscreen").style.display="none"
    document.getElementById("status").style.display="block"
    document.getElementById("gameBoard").style.display="block"
    document.body.style.backgroundColor="#f9ddbd";

}
});
//create starting board
function newBoard() {
selCard = 0
moves = 10
var output = ''
array.shuffle()
for(var i=0; i<array.length; i++) {
	output += '<div id="card_'+i+'" onclick="flip(this,\''+array[i]+'\')"></div>'

} document.getElementById('gameBoard').innerHTML = output
			counter.innerHTML = moves
} newBoard() //load game board upon window load
	var h = 0 //create game timer variables
	var m = 0
	var s = 0
	var timer = document.querySelector('#timer')
	var interval
function gameTime() { //display timer on screen

	interval = setInterval(function(){
		timer.innerHTML=h+"hrs "+m+"min "+s+"secs" //game time display format
		s++
		if(s == 60) {
			m++
			s=0
		}
		if(m == 60) {
			h++
			m=0
		}
	}, 1000) //set 1sec intervals for game clock
}
gameTime()

function flip(card, val) {
	if (card.innerHTML == '' && memValues.length < 2) {
		card.style.background = "#FFF" //make white any selected card background
		card.innerHTML = val
		audio.play()
		if (memValues.length == 0) {
			memValues.push(val)
			memId.push(card.id) // if no cards previously selected, queue this card to be the first selection

		} else if (memValues.length == 1) {
			memValues.push(val)
			memId.push(card.id) // if 1 card previously selected, queue this card to be second selection
				if (memValues[0] == memValues[1]) {
					selCard += 2
					memValues = []
					memId = [] // if 1st and 2nd card match, add 2 to selected cards array and clear arrays for your two choices
						if (selCard == array.length) {
							win.play()
							alert("You did it! Let's play again, smarty-pants!")
							document.getElementById('gameBoard').innerHTML = ''
							newBoard() //all cards have been selected. game over. clear the board. start new game.
						}
				} else function flipBack() {
					var card_1 = document.getElementById(memId[0])
					var card_2 = document.getElementById(memId[1]) //assign selected cards to the gameboard
					card_1.innerHTML = ''
					card_1.style.background='#33f' //clear card 1 and display back of card
					card_2.innerHTML = ''
					card_2.style.background='#33f' //clear card 2 and display back of card
					var x = moves--
					document.getElementById("counter").innerHTML = moves
					memValues = []
					memId = [] //clear all arrays to prepare for next selection
						if (moves <= 0) {
							miss.play()
							alert("Your memory needs work. Try again, genius!")
							document.getElementById('gameBoard').innerHTML = ''
							newBoard()
						}
					

				} setTimeout(flipBack, 700)
		}
	}
}
