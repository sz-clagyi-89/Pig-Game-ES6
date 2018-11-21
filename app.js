/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/



let scores, roundScore, activePlayer, gamePlayed, winningScore;
init();

document.querySelector('.btn-roll').addEventListener('click', rolling);

document.querySelector('.btn-hold').addEventListener('click', holding);

document.querySelector('.btn-new').addEventListener('click', init);



function init() {
	scores = [0, 0];
	roundScore = 0;
	gamePlayed = true;
	activePlayer = 0;
	winningScore = 15;

	document.querySelector('#score-0').textContent = 0;
	document.querySelector('#score-1').textContent = 0;

	document.querySelector('#current-0').textContent = 0;
	document.querySelector('#current-1').textContent = 0;

	document.querySelector('.dice').style.display = 'none';

	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	
	document.querySelector(`.player-0-panel`).classList.remove('winner');
	document.querySelector(`.player-1-panel`).classList.remove('winner');
	document.querySelector(`.player-1-panel`).classList.remove('active');
	document.querySelector(`.player-0-panel`).classList.add('active');
}



function rolling() {
	// get random number
	if(gamePlayed) {
		const num = Math.floor(Math.random() * 6) + 1
		console.log(num);
		// display dice accordingly
		document.querySelector('.dice').style.display = 'block';
		document.querySelector('.dice').src = `dice-${num}.png`;

		// reflect current num
		if(num !== 1) {
			roundScore += num;
			document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
		} else {
			setTimeout(function(){ next(); }, 1000);
		} 	
	}
};



function holding(){
	// passing round score over the score field
	if(gamePlayed){
		scores[activePlayer] += roundScore;
		document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
		if(scores[activePlayer] >= winningScore){
			document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
			document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
			document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER';
			document.querySelector('.dice').style.display = 'none';
			gamePlayed = false;
		} else {
			next();
		}
	}
};



function next() {
	document.querySelector(`#current-${activePlayer}`).textContent = 0;
	roundScore = 0;

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';	
}